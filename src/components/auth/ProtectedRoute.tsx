import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
    const { accessToken } = useAuth();
    const location = useLocation();

    if (!accessToken) {
        return (
            <Navigate
                to="/signin"
                state={{ from: location }}
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
