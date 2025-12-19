import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext.jsx";

export default function Register() {
    const { register } = useUserAuth();
    const nav = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pw2, setPw2] = useState("");
    const [err, setErr] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        setErr("");

        if (pw !== pw2) {
            setErr("Konfirmasi password tidak sama.");
            return;
        }
        if (pw.length < 6) {
            setErr("Password minimal 6 karakter.");
            return;
        }

        const res = register({ name, email, password: pw });
        if (!res.ok) {
            setErr(res.message);
            return;
        }

        nav("/profile", { replace: true });
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white border rounded-3xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-slate-600 text-sm mt-1">Buat akun user baru (statis/localStorage).</p>

                {err && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-3 text-sm">
                        {err}
                    </div>
                )}

                <form onSubmit={onSubmit} className="mt-5 space-y-4">
                    <div>
                        <label className="text-sm text-slate-600">Nama</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                            placeholder="Nama kamu"
                            required
                        />
                    </div>

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
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                            type="password"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-600">Konfirmasi Password</label>
                        <input
                            value={pw2}
                            onChange={(e) => setPw2(e.target.value)}
                            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                            type="password"
                            required
                            minLength={6}
                        />
                    </div>

                    <button className="w-full rounded-2xl bg-indigo-600 text-white py-2 hover:bg-indigo-700 active:scale-[0.99] transition">
                        Buat Akun
                    </button>
                </form>

                <div className="mt-4 text-sm text-slate-600">
                    Sudah punya akun?{" "}
                    <Link to="/login" className="text-indigo-700 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
}
