import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext2.jsx";
import { useToast } from "../context/toastContext2.jsx";
import { useUserAuth } from "../context/userAuthContext.jsx";
import { createOrder } from "../utils/orderStorage.js";
import { readSettings } from "../utils/settingsStorage.js";

function formatIDR(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number(n || 0));
}

export default function Checkout() {
  const nav = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useUserAuth();
  const { pushToast } = useToast();

  const settings = readSettings();
  const shippingFee = Number(settings.shippingFee || 0);

  const shipping = useMemo(() => (subtotal > 0 ? shippingFee : 0), [subtotal, shippingFee]);
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    payment: "cod",
    notes: "",
  });

  const [err, setErr] = useState("");

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (items.length === 0) return setErr("Keranjang kosong.");
    if (!form.fullName.trim()) return setErr("Nama wajib diisi.");
    if (!form.phone.trim()) return setErr("No HP wajib diisi.");
    if (!form.address.trim()) return setErr("Alamat wajib diisi.");
    if (!form.city.trim()) return setErr("Kota wajib diisi.");

    const order = {
      id: `ord-${Date.now()}`,
      userId: user.id,
      userEmail: user.email,
      status: "pending",
      createdAt: new Date().toISOString(),
      items: items.map((x) => ({ id: x.id, name: x.name, price: x.price, qty: x.qty })),
      subtotal,
      shipping,
      total,
      shippingAddress: {
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
        city: form.city,
        notes: form.notes,
      },
      paymentMethod: form.payment,
    };

    createOrder(order);
    clearCart();
    pushToast("Order berhasil dibuat (status: pending)", "success");
    nav("/profile", { replace: true });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-slate-600">
        Shipping mengikuti Admin Settings. Order disimpan lokal (tanpa database).
      </p>

      {err && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm">
          {err}
        </div>
      )}

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <form onSubmit={onSubmit} className="lg:col-span-2 bg-white border rounded-3xl p-6 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-600">Nama Lengkap</label>
              <input
                value={form.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">No HP</label>
              <input
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">Kota</label>
              <input
                value={form.city}
                onChange={(e) => onChange("city", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-slate-600">Alamat</label>
              <textarea
                value={form.address}
                onChange={(e) => onChange("address", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 min-h-[90px]"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-slate-600">Metode Pembayaran</label>
              <select
                value={form.payment}
                onChange={(e) => onChange("payment", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
              >
                <option value="cod">COD</option>
                <option value="transfer">Transfer</option>
                <option value="ewallet">E-Wallet</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-slate-600">Catatan (opsional)</label>
              <input
                value={form.notes}
                onChange={(e) => onChange("notes", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
              />
            </div>
          </div>

          <button className="mt-6 w-full rounded-2xl bg-indigo-600 text-white py-3 hover:bg-indigo-700 active:scale-[0.99] transition">
            Buat Order
          </button>
        </form>

        <div className="bg-white border rounded-3xl p-6 shadow-sm lg:sticky lg:top-24 h-fit">
          <div className="font-semibold">Ringkasan</div>

          <div className="mt-3 flex justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-bold">{formatIDR(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-slate-600">Shipping</span>
            <span className="font-bold">{formatIDR(shipping)}</span>
          </div>
          <div className="mt-3 pt-3 border-t flex justify-between">
            <span className="text-slate-700 font-semibold">Total</span>
            <span className="font-extrabold">{formatIDR(total)}</span>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Status default: <b>pending</b> (admin bisa ubah ke <b>paid</b>).
          </div>
        </div>
      </div>
    </section>
  );
}
