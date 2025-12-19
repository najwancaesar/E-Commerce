import { useEffect, useMemo, useState } from "react";
import { readOrders, updateOrderStatus, getOrderSummary, onOrdersUpdated } from "../../utils/orderStorage.js";

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

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const reload = () => setOrders(readOrders());

  useEffect(() => {
    reload();
    const off = onOrdersUpdated(reload);
    return off;
  }, []);

  const summary = useMemo(() => getOrderSummary(), [orders]);

  const onChangeStatus = (id, status) => {
    updateOrderStatus(id, status);
    // reload akan terpanggil via event
  };

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Kelola Order</h1>
      <p className="text-slate-600 mt-1">
        Ubah status (pending/paid) & lihat total transaksi.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border p-4 bg-slate-50">
          <div className="text-sm text-slate-600">Total Order</div>
          <div className="text-2xl font-extrabold mt-1">{summary.totalOrders}</div>
        </div>
        <div className="rounded-2xl border p-4 bg-slate-50">
          <div className="text-sm text-slate-600">Pending</div>
          <div className="text-2xl font-extrabold mt-1">{summary.pendingOrders}</div>
        </div>
        <div className="rounded-2xl border p-4 bg-slate-50">
          <div className="text-sm text-slate-600">Paid</div>
          <div className="text-2xl font-extrabold mt-1">{summary.paidOrders}</div>
        </div>
        <div className="rounded-2xl border p-4 bg-slate-50">
          <div className="text-sm text-slate-600">Revenue (Paid)</div>
          <div className="text-lg font-extrabold mt-1">{formatIDR(summary.revenuePaid)}</div>
        </div>
      </div>

      <div className="mt-6 hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2">Order</th>
              <th className="py-2">User</th>
              <th className="py-2">Tanggal</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
              <th className="py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="py-3 font-semibold">{o.id}</td>
                <td className="py-3">{o.userEmail}</td>
                <td className="py-3">{new Date(o.createdAt).toLocaleString("id-ID")}</td>
                <td className="py-3 font-bold">{formatIDR(o.total)}</td>
                <td className="py-3"><Badge status={o.status} /></td>
                <td className="py-3">
                  <select
                    value={o.status}
                    onChange={(e) => onChangeStatus(o.id, e.target.value)}
                    className="rounded-xl border px-3 py-2 bg-white"
                  >
                    <option value="pending">pending</option>
                    <option value="paid">paid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div className="text-slate-600 mt-3">Belum ada order.</div>}
      </div>

      <div className="mt-6 lg:hidden space-y-3">
        {orders.length === 0 ? (
          <div className="text-slate-600">Belum ada order.</div>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="border rounded-2xl p-4 bg-slate-50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold">{o.id}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(o.createdAt).toLocaleString("id-ID")}
                  </div>
                </div>
                <Badge status={o.status} />
              </div>

              <div className="mt-3 text-sm">
                User: <b className="break-all">{o.userEmail}</b>
              </div>
              <div className="mt-1 text-sm">
                Total: <b>{formatIDR(o.total)}</b>
              </div>

              <div className="mt-3">
                <label className="text-xs text-slate-600">Ubah status</label>
                <select
                  value={o.status}
                  onChange={(e) => onChangeStatus(o.id, e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
                >
                  <option value="pending">pending</option>
                  <option value="paid">paid</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
