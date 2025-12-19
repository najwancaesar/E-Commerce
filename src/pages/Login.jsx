import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext.jsx";

export default function Login() {
    const { login } = useUserAuth();
    const nav = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/profile";

    const [email, setEmail] = useState("user@lcd.com");
    const [password, setPassword] = useState("user123");
    const [err, setErr] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        setErr("");

        const res = login(email, password);
        if (!res.ok) {
            setErr(res.message);
            return;
        }
        nav(from, { replace: true });
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white border rounded-3xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-slate-600 text-sm mt-1">
                    Login user (bukan admin). Admin punya halaman login terpisah.
                </p>

                {err && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-3 text-sm">
                        {err}
                    </div>
                )}

                <form onSubmit={onSubmit} className="mt-5 space-y-4">
                    <div>
                        <label className="text-sm text-slate-600">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                            placeholder="email@contoh.com"
                            type="email"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-600">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                            placeholder="minimal 6 karakter"
                            type="password"
                            required
                            minLength={6}
                        />
                    </div>

                    <button className="w-full rounded-2xl bg-indigo-600 text-white py-2 hover:bg-indigo-700 active:scale-[0.99] transition">
                        Masuk
                    </button>
                </form>

                <div className="mt-4 text-sm text-slate-600">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-indigo-700 hover:underline">
                        Register
                    </Link>
                </div>

                <div className="mt-3 text-xs text-slate-500">
                    Demo user: <b>user@lcd.com</b> / <b>user123</b>
                </div>
            </div>
        </section>
    );
}
