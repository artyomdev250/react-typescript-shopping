import { Link } from "react-router-dom";
import { useSignOut } from "../../hooks/auth/useSignOut";

function Navbar() {
    const { signOut, loading } = useSignOut();

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b">
            <Link to="/" className="font-bold text-lg">
                Shopping Dashboard
            </Link>

            <button
                onClick={signOut}
                className="px-4 py-2 rounded-md border text-sm hover:bg-gray-100"
                disabled={loading}
            >
                {loading ? "Logging out..." : "Logout"}
            </button>
        </nav>
    );
}

export default Navbar;
