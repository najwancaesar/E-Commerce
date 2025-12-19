import { useEffect, useMemo, useState } from "react";

const LOCAL_PRODUCTS_KEY = "lcd_products";

/**
 * Hook ambil produk:
 * 1) Jika admin sudah menyimpan produk local (lcd_products) -> pakai itu.
 * 2) Kalau tidak ada -> fetch dari API/JSON (env atau public/products.json)
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const apiUrl =
    import.meta.env.VITE_PRODUCTS_API_URL || `${import.meta.env.BASE_URL}products.json`;

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErrorMsg("");

        // 1) coba load dari localStorage dulu
        try {
          const raw = localStorage.getItem(LOCAL_PRODUCTS_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              if (alive) setProducts(parsed);
              return;
            }
          }
        } catch {
          // ignore
        }

        // 2) fallback: fetch dari API/JSON
        const res = await fetch(apiUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} saat fetch products`);

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Format JSON salah: harus array []");

        if (alive) setProducts(data);
      } catch (e) {
        console.error("Gagal load products:", e);
        if (alive) {
          setProducts([]);
          setErrorMsg(String(e?.message || "Gagal ambil data produk"));
        }
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [apiUrl]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return ["All", ...Array.from(set)];
  }, [products]);

  return { products, categories, brands, loading, errorMsg, apiUrl };
}
