import React, { useMemo, useState } from "react";
import { AdminAuthContext } from "./adminAuthContext.jsx";

const ADMIN_SESSION_KEY = "lcd_admin_session";

/**
 * Admin statis (terpisah dari user)
 * URL login admin: /#/lcd-admin/login
 * email: admin@lcd.com
 * pass : admin123
 */
const ADMIN = {
    email: "admin@lcd.com",
    password: "admin123",
    name: "LCD Admin",
};

function readAdminSession() {
    try {
        return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "null");
    } catch {
        return null;
    }
}

export function AdminAuthProvider({ children }) {
    const [session, setSession] = useState(() => readAdminSession());

    const admin = useMemo(() => {
        if (!session?.isAdmin) return null;
        return { name: ADMIN.name, email: ADMIN.email };
    }, [session]);

    const loginAdmin = (email, password) => {
        if (email.toLowerCase() !== ADMIN.email.toLowerCase() || password !== ADMIN.password) {
            return { ok: false, message: "Admin credentials salah." };
        }
        const next = { isAdmin: true, loggedInAt: Date.now() };
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(next));
        setSession(next);
        return { ok: true };
    };

    const logoutAdmin = () => {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        setSession(null);
    };

    const value = useMemo(
        () => ({
            admin,
            isAdmin: Boolean(admin),
            loginAdmin,
            logoutAdmin,
        }),
        [admin]
    );

    return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
