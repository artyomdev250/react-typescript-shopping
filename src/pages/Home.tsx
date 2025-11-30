import Navbar from "../components/layout/Navbar";

function Home() {
    return (
        <div className="px-5 pb-[50px] h-screen">
            <div className="mb-4"> 
                <Navbar />
            </div>
            <div className="max-w-[1120px] m-auto">
                <h1 className="text-2xl font-semibold">Home</h1>
            </div>
        </div>
    );
}

export default Home;
