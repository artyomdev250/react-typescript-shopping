type ItemProps = {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    brand: string;
    onAdd: () => void;
    isLoading?: boolean; // NEW
};

function ItemCard({
    _id,
    name,
    category,
    price,
    stock,
    brand,
    onAdd,
    isLoading = false,
}: ItemProps) {
    return (
        <li
            key={_id}
            className="flex justify-between items-center border-[1.5px] border-[#162D3A] bg-bg-item rounded-lg px-4 py-3 shadow-sm"
        >
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-[14px] text-slate-500">
                    {brand} • {category}
                </p>

                <button
                    className="bg-[#162D3A] text-white text-[15px] cursor-pointer font-medium py-1.5 px-3 rounded-[7.5px] mt-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={onAdd}
                    disabled={isLoading}
                >
                    {isLoading ? "Adding..." : "Add to cart"}
                </button>
            </div>

            <div className="text-right">
                <p className="font-medium">${price.toFixed(2)}</p>
                <p className="text-[14px] text-slate-500">In stock: {stock}</p>
            </div>
        </li>
    );
}

export default ItemCard;
