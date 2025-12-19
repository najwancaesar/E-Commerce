import React, { useEffect, useMemo, useReducer } from "react";
import { CartContext } from "./cartContext2.jsx";

/**
 * Reducer: mengatur perubahan state cart berdasarkan action.
 */
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const existing = state.items.find((x) => x.id === item.id);

      const items = existing
        ? state.items.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x))
        : [...state.items, { ...item, qty: 1 }];

      return { ...state, items };
    }

    case "REMOVE": {
      const id = action.payload;
      return { ...state, items: state.items.filter((x) => x.id !== id) };
    }

    case "SET_QTY": {
      const { id, qty } = action.payload;
      const safeQty = Number.isFinite(qty) ? Math.max(1, qty) : 1;

      return {
        ...state,
        items: state.items.map((x) => (x.id === id ? { ...x, qty: safeQty } : x)),
      };
    }

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

function loadInitialCart() {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

/**
 * CartProvider membungkus seluruh app (di main.jsx)
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const subtotal = useMemo(() => {
    return state.items.reduce((sum, x) => sum + x.price * x.qty, 0);
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      subtotal,
      addToCart: (product) => dispatch({ type: "ADD", payload: product }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", payload: id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
