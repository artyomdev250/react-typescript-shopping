type ItemCartProps = {
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
};

function ItemCart({ name, brand, category, price, quantity }: ItemCartProps) {
    return (
        <li className="flex justify-between gap-4 border-[1.5px] border-[#162D3A] bg-bg-item rounded-lg px-4 py-3 shadow-sm">
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-[14px] text-slate-500">
                    {brand} • {category}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                    <button className="bg-[#162D3A] text-white text-[15px] cursor-pointer font-medium py-1.5 px-3 rounded-[7.5px]">
                        Increase
                    </button>
                    <button className="bg-[#162D3A] text-white text-[15px] cursor-pointer font-medium py-1.5 px-3 rounded-[7.5px]">
                        Decrease
                    </button>
                    <button className="bg-[#162D3A] text-white text-[15px] cursor-pointer font-medium py-1.5 px-3 rounded-[7.5px]">
                        Remove
                    </button>
                </div>
            </div>

            <div className="text-right">
                <p className="font-medium">${price.toFixed(2)}</p>
                <p className="text-[14px] text-slate-500">Quantity: {quantity}</p>
            </div>
        </li>
    );
}

export default ItemCart;
