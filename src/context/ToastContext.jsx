import React, { useMemo, useState } from "react";
import { ToastContext } from "./toastContext2";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const pushToast = (message, type = "success") => {
    const id =
      (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now() + Math.random());

    setToasts((t) => [...t, { id, message, type }]);

    // auto dismiss
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2200);
  };

  const value = useMemo(() => ({ pushToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast stack */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="min-w-[220px] max-w-[320px] rounded-2xl border bg-white shadow-sm px-4 py-3
              animate-[toastIn_.18s_ease-out]"
          >
            <div className="text-sm font-semibold text-slate-900">
              {t.type === "success" ? "✅" : "ℹ️"} {t.message}
            </div>
            <div className="text-xs text-slate-500 mt-1">LCD — Local Central Digital</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toastIn {
          from { transform: translateY(-6px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
