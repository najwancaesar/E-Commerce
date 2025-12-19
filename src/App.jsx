import { Routes, Route } from "react-router-dom";

import ShopLayout from "./layouts/ShopLayout.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";

import RequireUser from "./routes/RequireUser.jsx";
import RequireAdmin from "./routes/RequireAdmin.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminReports from "./pages/admin/AdminReports.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";

import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      {/* SHOP (dengan Navbar+Footer) */}
      <Route element={<ShopLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* User auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected user */}
        <Route element={<RequireUser />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ADMIN (tanpa Navbar toko) */}
      <Route path="/lcd-admin/login" element={<AdminLogin />} />

      <Route element={<RequireAdmin />}>
        <Route path="/lcd-admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />

          {/* ✅ Tambahkan ini biar ga 404 */}
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}
