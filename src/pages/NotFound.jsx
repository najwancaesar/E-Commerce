import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-3xl p-6">
        <h1 className="text-2xl font-bold">404</h1>
        <p className="text-slate-600 mt-1">Halaman tidak ditemukan.</p>
        <Link to="/" className="inline-block mt-4 text-indigo-700 hover:underline">
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
