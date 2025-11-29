import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { accessToken, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate("/signin", { replace: true });
    };

    return (
        <nav className="flex items-center justify-between px-4 py-3 border-b bg-white">
            <div className="font-bold text-lg">My Shop</div>

            {accessToken && (
                <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium rounded-md border hover:bg-gray-100"
                >
                    Sign out
                </button>
            )}
        </nav>
    );
}

export default Navbar;
