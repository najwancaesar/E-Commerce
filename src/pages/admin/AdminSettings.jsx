import { useState } from "react";
import { readSettings, writeSettings } from "../../utils/settingsStorage.js";

export default function AdminSettings() {
  const current = readSettings();

  const [form, setForm] = useState({
    storeName: current.storeName,
    companyName: current.companyName,
    supportEmail: current.supportEmail,
    supportPhone: current.supportPhone,
    shippingFee: current.shippingFee,
  });

  const [msg, setMsg] = useState("");

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSave = (e) => {
    e.preventDefault();
    setMsg("");
    writeSettings({
      ...form,
      shippingFee: Number(form.shippingFee || 0),
    });
    setMsg("Settings berhasil disimpan. Checkout akan pakai shippingFee terbaru.");
  };

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-slate-600 mt-1">
        Pengaturan toko (statis/localStorage). Shipping dipakai di Checkout.
      </p>

      {msg && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-3 text-sm">
          {msg}
        </div>
      )}

      <form onSubmit={onSave} className="mt-6 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-600">Store Name</label>
          <input
            value={form.storeName}
            onChange={(e) => onChange("storeName", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Company Name</label>
          <input
            value={form.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Support Email</label>
          <input
            value={form.supportEmail}
            onChange={(e) => onChange("supportEmail", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="email"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Support Phone</label>
          <input
            value={form.supportPhone}
            onChange={(e) => onChange("supportPhone", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-slate-600">Shipping Fee (IDR)</label>
          <input
            value={form.shippingFee}
            onChange={(e) => onChange("shippingFee", e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="number"
            min={0}
          />
          <div className="text-xs text-slate-500 mt-1">
            Ini akan dipakai pada halaman Checkout.
          </div>
        </div>

        <button className="sm:col-span-2 rounded-2xl bg-slate-900 text-white py-2 hover:bg-slate-800 active:scale-[0.99] transition">
          Simpan Settings
        </button>
      </form>
    </div>
  );
}
