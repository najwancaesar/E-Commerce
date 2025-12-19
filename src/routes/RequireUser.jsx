import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext.jsx";

export default function RequireUser() {
    const { isLoggedIn } = useUserAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
    return <Outlet />;
}
