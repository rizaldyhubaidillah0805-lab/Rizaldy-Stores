# NexaMart — Marketplace Demo

Prototype marketplace modern berbasis HTML, CSS, dan JavaScript. Cocok untuk presentasi client dan bisa langsung di-hosting menggunakan GitHub Pages.

## Fitur

- Landing page modern dan responsif
- Katalog produk
- Search produk
- Filter kategori
- Wishlist menggunakan localStorage
- Keranjang belanja menggunakan localStorage
- Drawer cart dan wishlist
- Section seller / dashboard demo
- Testimonial dan trust elements
- Mobile friendly

## Menjalankan di komputer

Cukup buka `index.html` di browser.

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `nexamart`.
2. Upload:
   - `index.html`
   - `styles.css`
   - `app.js`
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`.
6. Klik **Save**.
7. GitHub akan menampilkan URL website Anda.

## Catatan penting untuk versi production

GitHub Pages hanya hosting front-end statis. Untuk marketplace sungguhan, tambahkan backend/database agar tersedia:

- Login & registrasi
- Role buyer/seller/admin
- Database produk
- Upload gambar
- Stok
- Checkout
- Payment gateway
- Ongkir
- Status pesanan
- Chat buyer/seller
- Review & rating
- Dashboard seller/admin
- Keamanan dan validasi server-side

Rekomendasi backend yang mudah dikembangkan:
- Supabase
- Firebase
- Node.js + PostgreSQL

## Kustomisasi

Nama brand `NexaMart`, teks, produk, harga, dan kategori dapat diganti langsung dari:
- `index.html`
- array `products` di `app.js`
- warna utama di bagian `:root` pada `styles.css`
