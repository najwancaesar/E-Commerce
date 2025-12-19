import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/adminAuthContext.jsx";
import { useMemo, useState } from "react";

export default function AdminLayout() {
  const { admin, logoutAdmin } = useAdminAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const menu = useMemo(
    () => [
      { to: "/lcd-admin", label: "Dashboard", icon: "📊", end: true },
      { to: "/lcd-admin/products", label: "Kelola Produk", icon: "📦" },
      { to: "/lcd-admin/users", label: "Kelola User", icon: "👤" },
      { to: "/lcd-admin/orders", label: "Kelola Order", icon: "🧾" },
      { to: "/lcd-admin/reports", label: "Reports", icon: "📈" },
      { to: "/lcd-admin/settings", label: "Settings", icon: "⚙️" },
    ],
    []
  );

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-3 py-2.5 rounded-2xl transition active:scale-[0.99]
     ${
       isActive
         ? "bg-indigo-600 text-white shadow-sm"
         : "text-slate-700 hover:bg-indigo-50"
     }`;

  const doLogout = () => {
    logoutAdmin();
    nav("/lcd-admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar Admin */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-2xl border px-3 py-2 bg-white hover:bg-slate-50 active:scale-[0.98] transition"
              aria-label="Toggle sidebar"
            >
              {open ? "✕" : "☰"}
            </button>

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center text-white font-extrabold">
                LCD
              </div>
              <div className="leading-tight">
                <div className="text-sm text-slate-500">Admin Panel</div>
                <div className="text-lg font-extrabold">PT Local Central Digital</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-right">
              <div className="text-xs text-slate-500">Login sebagai</div>
              <div className="text-sm font-semibold text-slate-800 break-all">
                {admin?.email || "Admin"}
              </div>
            </div>

            <button
              onClick={doLogout}
              className="rounded-2xl bg-slate-900 text-white px-4 py-2 hover:bg-slate-800 active:scale-[0.99] transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className={`md:col-span-1 ${open ? "block" : "hidden"} md:block`}>
            <div className="bg-white border rounded-3xl p-4 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 px-2 mb-3">
                MENU ADMIN
              </div>

              <nav className="space-y-2">
                {menu.map((m) => (
                  <NavLink
                    key={m.to}
                    to={m.to}
                    end={m.end}
                    className={linkClass}
                    onClick={() => setOpen(false)} // auto close di mobile
                  >
                    <span className="w-7 h-7 rounded-xl flex items-center justify-center bg-slate-100 group-[.active]:bg-white/20">
                      {m.icon}
                    </span>
                    <span className="font-medium">{m.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="mt-5 pt-5 border-t text-xs text-slate-500">
                Tips: Admin URL disembunyikan, akses via{" "}
                <span className="font-mono">/#/lcd-admin/login</span>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="md:col-span-3">
            {/* Breadcrumb mini (optional feel) */}
            <div className="mb-4 bg-white border rounded-3xl p-4 shadow-sm">
              <div className="text-sm text-slate-600">
                Kelola data toko LCD: produk, user, order, laporan, dan settings.
              </div>
            </div>

            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer Admin */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            © {new Date().getFullYear()} PT Local Central Digital — Admin Panel
          </div>
          <div className="font-mono">LCD / Admin</div>
        </div>
      </footer>
    </div>
  );
}
