import { useCart } from "../hooks/cart/useCart";
import ItemCart from "../components/layout/ItemCart";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Cart() {
    const { data, loading, error } = useCart();
    const items = data?.cart?.items ?? [];

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
                <p className="text-red-600 font-medium">
                    {error}
                </p>
            )}

            {!loading && !error && items.length === 0 && (
                <p className="font-medium">Your cart is empty.</p>
            )}

            {!loading && !error && items.length > 0 && (
                <div>
                    <b className="text-[24px] block mb-4">Cart</b>

                    <ul className="mt-4 flex flex-col gap-3">
                        {items.map((item) => (
                            <ItemCart
                                key={item._id}
                                name={item.itemId.name}
                                brand={item.itemId.brand}
                                category={item.itemId.category}
                                price={item.itemId.price}
                                quantity={item.quantity}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Cart;
