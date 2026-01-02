# 🌿 DelapanBit.my.id

Website personal dengan tema **Digital Forest** - modern minimalis dengan nuansa alam yang menenangkan.

> 🤖 Website ini dibuat dengan bantuan AI dan hanya untuk bersenang-senang!

## 📁 Struktur File

```
├── index.html    # Halaman utama
├── style.css     # Semua styling dengan CSS Variables
├── script.js     # JavaScript untuk interaktivitas
└── README.md     # Dokumentasi (file ini)
```

## 🎨 Customization Guide

### Mengubah Warna Tema

Buka `style.css`, cari bagian `:root` di awal file:

```css
:root {
  --color-primary: #2D5016;       /* Ubah warna utama */
  --color-accent: #8BC34A;        /* Ubah warna aksen */
  --bg-dark: #0F1A0A;             /* Ubah background */
  /* ... */
}
```

### Mengubah Konten

1. **Teks & Judul**: Edit langsung di `index.html`
2. **Emoji/Icon**: Ganti emoji di dalam tag HTML
3. **Link**: Ubah `href` pada tag `<a>`

### Menambah Section Baru

Copy struktur section yang ada, contoh:

```html
<section class="section" id="nama-section-baru">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2>Judul Section</h2>
      <p>Deskripsi section</p>
    </div>
    <!-- Konten di sini -->
  </div>
</section>
```

### Mengatur Animasi

Di `script.js`, ubah nilai di `CONFIG`:

```javascript
const CONFIG = {
  particleCount: 20,              // Jumlah partikel
  navbarScrollThreshold: 50,      // Kapan navbar berubah
};
```

## 🔗 Subdomain

- **converter.delapanbit.my.id** - Universal Converter

## 🚀 Deployment

Website ini menggunakan GitHub Pages. Push ke branch `main` untuk auto-deploy.

---

Made with ❤️ and AI
