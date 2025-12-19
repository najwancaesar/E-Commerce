import { Link } from "react-router-dom";

export default function Success() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-3xl p-8 text-center">
        <h1 className="text-2xl font-bold">Pesanan berhasil 🎉</h1>
        <p className="text-slate-600 mt-2">Ini simulasi checkout sederhana untuk UAS.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/products" className="rounded-xl bg-slate-900 text-white px-4 py-2">
            Belanja Lagi
          </Link>
          <Link to="/" className="rounded-xl border px-4 py-2">
            Ke Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
