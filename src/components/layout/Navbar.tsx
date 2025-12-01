import { useNavigate, Link } from "react-router-dom";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useSignOut } from "../../hooks/auth/useSignOut";

function MainLayout() {
    const { data: dashboard, loading, error } = useDashboard();
    const { signOut, loading: signOutLoading } = useSignOut();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate("/signin", { replace: true });
    };

    return (
        <div className="flex items-center justify-between h-[90px] w-[1120px] mx-auto">
            <p className="font-medium">
                {loading && "Loading..."}
                {!loading && error && (
                    <span className="text-red-600">{error}</span>
                )}
                {!loading && !error && (dashboard?.message ?? "")}
            </p>

            <div className="flex items-center gap-5">
                <Link to="/cart">Cart</Link>
                <button
                    className="bg-[#162D3A] text-[15px] font-medium py-3 px-5 cursor-pointer text-white rounded-[7.5px]"
                    onClick={handleSignOut}
                    disabled={signOutLoading}
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}

export default MainLayout;
