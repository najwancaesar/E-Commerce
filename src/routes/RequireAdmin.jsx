import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/adminAuthContext.jsx";

export default function RequireAdmin() {
    const { isAdmin } = useAdminAuth();

    if (!isAdmin) return <Navigate to="/lcd-admin/login" replace />;
    return <Outlet />;
}
