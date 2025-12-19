import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function ShopLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}