import { useSignOut } from "../../hooks/auth/useSignOut";
import { useDashboardMessage } from "../../hooks/auth/useMessage";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Navbar() {
    const { signOut, loading } = useSignOut();
    const {
        message,
        loading: messageLoading,
        error,
    } = useDashboardMessage();

    let content;

    if (messageLoading) {
        content = <Skeleton baseColor="oklch(92.9% 0.013 255.508)" highlightColor="oklch(96.8% 0.007 247.896)" width={160} height={25} borderRadius={6} />;
    } else if (error) {
        content = <p className="text-red-500">{error}</p>;
    } else {
        content = <p>{message}</p>;
    }

    return (
        <nav className="flex items-center justify-between h-[90px] max-w-[1120px] m-auto">
            <p className="font-medium">{content}</p>
            <button
                onClick={signOut}
                className="text-white bg-[#162D3A] py-4 px-6 cursor-pointer text-[15px] rounded-[12.5px] font-medium"
                disabled={loading}
            >
                {loading ? "Logging out..." : "Logout"}
            </button>
        </nav>
    );
}

export default Navbar;
