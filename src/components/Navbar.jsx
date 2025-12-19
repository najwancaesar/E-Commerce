import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/cartContext2.jsx";
import { useUserAuth } from "../context/userAuthContext.jsx";
import Logo from "./Logo.jsx";

export default function Navbar() {
  const { items } = useCart();
  const { isLoggedIn, user, logout } = useUserAuth();
  const count = items.reduce((sum, x) => sum + x.qty, 0);
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-xl transition ${
      isActive ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-indigo-50"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="w-10 h-10" />
          <div className="leading-tight">
            <div className="font-extrabold text-lg">LCD</div>
            <div className="text-xs text-slate-500 hidden sm:block">Local Central Digital</div>
          </div>
        </NavLink>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkClass}>Beranda</NavLink>
          <NavLink to="/products" className={linkClass}>Produk</NavLink>
          <NavLink to="/cart" className={linkClass}>
            Keranjang
            <span className="ml-2 inline-flex items-center justify-center text-xs bg-indigo-600 text-white rounded-full w-5 h-5">
              {count}
            </span>
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/register" className={linkClass}>Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={linkClass}>
                Profil <span className="hidden lg:inline text-xs text-white/80">({user?.name})</span>
              </NavLink>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-xl border hover:bg-slate-50 transition active:scale-[0.99]"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <NavLink
            to="/cart"
            className="relative inline-flex items-center justify-center rounded-xl border px-3 py-2 bg-white"
            onClick={() => setOpen(false)}
          >
            🛒
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center text-[11px] bg-indigo-600 text-white rounded-full w-5 h-5">
              {count}
            </span>
          </NavLink>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border px-3 py-2 bg-white active:scale-[0.98] transition"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Beranda</NavLink>
            <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>Produk</NavLink>
            <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>
              Keranjang ({count})
            </NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Login</NavLink>
                <NavLink to="/register" className={linkClass} onClick={() => setOpen(false)}>Register</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>Profil</NavLink>
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="px-3 py-2 rounded-xl border hover:bg-slate-50 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
