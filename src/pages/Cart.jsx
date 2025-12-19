import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext2.jsx";
import { formatIDR } from "../utils/formatCurrency.js";
import { useToast } from "../context/toastContext2.jsx";
import SmartImage from "../components/SmartImage.jsx";

export default function Cart() {
  const { items, subtotal, removeFromCart, setQty } = useCart();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const inc = (id, current) => setQty(id, current + 1);
  const dec = (id, current) => setQty(id, Math.max(1, current - 1));

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <h2 className="text-2xl font-bold">Keranjang</h2>
      <p className="text-slate-600">Ubah jumlah atau hapus item.</p>

      {items.length === 0 ? (
        <div className="mt-6 bg-white border rounded-2xl p-6">
          Keranjang kosong.{" "}
          <Link to="/products" className="underline decoration-indigo-400">
            Belanja dulu
          </Link>
          .
        </div>
      ) : (
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((x) => (
              <div
                key={x.id}
                className="bg-white border rounded-2xl p-4 transition hover:border-indigo-200 hover:shadow-sm"
              >
                {/* Mobile stack */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-24 h-44 sm:h-24">
                    <SmartImage
                      src={x.image}
                      alt={x.name}
                      className="w-full h-full"
                      priority={true}
                      width={240}
                      height={240}
                      sizes="(max-width: 640px) 100vw, 96px"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold">{x.name}</div>
                    <div className="text-slate-600 text-sm">{formatIDR(x.price)}</div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-500">Qty</span>

                      <button
                        onClick={() => dec(x.id, x.qty)}
                        className="w-9 h-9 rounded-xl border bg-white hover:bg-slate-50 active:scale-[0.98] transition"
                        aria-label="Kurangi"
                      >
                        −
                      </button>

                      <div className="w-10 text-center font-semibold">{x.qty}</div>

                      <button
                        onClick={() => inc(x.id, x.qty)}
                        className="w-9 h-9 rounded-xl border bg-white hover:bg-slate-50 active:scale-[0.98] transition"
                        aria-label="Tambah"
                      >
                        +
                      </button>

                      <button
                        onClick={() => {
                          removeFromCart(x.id);
                          pushToast(`Dihapus: ${x.name}`, "info");
                        }}
                        className="sm:ml-auto text-sm text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>

                    {/* Total per item mobile-friendly */}
                    <div className="mt-3 sm:hidden font-bold">
                      Total: {formatIDR(x.price * x.qty)}
                    </div>
                  </div>

                  {/* Total per item desktop */}
                  <div className="hidden sm:block font-bold">
                    {formatIDR(x.price * x.qty)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white border rounded-2xl p-5 h-fit shadow-sm lg:sticky lg:top-24">
            <div className="font-semibold">Ringkasan</div>

            <div className="mt-3 flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold">{formatIDR(subtotal)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 w-full rounded-xl bg-indigo-600 text-white py-2 hover:bg-indigo-700 hover:shadow-sm transition active:scale-[0.98]"
            >
              Checkout
            </button>

            <div className="mt-3 text-xs text-slate-500">
              Checkout sederhana dengan validasi form.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
