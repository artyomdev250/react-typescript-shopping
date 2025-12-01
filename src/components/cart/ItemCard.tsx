import { type Item } from "../../hooks/cart/useItems";

interface ItemCardProps {
    item: Item;
}

function ItemCard({ item }: ItemCardProps) {
    return (
        <div className="flex justify-between gap-4 border-2 border-[#162D3A] bg-bg-item rounded-xl p-4">
            <div>
                <p className="font-semibold text-[17px]">{item.name}</p>
                <p className="text-[14px] text-slate-500">
                    {item.brand} · {item.category}
                </p>
                <p className="text-slate-600 mt-1 text-[14px]">{item.description}</p>
                <button
                    className="mt-4 bg-[#162D3A] text-white py-2 px-4 rounded-lg text-[14px] font-medium cursor-pointer hover:bg-[#1f3e52] transition"
                >
                    Add to Cart
                </button>
            </div>

            <div className="text-right whitespace-nowrap">
                <p className="font-semibold">${item.price.toFixed(2)}</p>
                <p className="text-slate-500 text-[14px]">In stock: {item.stock}</p>
            </div>
        </div>
    );
}

export default ItemCard;
