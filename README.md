# Susi Air - Pilot Companion App

[![Nuxt 4](https://img.shields.io/badge/Nuxt%204-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com/)
[![Nuxt UI](https://img.shields.io/badge/Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-FRUIT?logo=pinia)](https://pinia.vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)

> **Aplikasi pendamping logbook dan jadwal untuk pilot Susi Air.**  
> Mobile-first web application yang membantu pilot memantau jam terbang, jadwal tugas, dan dokumen lisensi secara real-time.

---

## 📋 Daftar Isi

- [Deskripsi Proyek](#-deskripsi-proyek)
- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Setup & Instalasi](#-setup--instalasi)
- [Penggunaan](#-penggunaan)
- [Deployment](#-deployment)
- [Catatan Pengembangan](#-catatan-pengembangan)
- [Libraries yang Digunakan](#-libraries-yang-digunakan)
- [Yang Akan Ditingkatkan](#-yang-akan-ditingkatkan)
- [Lisensi](#-lisensi)

---

## 🛩️ Deskripsi Proyek

Proyek ini merupakan bagian dari proses rekrutmen untuk posisi **Frontend Developer** di **Susi Air**. Tujuan utamanya adalah membangun **sebagian kecil dari aplikasi web mobile-first** yang digunakan oleh pilot untuk:

- ✅ Mencatat dan memantau jam terbang (_logbook_)
- ✅ Melihat jadwal tugas (_schedule_)
- ✅ Memantau batasan jam terbang operasional (_hours to limit_)
- ✅ Memeriksa status dokumen lisensi
- ✅ Handling route autentication dan navigasi halaman

Aplikasi ini dirancang dengan pendekatan **mobile-first** dan mengikuti panduan desain merek Susi Air sebagaimana terlihat di [susiair.com](https://susiair.com) dan [@susiairofficial](https://instagram.com/susiairofficial).

---

## ✨ Fitur

### 1. Halaman Sign In 🔐

- Form login dengan username dan password
- Tanpa autentikasi nyata (mock login, langsung redirect ke dashboard)
- Link bantuan "Contact CRD"

### 2. Dashboard (Home) 📊

| Komponen               | Deskripsi                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Header**             | Sapaan pilot, nama, total jam terbang, avatar, dan notifikasi                       |
| **Upcoming Flights**   | Menampilkan satu jadwal penerbangan berikutnya (tanggal, waktu, rute)               |
| **Latest News**        | Horizontal scroll dengan 3 kartu berita/peringatan operasional                      |
| **Hours to Limit**     | 4 kartu ringkasan (Daily, Weekly, Monthly, Annual) dengan progress bar dan sisa jam |
| **Flight Hours Trend** | Grafik garis dengan toggle 1w, 1m, 3m, 6m, 1y. Menggunakan rolling sum logic        |
| **My Documents**       | Daftar dokumen dengan badge warna (Hijau = aman, Kuning = segera, Merah = expired)  |

### 3. Schedule (Kalender) 📅

- Kalender bulanan dengan navigasi prev/next
- Color coding berdasarkan tipe tugas:
  - `DTY` (On Duty) • `RLV` (Requested Leave) • `SCK` (Sick)
  - `TRV` (Travel Day) • `TRX` (Training) • `ADM` (Administration)
  - `FER` (Ferry) • `MED` (Medical) • `REC` (Recurrent) • `ULV` (Unpaid Leave)
- Legend di bawah kalender
- Tap tanggal → placeholder "Detail page coming soon"

### 4. Bottom Navigation 🧭

- Home · Schedule · Logbook · Documents · More

---

## 🧰 Tech Stack

| Teknologi      | Keterangan                                           |
| -------------- | ---------------------------------------------------- |
| **Nuxt 4**     | Framework Vue.js dengan SSR dan file-based routing   |
| **Nuxt UI**    | Komponen UI berbasis Tailwind CSS v4 (110+ komponen) |
| **Vue 3**      | Composition API + `<script setup>`                   |
| **Pinia**      | State management (auto-import)                       |
| **TypeScript** | Type safety (strict mode)                            |
| **CSS**        | Utility-first dengan Tailwind v4 + custom variables  |
| **ApexCharts** | Visualisasi grafik trend jam terbang                 |
| **Day.js**     | Manipulasi dan formatting tanggal                    |
| **Vercel**     | Deployment (hosting)                                 |

---

## 📚 Libraries yang Digunakan

| Library             | Alasan Penggunaan                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nuxt UI**         | Menyediakan komponen UI yang modern, konsisten, dan responsif sehingga mempercepat proses pengembangan tanpa harus membangun komponen dari awal.     |
| **Pinia**           | Digunakan sebagai state management utama. Seluruh business logic dan state aplikasi dipusatkan di store agar lebih terstruktur dan mudah dipelihara. |
| **ApexCharts**      | Digunakan untuk menampilkan visualisasi trend flight hours dan rolling sum secara interaktif.                                                        |
| **Day.js**          | Library ringan untuk manipulasi dan formatting tanggal pada schedule, documents, dan flight information.                                             |
| **Lucide Vue Next** | Menyediakan kumpulan icon yang ringan, modern, dan konsisten dengan desain aplikasi.                                                                 |

---

## 📝 Brief Notes

### Yang Akan Saya Tingkatkan Jika Memiliki Waktu Lebih

Apabila memiliki waktu pengembangan lebih banyak, beberapa peningkatan yang ingin saya lakukan adalah:

- Menambahkan autentikasi yang terintegrasi dengan backend menggunakan JWT atau OAuth.
- Mengintegrasikan seluruh data menggunakan REST API atau GraphQL sehingga tidak lagi menggunakan mock JSON.
- Membuat komponen yang lebih reusable dan mendokumentasikannya
- Menambahkan unit test dan component test menggunakan Vitest untuk meningkatkan kualitas kode.
- Mengoptimalkan performa aplikasi melalui lazy loading, code splitting, dan image optimization.
- Menambahkan loading skeleton, empty state, dan error state pada setiap halaman.

### Keputusan Arsitektur

Dalam implementasi aplikasi ini saya memilih:

- Menggunakan **Pinia Composition API** sebagai pusat state management agar seluruh business logic berada di store dan komponen tetap fokus pada tampilan (UI).
- Menggunakan **Nuxt UI** untuk menjaga konsistensi desain sekaligus mempercepat proses pengembangan.
- Menerapkan pendekatan **mobile-first** karena aplikasi ditujukan untuk digunakan oleh pilot yang lebih sering mengakses perangkat mobile.
- Memisahkan store berdasarkan domain (Authentication, Dashboard, Flight Hours, Documents, Schedule) agar kode lebih modular dan mudah dikembangkan.

## ⚙️ Setup & Instalasi

### Prasyarat

- Node.js v18+
- NPM atau Yarn

### Langkah Instalasi

```bash
# Clone repository
git clone https://github.com/username/susi-air-frontend.git
cd susi-air-frontend

# Instal dependensi
npm install

# Jalankan development server
npm run dev

# Buka di browser
# http://localhost:3000
```
