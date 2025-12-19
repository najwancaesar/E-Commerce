import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts.js";
import { formatIDR } from "../utils/formatCurrency.js";
import { useCart } from "../context/cartContext2.jsx";
import { useToast } from "../context/toastContext2.jsx";
import SmartImage from "../components/SmartImage.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { pushToast } = useToast();

  const product = useMemo(
    () => products.find((p) => p.id === id),
    [products, id]
  );

  if (loading)
    return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  if (!product)
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">Produk tidak ditemukan.</div>
    );

  const onAdd = () => {
    addToCart(product);
    pushToast(`Ditambahkan: ${product.name}`, "success");
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/products" className="text-slate-600 hover:underline">
        ← Kembali ke Produk
      </Link>

      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
          <div className="h-80">
            <SmartImage
              src={product.image}
              alt={product.name}
              className="h-80"
              roundedClassName="rounded-none"
            />
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6 shadow-sm">
          <div className="text-sm text-slate-500">
            {product.category} • {product.brand}
          </div>
          <h1 className="text-2xl font-bold mt-1">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="text-xl font-bold">{formatIDR(product.price)}</div>
            <div className="text-slate-600">⭐ {product.rating}</div>
            <div className="text-slate-600">Stock: {product.stock}</div>
          </div>

          <p className="mt-4 text-slate-700 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={onAdd}
            className="
              mt-6 w-full rounded-2xl bg-indigo-600 text-white py-3
              transition-all duration-150
              hover:bg-indigo-700 hover:shadow-sm
              active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
            "
          >
            Tambah ke Keranjang
          </button>

          <div className="mt-3 text-xs text-slate-500">
            Tip: kalau gambar belum ada, isi field <b>image</b> di JSON dengan
            URL gambar.
          </div>
        </div>
      </div>
    </section>
  );
}
