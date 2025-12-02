import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function MainLayout() {
    return (
        <div className="bg-[#f5f5f5] min-h-screen pb-[100px] px-5">
            <div className="mb-4">
                <Navbar />
            </div>
            <Outlet />
        </div>
    );
}

export default MainLayout;
