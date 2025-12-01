import Items from "../components/cart/Items";

function Home() {
    return (
        <div className="px-5 pb-[50px] h-screen">
            <div className="max-w-[1120px] m-auto">
                <h1 className="text-2xl font-semibold">Home</h1>

                <div className="mt-4 pb-32">
                    <Items />
                </div>
            </div>
        </div>
    );
}

export default Home;
