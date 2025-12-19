import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts.js";

const LS_KEY = "lcd_products";

function readLocalProducts() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeLocalProducts(products) {
  localStorage.setItem(LS_KEY, JSON.stringify(products));
}

export default function AdminProducts() {
  const { products: apiProducts, loading } = useProducts();

  const [localProducts, setLocalProducts] = useState(() => readLocalProducts());
  const products = localProducts ?? [];

  const [mode, setMode] = useState("add"); // add | edit
  const [editId, setEditId] = useState(null);

  const [revealMap, setRevealMap] = useState({}); // { [productId]: boolean }
  const [showImageInput, setShowImageInput] = useState(false);

  const blank = {
    id: "",
    name: "",
    brand: "",
    category: "",
    price: 0,
    rating: 4.5,
    stock: 10,
    image: "",
    description: "",
  };

  const [form, setForm] = useState(blank);

  useEffect(() => {
    setLocalProducts(readLocalProducts());
  }, []);

  const imported = useMemo(() => Array.isArray(localProducts), [localProducts]);

  const importFromApi = () => {
    writeLocalProducts(apiProducts);
    setLocalProducts(apiProducts);
  };

  const resetToApi = () => {
    localStorage.removeItem(LS_KEY);
    setLocalProducts(null);
    setMode("add");
    setEditId(null);
    setForm(blank);
  };

  const onChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const startEdit = (p) => {
    setMode("edit");
    setEditId(p.id);
    setForm({ ...p });
  };

  const cancelEdit = () => {
    setMode("add");
    setEditId(null);
    setForm(blank);
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!imported) return;

    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      stock: Number(form.stock),
      id: form.id?.trim() || (mode === "add" ? `lcd-${Date.now()}` : editId),
    };

    const next =
      mode === "add"
        ? [payload, ...products]
        : products.map((x) => (x.id === editId ? payload : x));

    writeLocalProducts(next);
    setLocalProducts(next);
    cancelEdit();
  };

  const onDelete = (id) => {
    if (!imported) return;
    const next = products.filter((x) => x.id !== id);
    writeLocalProducts(next);
    setLocalProducts(next);
  };

  const maskUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("data:image")) return "data:image/... (hidden)";
    const head = url.slice(0, 18);
    return `${head}•••••••••• (hidden)`;
  };

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Kelola Produk</h1>
      <p className="text-slate-600 mt-1">
        Produk editable disimpan ke localStorage. URL gambar tidak ditampilkan (hidden) di list.
      </p>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          onClick={importFromApi}
          disabled={loading}
          className="rounded-xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          Import Produk dari API/JSON
        </button>
        <button
          onClick={resetToApi}
          className="rounded-xl border px-4 py-2 hover:bg-slate-50"
        >
          Reset (hapus local products)
        </button>
      </div>

      {!imported && (
        <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-sm">
          Kamu belum import produk ke local. Klik “Import Produk dari API/JSON” agar bisa edit/delete.
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSave} className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2 font-semibold">
          {mode === "add" ? "Tambah Produk" : "Edit Produk"}
        </div>

        <div>
          <label className="text-sm text-slate-600">Nama</label>
          <input
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
            disabled={!imported}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Brand</label>
          <input
            value={form.brand}
            onChange={(e) => onChange("brand", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
            disabled={!imported}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Kategori</label>
          <input
            value={form.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
            disabled={!imported}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Harga</label>
          <input
            value={form.price}
            onChange={(e) => onChange("price", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="number"
            min={0}
            required
            disabled={!imported}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Rating</label>
          <input
            value={form.rating}
            onChange={(e) => onChange("rating", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="number"
            min={0}
            max={5}
            step={0.1}
            required
            disabled={!imported}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Stock</label>
          <input
            value={form.stock}
            onChange={(e) => onChange("stock", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="number"
            min={0}
            required
            disabled={!imported}
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-slate-600">Image URL</div>
            <div className="text-xs text-slate-500">Disembunyikan di list. Kamu tetap bisa edit di sini.</div>
          </div>
          <button
            type="button"
            onClick={() => setShowImageInput((v) => !v)}
            className="rounded-xl border px-3 py-2 hover:bg-slate-50"
            disabled={!imported}
          >
            {showImageInput ? "Hide input" : "Show input"}
          </button>
        </div>

        {showImageInput && (
          <div className="md:col-span-2">
            <label className="text-sm text-slate-600">Tempel URL Gambar</label>
            <input
              value={form.image}
              onChange={(e) => onChange("image", e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              placeholder="https://...jpg/png/webp atau data:image..."
              disabled={!imported}
              type="url"
            />
          </div>
        )}

        <div className="md:col-span-2">
          <label className="text-sm text-slate-600">Deskripsi</label>
          <textarea
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 min-h-[90px]"
            disabled={!imported}
          />
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
          <button
            className="rounded-xl bg-slate-900 text-white px-4 py-2 hover:bg-slate-800 disabled:opacity-50"
            disabled={!imported}
          >
            {mode === "add" ? "Tambah" : "Simpan Perubahan"}
          </button>

          {mode === "edit" && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-xl border px-4 py-2 hover:bg-slate-50"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="mt-8">
        <div className="font-semibold">Daftar Produk (Local)</div>
        <div className="text-xs text-slate-500 mt-1">
          Jika belum import, daftar ini akan kosong.
        </div>

        <div className="mt-3 space-y-3">
          {products.length === 0 ? (
            <div className="text-slate-600 text-sm">Belum ada produk local.</div>
          ) : (
            products.map((p) => {
              const revealed = Boolean(revealMap[p.id]);
              return (
                <div key={p.id} className="border rounded-2xl p-4 bg-slate-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-slate-600">
                        {p.category} • {p.brand} • Rp{Number(p.price).toLocaleString("id-ID")}
                      </div>

                      {/* ✅ URL gambar hidden by default */}
                      <div className="mt-2 text-xs text-slate-500">
                        Image URL:{" "}
                        <span className="font-mono">
                          {revealed ? (p.image || "(empty)") : maskUrl(p.image)}
                        </span>
                        {!!p.image && (
                          <button
                            type="button"
                            onClick={() => setRevealMap((m) => ({ ...m, [p.id]: !m[p.id] }))}
                            className="ml-2 text-indigo-700 hover:underline"
                          >
                            {revealed ? "hide" : "reveal"}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="rounded-xl border px-3 py-2 hover:bg-white"
                        disabled={!imported}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(p.id)}
                        className="rounded-xl border px-3 py-2 text-red-600 hover:bg-white"
                        disabled={!imported}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
