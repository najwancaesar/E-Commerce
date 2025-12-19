import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useProducts } from "../hooks/useProducts.js";

export default function Products() {
  const { products, categories, brands, loading, errorMsg, apiUrl } = useProducts();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let data = [...products];

    if (q.trim()) {
      const key = q.toLowerCase();
      data = data.filter((p) => (p.name + " " + p.brand).toLowerCase().includes(key));
    }

    if (category !== "All") data = data.filter((p) => p.category === category);
    if (brand !== "All") data = data.filter((p) => p.brand === brand);

    const ratingNum = Number(minRating);
    if (ratingNum > 0) data = data.filter((p) => Number(p.rating) >= ratingNum);

    if (inStockOnly) data = data.filter((p) => Number(p.stock) > 0);

    data = data.filter((p) => {
      const price = Number(p.price);
      if (priceRange === "all") return true;
      if (priceRange === "lt500") return price < 500000;
      if (priceRange === "500to1m") return price >= 500000 && price <= 1000000;
      if (priceRange === "1mto3m") return price > 1000000 && price <= 3000000;
      if (priceRange === "3mto7m") return price > 3000000 && price <= 7000000;
      if (priceRange === "gt7m") return price > 7000000;
      return true;
    });

    if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
    if (sort === "rating_desc") data.sort((a, b) => b.rating - a.rating);

    return data;
  }, [products, q, category, brand, priceRange, minRating, inStockOnly, sort]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Header + Search */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Produk LCD</h2>
          <p className="text-slate-600">Cari & filter produk digital dengan mudah.</p>
          <p className="text-xs text-slate-400 mt-1 break-all">Source: {apiUrl}</p>
        </div>

        <div className="w-full lg:w-96">
          <label className="text-sm text-slate-600">Pencarian</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari produk atau brand..."
            className="mt-1 w-full rounded-xl border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* Filters (responsive) */}
      <div className="mt-5 bg-white border rounded-2xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-1">
            <label className="text-sm text-slate-600">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-1">
            <label className="text-sm text-slate-600">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-1">
            <label className="text-sm text-slate-600">Range Harga</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
            >
              <option value="all">Semua</option>
              <option value="lt500">&lt; 500 ribu</option>
              <option value="500to1m">500 ribu – 1 juta</option>
              <option value="1mto3m">1 – 3 juta</option>
              <option value="3mto7m">3 – 7 juta</option>
              <option value="gt7m">&gt; 7 juta</option>
            </select>
          </div>

          <div className="lg:col-span-1">
            <label className="text-sm text-slate-600">Rating Minimal</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
            >
              <option value="0">Semua</option>
              <option value="4.0">4.0+</option>
              <option value="4.3">4.3+</option>
              <option value="4.5">4.5+</option>
              <option value="4.7">4.7+</option>
            </select>
          </div>

          <div className="lg:col-span-1 flex items-end">
            <label className="flex items-center gap-2 text-sm text-slate-700 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              Stok tersedia
            </label>
          </div>

          <div className="lg:col-span-1">
            <label className="text-sm text-slate-600">Urutkan</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
            >
              <option value="default">Default</option>
              <option value="price_asc">Harga Termurah</option>
              <option value="price_desc">Harga Termahal</option>
              <option value="rating_desc">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setQ("");
            setCategory("All");
            setBrand("All");
            setPriceRange("all");
            setMinRating("0");
            setInStockOnly(false);
            setSort("default");
          }}
          className="mt-4 w-full rounded-xl bg-indigo-600 text-white py-2 hover:bg-indigo-700 active:scale-[0.99] transition"
        >
          Reset Filter
        </button>
      </div>

      {errorMsg && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
          Gagal memuat produk: {errorMsg}
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="text-slate-600">Loading produk...</div>
        ) : filtered.length === 0 ? (
          <div className="text-slate-600">Produk tidak ditemukan.</div>
        ) : (
          <>
            <div className="text-sm text-slate-600 mb-3">
              Menampilkan <b>{filtered.length}</b> produk
            </div>

            {/* Grid responsif */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, idx) => (
                <ProductCard key={p.id} product={p} priority={idx < 3} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
