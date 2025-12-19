import { useEffect, useMemo, useState } from "react";
import { onOrdersUpdated, readOrders } from "../../utils/orderStorage.js";

function formatIDR(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number(n || 0));
}

function toDateKey(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function makeRange(days) {
  const out = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    out.push(toDateKey(d));
  }
  return out;
}

/**
 * BarChart (FIX)
 * - Tinggi bar pakai px (bukan %) supaya pasti kelihatan
 * - Axis label responsif (grid dynamic)
 * - Ada fallback kalau datanya 0 semua
 */
function BarChart({ title, labels, values, valueFormatter }) {
  const max = Math.max(1, ...values.map((v) => Number(v || 0)));

  const BAR_AREA_PX = 160; // tinggi area bar (px)

  const allZero = values.every((v) => Number(v || 0) === 0);

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <div className="font-semibold">{title}</div>

      <div className="mt-4">
        {/* Area bar */}
        <div className="flex items-end gap-2" style={{ height: BAR_AREA_PX }}>
          {values.map((v, idx) => {
            const num = Number(v || 0);
            // min 2px supaya kelihatan ada “bar kecil” jika > 0
            const h = num === 0 ? 0 : Math.max(2, Math.round((num / max) * BAR_AREA_PX));

            const tooltip = valueFormatter ? valueFormatter(num) : String(num);

            return (
              <div key={labels[idx]} className="flex-1">
                <div
                  className="w-full rounded-xl bg-indigo-600/80 hover:bg-indigo-600 transition"
                  style={{ height: h }}
                  title={`${labels[idx]}: ${tooltip}`}
                />
              </div>
            );
          })}
        </div>

        {/* Label bawah */}
        <div
          className="mt-2 grid gap-2"
          style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
        >
          {labels.map((l) => (
            <div key={l} className="text-[10px] text-slate-500 text-center">
              {l.slice(5)}
            </div>
          ))}
        </div>

        <div className="mt-3 text-xs text-slate-500">
          {allZero ? "Belum ada data pada rentang ini." : "Hover bar untuk lihat detail."}
        </div>
      </div>
    </div>
  );
}

export default function AdminReports() {
  const [days, setDays] = useState(7);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const off = onOrdersUpdated(() => setTick((v) => v + 1));
    return off;
  }, []);

  const orders = useMemo(() => readOrders(), [tick]);
  const keys = useMemo(() => makeRange(days), [days]);

  const { ordersPerDay, paidPerDay, pendingPerDay } = useMemo(() => {
    const byDay = {};
    const paidByDay = {};
    const pendingByDay = {};

    for (const k of keys) {
      byDay[k] = 0;
      paidByDay[k] = 0;
      pendingByDay[k] = 0;
    }

    for (const o of orders) {
      const k = toDateKey(o.createdAt);
      if (!(k in byDay)) continue;

      byDay[k] += 1;
      if (o.status === "paid") paidByDay[k] += Number(o.total || 0);
      else pendingByDay[k] += Number(o.total || 0);
    }

    return {
      ordersPerDay: keys.map((k) => byDay[k]),
      paidPerDay: keys.map((k) => paidByDay[k]),
      pendingPerDay: keys.map((k) => pendingByDay[k]),
    };
  }, [orders, keys]);

  const totals = useMemo(() => {
    const paid = orders
      .filter((o) => o.status === "paid")
      .reduce((s, o) => s + Number(o.total || 0), 0);

    const pending = orders
      .filter((o) => o.status === "pending")
      .reduce((s, o) => s + Number(o.total || 0), 0);

    return { paid, pending, all: paid + pending };
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-slate-600 mt-1">Grafik sederhana untuk monitoring order & transaksi.</p>
          </div>

          <div className="w-full sm:w-56">
            <label className="text-sm text-slate-600">Rentang hari</label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
            >
              <option value={7}>7 hari</option>
              <option value={14}>14 hari</option>
              <option value={30}>30 hari</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border p-4 bg-slate-50">
            <div className="text-sm text-slate-600">Revenue Paid</div>
            <div className="text-xl font-extrabold mt-1">{formatIDR(totals.paid)}</div>
          </div>
          <div className="rounded-2xl border p-4 bg-slate-50">
            <div className="text-sm text-slate-600">Revenue Pending</div>
            <div className="text-xl font-extrabold mt-1">{formatIDR(totals.pending)}</div>
          </div>
          <div className="rounded-2xl border p-4 bg-slate-50">
            <div className="text-sm text-slate-600">Revenue Total</div>
            <div className="text-xl font-extrabold mt-1">{formatIDR(totals.all)}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BarChart title="Orders per Day" labels={keys} values={ordersPerDay} valueFormatter={(v) => `${v} order`} />
        <BarChart title="Revenue Paid per Day" labels={keys} values={paidPerDay} valueFormatter={(v) => formatIDR(v)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BarChart title="Revenue Pending per Day" labels={keys} values={pendingPerDay} valueFormatter={(v) => formatIDR(v)} />

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="font-semibold">Catatan</div>
          <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-2">
            <li>Grafik ini membaca data order dari localStorage.</li>
            <li>Status order bisa diubah di menu “Kelola Order”.</li>
            <li>Kalau bar 0 semua: berarti pada rentang hari itu tidak ada order (cek tanggal order).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
