import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
            <div className="mb-4">
                <Navbar />
            </div>
            <Outlet />
        </div>
    );
}

export default MainLayout;
