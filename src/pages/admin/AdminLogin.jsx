import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/adminAuthContext.jsx";

export default function AdminLogin() {
    const { loginAdmin } = useAdminAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("admin@lcd.com");
    const [password, setPassword] = useState("admin123");
    const [err, setErr] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        setErr("");

        const res = loginAdmin(email, password);
        if (!res.ok) {
            setErr(res.message);
            return;
        }
        nav("/lcd-admin", { replace: true });
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="max-w-md mx-auto bg-white border rounded-3xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold">Admin Login</h1>
                <p className="text-slate-600 text-sm mt-1">
                    Halaman admin terpisah (tidak digabung dengan user).
                </p>

                {err && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-3 text-sm">
                        {err}
                    </div>
                )}

                <form onSubmit={onSubmit} className="mt-5 space-y-4">
                    <div>
                        <label className="text-sm text-slate-600">Email Admin</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
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
                            type="password"
                            required
                            minLength={6}
                        />
                    </div>

                    <button className="w-full rounded-2xl bg-slate-900 text-white py-2 hover:bg-slate-800 active:scale-[0.99] transition">
                        Masuk Admin
                    </button>
                </form>

                <div className="mt-3 text-xs text-slate-500">
                    Demo admin: <b>admin@lcd.com</b> / <b>admin123</b>
                </div>
            </div>
        </section>
    );
}
