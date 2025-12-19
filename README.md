# LCD (Local Central Digital) — E-Commerce React (UAS)

Website e-commerce bertema **LCD (Local Central Digital)** yang menjual produk digital seperti laptop, headset, keyboard, mouse, smartphone, printer, dll.  
Project ini dibuat untuk kebutuhan **penilaian UAS** menggunakan **React + Vite** dengan UI modern, interaktif, responsif, dan arsitektur front-end terstruktur.

---

## ✨ Fitur Utama (Sesuai Ketentuan)

✅ UI modern & responsive (mobile/tablet/desktop)  
✅ Routing menggunakan `react-router-dom`  
✅ Halaman Beranda (banner + navigasi)  
✅ Halaman Produk (≥ 10 produk)  
✅ Search & Filter produk  
✅ Detail Produk  
✅ Keranjang (Cart)  
✅ Checkout + validasi form  
✅ Order History (tersimpan di localStorage, tampil di Profile)  
✅ Admin Panel terpisah (login admin berbeda)  
✅ Admin: Kelola Produk, User, Order (pending/paid), Reports + grafik sederhana, Settings

---

## 🧰 Tech Stack

- React (Vite)
- React Router DOM
- Tailwind CSS (UI)
- localStorage (Auth, Cart, Orders, Settings)
- Data produk dari JSON / API (fetch)

---

## 🔐 Akun Demo

### User

- Email: `user@lcd.com`
- Password: `user123`

### Admin

- Email: `admin@lcd.com`
- Password: `admin123`

> Catatan: Data disimpan di localStorage untuk kebutuhan demo (tanpa database).

---

## 📁 Struktur Folder (Ringkas)

src/
components/ # komponen UI (Navbar, ProductCard, SmartImage, dll)
context/ # state global (Cart, Toast, Auth, AdminAuth)
hooks/ # custom hook (useProducts)
layouts/ # ShopLayout (navbar+footer)
pages/ # halaman utama (Home, Products, ProductDetail, Cart, Checkout, Profile)
pages/admin/ # halaman admin (AdminLayout, Dashboard, Products, Users, Orders, Reports, Settings)
routes/ # route guard (RequireUser, RequireAdmin)
utils/ # helper: orderStorage, settingsStorage, format currency, dll
public/
products.json # data produk (bisa diubah ke API online)

---

yaml

## 🚀 Cara Menjalankan di Local

1; Install dependencies:

```bash
npm install
```

2; Jalankan Dev Server:

npm run dev

3; Buka browser
User:

- http://repo-github/#/
  Admin:
- http://repo-github/#/lcd-admin/login/

🧾 Data Produk & Gambar

Produk diambil via fetch dari JSON / API.

Jika pakai file lokal: public/products.json

Field gambar menggunakan image: "https://..." (URL gambar)

⚡ Tips agar gambar cepat:

Gunakan format webp bila ada

Gunakan CDN image (misal imagekit / cloudinary) kalau ingin lebih cepat

Hindari link gambar yang “hotlink protection” (sering gagal tampil)

🌍 Deploy ke GitHub Pages (Step-by-step)

Karena GitHub Pages tidak mendukung refresh routing SPA tanpa konfigurasi server, project ini menggunakan HashRouter (/#/route) agar aman.

1. Install gh-pages
   npm i -D gh-pages

2. Set base di vite.config.js
   Ubah:
   base: "/Repo_Name/",

3. Tambahkan script deploy di package.json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"

4. Push project ke github
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main

5. Deploy
   npm run deploy

6. Aktifkan github pages
   Di GitHub repo:

Settings → Pages

Source: Deploy from a branch

Branch: gh-pages / (root)

Save

Link biasanya:
https://USERNAME.github.io/REPO_NAME/

🧪 Build Production
npm run build
npm run preview

✅ Catatan Penting

Admin panel terpisah dan tidak memakai Navbar toko.

Semua data (cart/order/settings/user) disimpan di localStorage untuk demo.

Jika terjadi 404 saat deploy, pastikan:

menggunakan HashRouter

base di vite.config.js sesuai nama repo

URL GitHub Pages dibuka menggunakan path /#/...

📄 Lisensi

Project ini dibuat untuk keperluan akademik (UAS).

---

# 4. Step-by-step deploy GitHub Pages (ringkas versi checklist)

1. Pastikan `HashRouter` di `src/main.jsx`
2. Set `base: "/nama-repo/"` di `vite.config.js`
3. Install:
   ```bash
   npm i -D gh-pages
   ```
4. Tambah scripts predeploy + deploy di package.json

5. Push repo ke GitHub

6. Run:

npm run deploy

7. GitHub → Settings → Pages → branch gh-pages
