import { useMemo, useState, useEffect } from "react";
import { getOrderSummary } from "../../utils/orderStorage.js";

function readJson(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
        return fallback;
    }
}

function formatIDR(n) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number(n || 0));
}

export default function AdminDashboard() {
    const [usersCount, setUsersCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const users = readJson("lcd_users", []);
        const products = readJson("lcd_products", null);
        setUsersCount(Array.isArray(users) ? users.length : 0);
        setProductsCount(Array.isArray(products) ? products.length : 0);
    }, []);

    // Refresh kecil kalau admin baru ubah status order (tanpa realtime, cukup re-render)
    useEffect(() => {
        const t = setInterval(() => setTick((v) => v + 1), 2000);
        return () => clearInterval(t);
    }, []);

    const summary = useMemo(() => getOrderSummary(), [tick]);

    return (
        <div className="bg-white border rounded-3xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <p className="text-slate-600 mt-1">
                Kelola user, produk, dan order (statis/localStorage).
            </p>

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border p-4 bg-slate-50">
                    <div className="text-sm text-slate-600">Total User</div>
                    <div className="text-3xl font-extrabold mt-1">{usersCount}</div>
                </div>

                <div className="rounded-2xl border p-4 bg-slate-50">
                    <div className="text-sm text-slate-600">Produk (Local)</div>
                    <div className="text-3xl font-extrabold mt-1">{productsCount}</div>
                    <div className="text-xs text-slate-500 mt-1">
                        (0 berarti belum import ke local)
                    </div>
                </div>

                <div className="rounded-2xl border p-4 bg-slate-50">
                    <div className="text-sm text-slate-600">Total Order</div>
                    <div className="text-3xl font-extrabold mt-1">{summary.totalOrders}</div>
                    <div className="text-xs text-slate-500 mt-1">Pending: {summary.pendingOrders}</div>
                </div>

                <div className="rounded-2xl border p-4 bg-slate-50">
                    <div className="text-sm text-slate-600">Revenue (Paid)</div>
                    <div className="text-xl font-extrabold mt-1">{formatIDR(summary.revenuePaid)}</div>
                    <div className="text-xs text-slate-500 mt-1">All: {formatIDR(summary.revenueAll)}</div>
                </div>
            </div>
        </div>
    );
}
