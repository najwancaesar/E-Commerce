import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // WAJIB: base harus sama dengan nama repository GitHub kamu
  // contoh repo: https://github.com/USERNAME/uas-ecommerce
  // maka base: "/uas-ecommerce/"
  base: "/REPO_NAME/",
});
