import { Link } from "react-router-dom";
import { formatIDR } from "../utils/formatCurrency.js";
import { useCart } from "../context/cartContext2.jsx";
import { useToast } from "../context/toastContext2.jsx";
import SmartImage from "./SmartImage.jsx";

export default function ProductCard({ product, priority = false }) {
  const { addToCart } = useCart();
  const { pushToast } = useToast();

  const onAdd = () => {
    addToCart(product);
    pushToast(`Ditambahkan: ${product.name}`, "success");
  };

  return (
    <div
      className="
        group bg-white border rounded-2xl overflow-hidden
        shadow-sm transition-all duration-200
        hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-200
      "
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="h-44">
          <SmartImage
            src={product.image}
            alt={product.name}
            className="h-44"
            roundedClassName="rounded-none"
            priority={priority}
            // layout lebih stabil:
            width={800}
            height={600}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
          />
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs text-slate-500">
          {product.category} • {product.brand}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="font-semibold hover:underline decoration-indigo-400"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">{formatIDR(product.price)}</div>
          <div className="text-sm text-slate-600">⭐ {product.rating}</div>
        </div>

        <div className="mt-1 text-xs text-slate-500">Stok: {product.stock}</div>

        <button
          onClick={onAdd}
          className="
            mt-4 w-full rounded-xl bg-indigo-600 text-white py-2
            transition-all duration-150
            hover:bg-indigo-700 hover:shadow-sm
            active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
          "
        >
          Tambah ke Keranjang
        </button>

        <div className="mt-2 text-[11px] text-slate-400 opacity-0 transition group-hover:opacity-100">
          Klik gambar untuk lihat detail →
        </div>
      </div>
    </div>
  );
}
