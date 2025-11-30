import Navbar from "../components/layout/Navbar";
import { useDashboardMessage } from "../hooks/auth/useMessage";

function Home() {
    const { message, loading, error } = useDashboardMessage();

    let content: string;
    if (loading) {
        content = "Loading dashboard...";
    } else if (error) {
        content = error;
    } else {
        content = message ?? "";
    }

    return (
        <div>
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Home</h1>
                <p>{content}</p>
            </div>
        </div>
    );
}

export default Home;
