import { useEffect, useMemo, useState } from "react";
import { useUserAuth } from "../context/userAuthContext.jsx";
import { getUserOrders, onOrdersUpdated } from "../utils/orderStorage.js";

function formatIDR(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number(n || 0));
}

function Badge({ status }) {
  const cls =
    status === "paid"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-amber-100 text-amber-800 border-amber-200";
  return <span className={`text-xs px-2 py-1 rounded-full border ${cls}`}>{status}</span>;
}

export default function Profile() {
  const { user, logout, updateProfile } = useUserAuth();

  // form profile
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "",
    address: user?.address || "",
  });

  const [msg, setMsg] = useState("");
  const [openOrderId, setOpenOrderId] = useState(null);
  const [tick, setTick] = useState(0);

  // sync form jika user berubah
  useEffect(() => {
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      city: user?.city || "",
      address: user?.address || "",
    });
  }, [user?.id]);

  // auto refresh orders saat ada perubahan status/checkout
  useEffect(() => {
    const off = onOrdersUpdated(() => setTick((v) => v + 1));
    return off;
  }, []);

  const orders = useMemo(() => getUserOrders(user?.id), [user?.id, tick]);

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSave = (e) => {
    e.preventDefault();
    setMsg("");

    const res = updateProfile(form);
    if (res.ok) setMsg("Profil berhasil diupdate.");
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile */}
        <div className="bg-white border rounded-3xl p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold">Profil</h1>
              <p className="text-slate-600 text-sm mt-1">
                Data tersimpan lokal (localStorage) — cocok untuk demo UAS.
              </p>
            </div>
            <div className="text-xs text-slate-500 break-all">
              ID: <b>{user?.id}</b>
            </div>
          </div>

          {msg && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-3 text-sm">
              {msg}
            </div>
          )}

          <form onSubmit={onSave} className="mt-5 grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-600">Email</label>
              <input
                value={user?.email || ""}
                disabled
                className="mt-1 w-full rounded-xl border px-3 py-2 bg-slate-50 text-slate-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">Nama</label>
              <input
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">No HP</label>
              <input
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">Kota</label>
              <input
                value={form.city}
                onChange={(e) => onChange("city", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Bandung/Jakarta/..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-slate-600">Alamat</label>
              <textarea
                value={form.address}
                onChange={(e) => onChange("address", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none min-h-[90px]"
                placeholder="Jalan, nomor rumah, RT/RW..."
              />
            </div>

            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2">
              <button className="rounded-2xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 active:scale-[0.99] transition">
                Simpan Profil
              </button>
              <button
                type="button"
                onClick={() => setForm({ name: user?.name || "", phone: user?.phone || "", city: user?.city || "", address: user?.address || "" })}
                className="rounded-2xl border px-4 py-2 hover:bg-slate-50 active:scale-[0.99] transition"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Order history */}
          <div className="mt-10">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-lg font-bold">Order History</div>
                <div className="text-sm text-slate-600">
                  Status bisa berubah jika admin update (pending/paid).
                </div>
              </div>
              <div className="text-sm text-slate-500">
                Total: <b>{orders.length}</b>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {orders.length === 0 ? (
                <div className="text-slate-600">Belum ada order.</div>
              ) : (
                orders.map((o) => {
                  const open = openOrderId === o.id;
                  return (
                    <div key={o.id} className="border rounded-2xl p-4 bg-slate-50">
                      <button
                        onClick={() => setOpenOrderId((cur) => (cur === o.id ? null : o.id))}
                        className="w-full text-left"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <div className="font-semibold">{o.id}</div>
                            <div className="text-xs text-slate-500 mt-1">
                              {new Date(o.createdAt).toLocaleString("id-ID")}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge status={o.status} />
                            <div className="font-extrabold">{formatIDR(o.total)}</div>
                            <span className="text-xs text-slate-500">{open ? "▲" : "▼"}</span>
                          </div>
                        </div>
                      </button>

                      {open && (
                        <div className="mt-3 text-sm text-slate-700">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="rounded-xl border bg-white p-3">
                              <div className="text-xs text-slate-500">Pengiriman</div>
                              <div className="font-semibold mt-1">{o.shippingAddress?.fullName}</div>
                              <div className="text-sm">{o.shippingAddress?.phone}</div>
                              <div className="text-sm">{o.shippingAddress?.city}</div>
                              <div className="text-sm mt-1">{o.shippingAddress?.address}</div>
                            </div>

                            <div className="rounded-xl border bg-white p-3">
                              <div className="text-xs text-slate-500">Pembayaran</div>
                              <div className="mt-1">
                                Metode: <b>{o.paymentMethod}</b>
                              </div>
                              <div className="mt-1">
                                Subtotal: <b>{formatIDR(o.subtotal)}</b>
                              </div>
                              <div className="mt-1">
                                Shipping: <b>{formatIDR(o.shipping)}</b>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 rounded-xl border bg-white p-3">
                            <div className="text-xs text-slate-500">Items</div>
                            <div className="mt-2 space-y-1">
                              {o.items.map((it) => (
                                <div key={it.id} className="flex justify-between gap-3">
                                  <div className="truncate">
                                    {it.name} <span className="text-slate-500">x{it.qty}</span>
                                  </div>
                                  <div className="font-semibold">{formatIDR(it.price * it.qty)}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white border rounded-3xl p-6 shadow-sm h-fit lg:sticky lg:top-24">
          <div className="font-semibold">Akun</div>
          <div className="text-sm text-slate-600 mt-2">
            Login sebagai: <b className="break-all">{user?.email}</b>
          </div>

          <button
            onClick={logout}
            className="mt-4 w-full rounded-2xl border py-2 hover:bg-slate-50 active:scale-[0.99] transition"
          >
            Logout
          </button>

          <div className="mt-4 text-xs text-slate-500">
            Admin panel punya tampilan terpisah (URL khusus).
          </div>
        </div>
      </div>
    </section>
  );
}
