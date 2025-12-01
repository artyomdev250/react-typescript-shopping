import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ItemCard from "./ItemCard";

import { useItems } from "../../hooks/cart/useItems";

function Items() {
    const { items, loading, error } = useItems();

    if (loading) {
        return (
            <div className="flex flex-col gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        baseColor="oklch(92.9% 0.013 255.508)"
                        highlightColor="oklch(96.8% 0.007 247.896)"
                        height={60}
                        borderRadius={12}
                    />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!items.length) {
        return <p>No items found.</p>;
    }

    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    );
}

export default Items;
