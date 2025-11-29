import Navbar from "../components/layout/Navbar";
import useUser from "../hooks/home/useUser";

function Home() {
    const { user, loading } = useUser();

    return (
        <div>
            <Navbar />

            <div className="p-6 text-xl font-semibold">
                {loading && "Loading user..."}
                {!loading && user && (
                    <p>Welcome, {user.username ?? user.email ?? "User"} 👋</p>
                )}
                {!loading && !user && (
                    <p>Welcome!</p>
                )}
            </div>
        </div>
    );
}

export default Home;
