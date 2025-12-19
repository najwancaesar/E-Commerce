import { useEffect, useState } from "react";

const USERS_KEY = "lcd_users";

function readUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
        return [];
    }
}

function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export default function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(readUsers());
    }, []);

    const removeUser = (id) => {
        const next = users.filter((u) => u.id !== id);
        writeUsers(next);
        setUsers(next);
    };

    return (
        <div className="bg-white border rounded-3xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold">Kelola User</h1>
            <p className="text-slate-600 mt-1">
                User disimpan lokal (localStorage). Ini hanya demo UAS.
            </p>

            <div className="mt-6 space-y-3">
                {users.length === 0 ? (
                    <div className="text-slate-600 text-sm">Belum ada user.</div>
                ) : (
                    users.map((u) => (
                        <div key={u.id} className="border rounded-2xl p-4 bg-slate-50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <div className="font-semibold">{u.name}</div>
                                    <div className="text-sm text-slate-600">{u.email}</div>
                                    <div className="text-xs text-slate-500 mt-1">
                                        ID: {u.id} • Created: {u.createdAt ? new Date(u.createdAt).toLocaleString("id-ID") : "-"}
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeUser(u.id)}
                                    className="rounded-xl border px-3 py-2 text-red-600 hover:bg-white"
                                >
                                    Hapus User
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 text-xs text-slate-500">
                Catatan: admin tidak bisa “lihat password” yang aman di real app. Ini demo statis.
            </div>
        </div>
    );
}
