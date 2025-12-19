import React, { useEffect, useMemo, useState } from "react";
import { UserAuthContext } from "./userAuthContext.jsx";

const USERS_KEY = "lcd_users";
const USER_SESSION_KEY = "lcd_user_session";

/**
 * Seed user demo
 * email: user@lcd.com
 * pass : user123
 */
function seedUsersIfEmpty() {
  const existing = localStorage.getItem(USERS_KEY);
  if (existing) return;

  const seed = [
    {
      id: "u-1",
      name: "Demo User",
      email: "user@lcd.com",
      password: "user123",
      phone: "",
      city: "",
      address: "",
      createdAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seed));
}

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

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(USER_SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function UserAuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());

  useEffect(() => {
    seedUsersIfEmpty();
  }, []);

  const currentUser = useMemo(() => {
    if (!session?.userId) return null;
    const users = readUsers();
    return users.find((u) => u.id === session.userId) || null;
  }, [session]);

  const login = (email, password) => {
    const users = readUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return { ok: false, message: "Email atau password salah." };

    const next = { userId: user.id, loggedInAt: Date.now() };
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(next));
    setSession(next);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(USER_SESSION_KEY);
    setSession(null);
  };

  const register = ({ name, email, password }) => {
    const users = readUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, message: "Email sudah terdaftar." };

    const newUser = {
      id: `u-${Date.now()}`,
      name,
      email,
      password,
      phone: "",
      city: "",
      address: "",
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [newUser, ...users];
    writeUsers(nextUsers);

    const nextSession = { userId: newUser.id, loggedInAt: Date.now() };
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);

    return { ok: true };
  };

  // ✅ update profile lebih lengkap
  const updateProfile = ({ name, phone, city, address }) => {
    if (!currentUser) return { ok: false, message: "Belum login." };

    const users = readUsers();
    const nextUsers = users.map((u) =>
      u.id === currentUser.id
        ? {
            ...u,
            name: name ?? u.name,
            phone: phone ?? u.phone,
            city: city ?? u.city,
            address: address ?? u.address,
          }
        : u
    );
    writeUsers(nextUsers);

    // trigger recompute
    setSession((s) => ({ ...s }));
    return { ok: true };
  };

  const value = useMemo(
    () => ({
      user: currentUser,
      isLoggedIn: Boolean(currentUser),
      login,
      logout,
      register,
      updateProfile,
    }),
    [currentUser]
  );

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
}
