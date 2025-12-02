import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useSignOut } from "../../hooks/auth/useSignOut";
import { useCartStore } from "../../store/useCartStore";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MainLayout() {
    const { data: dashboard, loading, error } = useDashboard();
    const { signOut, loading: signOutLoading } = useSignOut();
    const { totalItems, fetchCart } = useCartStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleSignOut = async () => {
        await signOut();
        navigate("/signin", { replace: true });
    };

    return (
        <div className="flex items-center justify-between h-[90px] max-w-[1120px] mx-auto">
            <p className="font-medium">
                {loading && (
                    <Skeleton
                        baseColor="oklch(86.9% 0.022 252.894)"
                        highlightColor="oklch(92.9% 0.013 255.508)"
                        width={100}
                        height={27.5}
                        borderRadius={10}
                    />
                )}
                {!loading && error && (
                    <span className="text-red-600 font-medium">{error}</span>
                )}
                {!loading && !error && (dashboard?.message ?? "")}
            </p>

            <div className="flex items-center gap-6">
                <Link to="/cart">
                    Cart {totalItems > 0 ? `(${totalItems})` : ""}
                </Link>

                <button
                    className="bg-[#162D3A] text-[15px] font-medium py-3 px-5 cursor-pointer text-white rounded-[7.5px]"
                    onClick={handleSignOut}
                    disabled={signOutLoading}
                >
                    {signOutLoading ? "Loading..." : "Sign out"}
                </button>
            </div>
        </div>
    );
}

export default MainLayout;
