import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

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

export type Cart = {
    _id: string;
    userId: string;
    items: CartItem[];
};

export type CartResponse = {
    cart: Cart;
};

export function useCart() {
    const [data, setData] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get<CartResponse>("/api/user/cart");
            setData(res.data);
        } catch (error: unknown) {
            const err = error as any;
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to load cart.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return { data, loading, error, refetch: fetchCart };
}
