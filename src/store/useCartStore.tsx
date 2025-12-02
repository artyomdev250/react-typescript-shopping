import { create } from "zustand";
import { api } from "../lib/api";

export type CartItemProduct = {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    brand: string;
};

export type CartItem = {
    _id: string;
    quantity: number;
    itemId: CartItemProduct;
};

type RawCartResponse =
    | {
        cart: {
            _id: string;
            userId: string;
            items: CartItem[];
        };
        totalItems: number;
        subtotal: number;
        totalCost: number;
    }
    | {
        items: CartItem[];
        totalItems: number;
        subtotal: number;
        totalCost: number;
    };

type CartState = {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    totalCost: number;
    loading: boolean;
    error: string | null;

    fetchCart: () => Promise<void>;
    increase: (itemId: string) => Promise<void>;
    decrease: (itemId: string) => Promise<void>;
    remove: (itemId: string) => Promise<void>;
};

const recalcTotals = (items: CartItem[]) => {
    let totalItems = 0;
    let subtotal = 0;

    items.forEach((ci) => {
        totalItems += ci.quantity;
        subtotal += ci.quantity * ci.itemId.price;
    });

    return {
        totalItems,
        subtotal,
        totalCost: subtotal,
    };
};

export const useCartStore = create<CartState>((set, get) => {
    const handleError = (error: unknown) => {
        const err = error as any;
        const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Cart request failed.";
        set({ error: msg });
    };

    return {
        items: [],
        totalItems: 0,
        subtotal: 0,
        totalCost: 0,
        loading: false,
        error: null,

        async fetchCart() {
            set({ loading: true, error: null });

            try {
                const res = await api.get<RawCartResponse>("/api/user/cart");
                const data = res.data;
                const items = "cart" in data ? data.cart.items : data.items || [];

                set({
                    items,
                    ...recalcTotals(items),
                    loading: false,
                });
            } catch (e) {
                handleError(e);
                set({ loading: false });
            }
        },

        async increase(itemId: string) {
            try {
                await api.post("/api/user/cart/add", { itemId, quantity: 1 });

                const { items } = get();
                const exists = items.some((ci) => ci.itemId._id === itemId);

                if (!exists) {
                    await get().fetchCart();
                    return;
                }

                const updated = items.map((ci) =>
                    ci.itemId._id === itemId
                        ? { ...ci, quantity: ci.quantity + 1 }
                        : ci
                );

                set({
                    items: updated,
                    totalItems: updated.reduce((n, i) => n + i.quantity, 0),
                    subtotal: updated.reduce((n, i) => n + i.quantity * i.itemId.price, 0),
                    totalCost: updated.reduce((n, i) => n + i.quantity * i.itemId.price, 0),
                });
            } catch (e) {
                handleError(e);
            }
        },

        async decrease(itemId: string) {
            try {
                await api.delete("/api/user/cart/remove", {
                    data: { itemId, quantity: 1 },
                });

                const { items } = get();

                const updated = items
                    .map((ci) =>
                        ci.itemId._id === itemId
                            ? { ...ci, quantity: ci.quantity - 1 }
                            : ci
                    )
                    .filter((ci) => ci.quantity > 0);

                set({
                    items: updated,
                    ...recalcTotals(updated),
                });
            } catch (e) {
                handleError(e);
            }
        },

        async remove(itemId: string) {
            try {
                await api.delete("/api/user/cart/remove", {
                    data: { itemId },
                });

                const { items } = get();
                const updated = items.filter((ci) => ci.itemId._id !== itemId);

                set({
                    items: updated,
                    ...recalcTotals(updated),
                });
            } catch (e) {
                handleError(e);
            }
        },
    };
});
