import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/dashboard/useDashboard";
import { useSignOut } from "../hooks/auth/useSignOut";

function Home() {
    const { data: dashboard, loading, error } = useDashboard();
    const { signOut, loading: signOutLoading } = useSignOut();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate("/signin", { replace: true });
    };

    if (loading) {
        return <div className="p-4">Loading dashboard...</div>;
    }

    if (error) {
        return (
            <div className="p-4">
                <p className="mb-4 text-red-600">{error}</p>
                <button
                    className="bg-black py-2 px-4 cursor-pointer text-white rounded"
                    onClick={handleSignOut}
                    disabled={signOutLoading}
                >
                    Back to sign in
                </button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <p className="font-semibold text-xl mb-2">Dashboard</p>
            <p className="mb-4">
                {dashboard?.message ?? JSON.stringify(dashboard, null, 2)}
            </p>

            <button
                className="bg-black py-2 px-4 cursor-pointer text-white rounded mt-2"
                onClick={handleSignOut}
                disabled={signOutLoading}
            >
                Sign out
            </button>
        </div>
    );
}

export default Home;
