import { createContext, useContext } from "react";

// Context khusus toast (jangan export komponen di sini)
export const ToastContext = createContext(null);

// Hook untuk akses toast dari component lain
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam ToastProvider");
  return ctx;
}
