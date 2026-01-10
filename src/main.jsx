import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// ✅ Providers
import { CartProvider } from "./context/cartContext2.jsx";
import { ToastProvider } from "./context/ToastContext.jsx"; // kalau nama file kamu toastContext.jsx, sesuaikan casingnya!
import { UserAuthProvider } from "./context/UserAuthProvider.jsx";
import { AdminAuthProvider } from "./context/AdminAuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ToastProvider>
        <UserAuthProvider>
          <AdminAuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AdminAuthProvider>
        </UserAuthProvider>
      </ToastProvider>
    </HashRouter>
  </React.StrictMode>
);
