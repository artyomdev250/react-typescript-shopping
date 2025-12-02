type ItemCartProps = {
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
    loadingIncrease?: boolean;
    loadingDecrease?: boolean;
    loadingRemove?: boolean;
};

function ItemCart({
    name,
    brand,
    category,
    price,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
    loadingIncrease = false,
    loadingDecrease = false,
    loadingRemove = false,
}: ItemCartProps) {
    return (
        <li className="flex justify-between gap-4 border-[1.5px] border-[#162D3A] bg-bg-item rounded-lg px-4 py-3 shadow-sm">
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-[14px] text-slate-500">
                    {brand} • {category}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                    <button
                        className="bg-[#162D3A] text-white text-[15px] cursor-pointer font-medium py-1.5 px-3 rounded-[7.5px] disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={onIncrease}
                        disabled={loadingIncrease}
                    >
                        {loadingIncrease ? "Updating..." : "Increase"}
                    </button>

                    <button
                        className="bg-[#162D3A] text-white text-[15px] cursor-pointer font-medium py-1.5 px-3 rounded-[7.5px] disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={onDecrease}
                        disabled={loadingDecrease}
                    >
                        {loadingDecrease ? "Updating..." : "Decrease"}
                    </button>

                    <button
                        className="bg-[#162D3A] text-white text-[15px] cursor-pointer font-medium py-1.5 px-3 rounded-[7.5px] disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={onRemove}
                        disabled={loadingRemove}
                    >
                        {loadingRemove ? "Removing..." : "Remove"}
                    </button>
                </div>
            </div>

            <div className="text-right">
                <p className="font-medium">${price.toFixed(2)}</p>
                <p className="text-[14px] text-slate-500">
                    Quantity: {quantity}
                </p>
            </div>
        </li>
    );
}

export default ItemCart;
