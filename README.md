<div align="center">
  <h1>LCD (Local Central Digital)</h1>
  <p><b>E-Commerce React App (UAS)</b></p>
  <p>Website e-commerce bertema LCD yang menjual produk digital seperti laptop, headset, keyboard, mouse, smartphone, printer, dan lainnya.</p>
  <p>
    <img alt="React" src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-4-646cff?logo=vite&logoColor=white" />
    <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss&logoColor=white" />
    <img alt="React Router" src="https://img.shields.io/badge/React_Router-6-ca4245?logo=reactrouter&logoColor=white" />
    <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub_Pages-deploy-222?logo=githubpages&logoColor=white" />
  </p>
  <p>
    <a href="#overview">Overview</a> | <a href="#live-demo">Live Demo</a> | <a href="#fitur-utama">Fitur</a> | <a href="#cara-menjalankan">Cara Menjalankan</a> | <a href="#routing-dan-deploy-github-pages">Deploy</a>
  </p>
</div>

<a id="overview"></a>
## ✨ Overview
LCD adalah aplikasi e-commerce front-end dengan pemisahan peran user dan admin. Seluruh data demo (auth, cart, orders, settings) disimpan di localStorage agar bisa dijalankan tanpa backend.

Highlights:
- 🛍️ Flow belanja lengkap dari katalog sampai checkout
- 🔐 Role terpisah untuk user dan admin
- ⚡ UI modern, interaktif, dan responsif
- 🧠 Data demo tersimpan di localStorage

<a id="live-demo"></a>
## 🌐 Live Demo
Ganti USERNAME dan REPO-NAME sesuai repo GitHub Pages kamu.
- User: https://najwancaesar.github.io/E-Commerce/#/
- Admin: https://najwancaesar.github.io/E-Commerce/#/lcd-admin/login/

<a id="fitur-utama"></a>
## 🧩 Fitur Utama
### User
- 🏠 Beranda dengan banner dan navigasi
- 🛒 Produk 10+ item, search, dan filter
- 🔎 Detail produk
- 🧺 Keranjang (Cart)
- ✅ Checkout dengan validasi form
- 🧾 Order History (tersimpan di localStorage, tampil di Profile)

### Admin
- 🔐 Login admin terpisah
- 🧰 Kelola produk, user, dan order (pending/paid)
- 📊 Reports dan grafik sederhana
- ⚙️ Settings untuk kebutuhan demo

<a id="tech-stack"></a>
## 🛠️ Tech Stack
- ⚛️ React + Vite
- 🧭 React Router DOM
- 🎨 Tailwind CSS
- 🧠 localStorage (Auth, Cart, Orders, Settings)
- 🔌 Data produk dari JSON atau API (fetch)

<a id="akun-demo"></a>
## 🔑 Akun Demo
### User
- Email: user@lcd.com
- Password: user123

### Admin
- Email: admin@lcd.com
- Password: admin123

Catatan: Seluruh data demo disimpan di localStorage (tanpa database).

<a id="struktur-folder"></a>
## 🗂️ Struktur Folder
```
.
|-- public/
|-- src/
|   |-- components/        # Komponen UI (Navbar, ProductCard, SmartImage, dll)
|   |-- context/           # State global (Cart, Toast, Auth, AdminAuth)
|   |-- hooks/             # Custom hooks (useProducts, dll)
|   |-- layouts/           # Layout umum (ShopLayout: navbar + footer)
|   |-- pages/             # Halaman user (Home, Products, ProductDetail, Cart, Checkout, Profile)
|   |   |-- admin/          # Halaman admin (AdminLayout, Dashboard, Products, Users, Orders, Reports, Settings)
|   |-- routes/            # Route guards (RequireUser, RequireAdmin)
|   |-- utils/             # Helper (orderStorage, settingsStorage, formatCurrency, dll)
|-- products.json          # Data produk (bisa diganti ke API online)
|-- README.md
|-- package.json
```

<a id="cara-menjalankan"></a>
## 🚀 Cara Menjalankan
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan dev server:
   ```bash
   npm run dev
   ```
3. Buka browser dan akses:
   - User: http://localhost:5173/#/
   - Admin: http://localhost:5173/#/lcd-admin/login/

<a id="data-produk-dan-gambar"></a>
## 🖼️ Data Produk dan Gambar
- Data produk diambil via fetch dari JSON atau API.
- Jika pakai file lokal, gunakan: public/products.json.
- Field gambar menggunakan image URL seperti: https://...

Tips agar gambar cepat:
- Gunakan format webp bila ada.
- Gunakan CDN image (misalnya imagekit atau cloudinary).
- Hindari link gambar yang memakai hotlink protection.

<a id="routing-dan-deploy-github-pages"></a>
## 🚢 Routing dan Deploy (GitHub Pages)
Karena GitHub Pages tidak mendukung refresh routing SPA tanpa konfigurasi server, project ini menggunakan HashRouter (/#/route).

### Step-by-step Deploy
1. Install gh-pages:
   ```bash
   npm i -D gh-pages
   ```
2. Set base di vite.config.js:
   ```js
   base: "/REPO-NAME/",
   ```
3. Tambahkan script deploy di package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Push project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/USERNAME/E-Commerce.git
   git push -u origin main
   ```
5. Deploy:
   ```bash
   npm run deploy
   ```
6. Aktifkan GitHub Pages:
   - Repo Settings -> Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)

Link biasanya:
https://najwancaesar.github.io/E-Commerce/

<a id="build-production"></a>
## 🧪 Build Production
```bash
npm run build
npm run preview
```

<a id="troubleshooting"></a>
## 🧯 Troubleshooting
Jika terjadi 404 saat deploy:
- Pastikan menggunakan HashRouter.
- Base di vite.config.js sesuai nama repo.
- URL GitHub Pages dibuka menggunakan path /#/...

<a id="lisensi"></a>
## 📄 Lisensi
Project ini dibuat untuk keperluan akademik (UAS).
