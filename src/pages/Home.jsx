import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const { products, categories, loading } = useProducts();
  const topProducts = products.slice(0, 6);
  const cleanCategories = categories.filter((c) => c !== "All").slice(0, 8);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      {/* HERO / DASHBOARD BANNER */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white rounded-3xl p-8 md:p-12 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          LCD — Local Central Digital
        </h1>
        <p className="mt-3 text-white/90 max-w-2xl">
          Marketplace perangkat digital: headset, laptop, komputer, handphone, printer, TWS,
          keyboard, mouse, kamera, tablet, dan aksesoris lainnya.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-4 py-2 font-semibold"
          >
            Mulai Belanja
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center justify-center rounded-xl border border-white/40 px-4 py-2"
          >
            Lihat Keranjang
          </Link>
        </div>

        {/* mini stats */}
        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {[
            { title: "UI Modern", desc: "Responsive mobile & desktop." },
            { title: "Fitur Lengkap", desc: "Search, filter, cart, checkout." },
            { title: "Data dari API JSON", desc: "Produk dipanggil via fetch." },
          ].map((x) => (
            <div key={x.title} className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <div className="font-bold">{x.title}</div>
              <div className="text-white/80 text-sm mt-1">{x.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KATEGORI */}
      <div className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Kategori Populer</h2>
            <p className="text-slate-600 text-sm">Cari produk lebih cepat berdasarkan kategori.</p>
          </div>
          <Link to="/products" className="text-sm text-indigo-700 hover:underline">
            Lihat semua →
          </Link>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cleanCategories.length === 0 ? (
            <div className="text-slate-600">Kategori akan muncul setelah data produk termuat.</div>
          ) : (
            cleanCategories.map((c) => (
              <Link
                key={c}
                to="/products"
                className="bg-white border rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition"
              >
                <div className="font-bold">{c}</div>
                <div className="text-sm text-slate-600 mt-1">
                  Jelajahi produk {c} terbaik di LCD.
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* PRODUK UNGGULAN */}
      <div className="mt-12">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Rekomendasi Produk</h2>
            <p className="text-slate-600 text-sm">Pilihan produk yang sering dicari.</p>
          </div>
          <Link to="/products" className="text-sm text-indigo-700 hover:underline">
            Lihat semua →
          </Link>
        </div>

        <div className="mt-5">
          {loading ? (
            <div className="text-slate-600">Loading produk...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {topProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CARA BELANJA */}
      <div className="mt-12 bg-white border rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-bold">Cara Belanja di LCD</h2>
        <p className="text-slate-600 text-sm mt-1">
          Alur belanja dibuat sederhana untuk pengalaman pengguna (UX) yang mudah.
        </p>

        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {[
            { step: "1", title: "Pilih Produk", desc: "Cari produk via search & filter." },
            { step: "2", title: "Tambah ke Keranjang", desc: "Klik tombol “Tambah ke Keranjang”." },
            { step: "3", title: "Cek Keranjang", desc: "Ubah qty atau hapus item." },
            { step: "4", title: "Checkout", desc: "Isi form + validasi, selesai." },
          ].map((x) => (
            <div key={x.step} className="rounded-2xl border p-4 bg-slate-50">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                {x.step}
              </div>
              <div className="font-semibold mt-3">{x.title}</div>
              <div className="text-sm text-slate-600 mt-1">{x.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ SINGKAT */}
      <div className="mt-12">
        <h2 className="text-xl font-bold">FAQ</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {[
            {
              q: "Apakah ini aplikasi nyata?",
              a: "Ini demo e-commerce untuk UAS: fokus pada UI/UX, routing, state, dan integrasi JSON.",
            },
            {
              q: "Data produk ambil dari mana?",
              a: "Dari JSON API (online) atau fallback file products.json lokal.",
            },
            {
              q: "Kenapa ada filter tanpa slider?",
              a: "Dropdown range harga lebih mudah dipahami user dibanding slider.",
            },
            {
              q: "Apakah responsive?",
              a: "Ya. Layout sudah dibuat nyaman untuk mobile dan desktop.",
            },
          ].map((x) => (
            <div key={x.q} className="bg-white border rounded-2xl p-5">
              <div className="font-semibold">{x.q}</div>
              <div className="text-sm text-slate-600 mt-1">{x.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-indigo-600 text-white rounded-3xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-2xl font-extrabold">Siap belanja perangkat digital?</div>
          <div className="text-white/90 mt-1">Jelajahi katalog lengkap LCD sekarang.</div>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-5 py-2 font-semibold"
        >
          Buka Katalog
        </Link>
      </div>
    </section>
  );
}
