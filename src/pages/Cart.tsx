import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import ItemCart from "../components/layout/ItemCart";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Cart() {
    const {
        items,
        loading,
        error,
        fetchCart,
        increase,
        decrease,
        remove,
    } = useCartStore();

    const [loadingState, setLoadingState] = useState<{
        [id: string]: {
            increase?: boolean;
            decrease?: boolean;
            remove?: boolean;
        };
    }>({});

    const setItemLoading = (
        id: string,
        action: "increase" | "decrease" | "remove",
        value: boolean
    ) => {
        setLoadingState((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [action]: value,
            },
        }));
    };

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleIncrease = async (id: string) => {
        setItemLoading(id, "increase", true);
        await increase(id);
        setItemLoading(id, "increase", false);
    };

    const handleDecrease = async (id: string) => {
        setItemLoading(id, "decrease", true);
        await decrease(id);
        setItemLoading(id, "decrease", false);
    };

    const handleRemove = async (id: string) => {
        setItemLoading(id, "remove", true);
        await remove(id);
        setItemLoading(id, "remove", false);
    };

    return (
        <div className="max-w-[1120px] mx-auto">
            {loading && (
                <div className="flex flex-col gap-1">
                    <Skeleton
                        baseColor="oklch(86.9% 0.022 252.894)"
                        highlightColor="oklch(92.9% 0.013 255.508)"
                        width={150}
                        height={35}
                        borderRadius={10}
                        style={{ marginBottom: 16 }}
                    />

                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            baseColor="oklch(86.9% 0.022 252.894)"
                            highlightColor="oklch(92.9% 0.013 255.508)"
                            width="100%"
                            height={45}
                            borderRadius={10}
                        />
                    ))}
                </div>
            )}

            {error && (
                <p className="text-red-600 font-medium mb-3">{error}</p>
            )}

            {!loading && !error && items.length === 0 && (
                <p className="font-medium">Your cart is empty.</p>
            )}

            {!loading && !error && items.length > 0 && (
                <>
                    <b className="text-[24px] block mb-4">Cart</b>

                    <ul className="mt-4 flex flex-col gap-3">
                        {items.map((cartItem) => {
                            const itemId = cartItem.itemId._id;
                            const itemLoad = loadingState[itemId] || {};

                            return (
                                <ItemCart
                                    key={cartItem._id}
                                    name={cartItem.itemId.name}
                                    brand={cartItem.itemId.brand}
                                    category={cartItem.itemId.category}
                                    price={cartItem.itemId.price}
                                    quantity={cartItem.quantity}
                                    onIncrease={() => handleIncrease(itemId)}
                                    onDecrease={() => handleDecrease(itemId)}
                                    onRemove={() => handleRemove(itemId)}
                                    loadingIncrease={itemLoad.increase}
                                    loadingDecrease={itemLoad.decrease}
                                    loadingRemove={itemLoad.remove}
                                />
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Cart;
