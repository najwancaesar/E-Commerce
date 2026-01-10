import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

/**
 * CartContext dipakai untuk menyimpan state keranjang secara global
 * supaya bisa diakses dari Navbar, ProductCard, Cart, Checkout, dll.
 */
const CartContext = createContext(null);

/**
 * Reducer: mengatur perubahan state cart berdasarkan action.
 * Best practice untuk state yang kompleks: add/remove/setQty/clear.
 */
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;

      // cek apakah item sudah ada di cart
      const existing = state.items.find((x) => x.id === item.id);

      // kalau ada -> qty + 1, kalau belum -> tambah item baru qty=1
      const items = existing
        ? state.items.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + 1 } : x
          )
        : [...state.items, { ...item, qty: 1 }];

      return { ...state, items };
    }

    case "REMOVE": {
      const id = action.payload;
      return { ...state, items: state.items.filter((x) => x.id !== id) };
    }

    case "SET_QTY": {
      const { id, qty } = action.payload;

      // qty minimal 1 biar tidak 0 / negatif
      const safeQty = Number.isFinite(qty) ? Math.max(1, qty) : 1;

      return {
        ...state,
        items: state.items.map((x) =>
          x.id === id ? { ...x, qty: safeQty } : x
        ),
      };
    }

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

/**
 * Ambil state awal dari localStorage
 * supaya keranjang tidak hilang saat refresh browser.
 */
function loadInitialCart() {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);

    // validasi sederhana
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

/**
 * CartProvider membungkus seluruh app (di main.jsx)
 * agar semua halaman bisa akses cart.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

  // simpan ke localStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  // hitung subtotal (total harga)
  const subtotal = useMemo(() => {
    return state.items.reduce((sum, x) => sum + x.price * x.qty, 0);
  }, [state.items]);

  // value yang dibagikan ke seluruh app
  const value = useMemo(
    () => ({
      items: state.items,
      subtotal,

      // fungsi-fungsi aksi (dipakai tombol di UI)
      addToCart: (product) => dispatch({ type: "ADD", payload: product }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", payload: id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook untuk pakai cart dengan mudah di component lain.
 * Contoh: const { items, addToCart } = useCart();
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}
