# PRD: UI Component Gallery (Edisi Pembelajaran Bahasa Indonesia)

> Staged at `~/Documents/work/prd/ui-component-gallery/PRD.md`
> Target repository: `~/Projects/ui-component-gallery`

## 1. Problem Statement & Background
`component.gallery` adalah referensi luar biasa untuk UI components dari design systems enterprise dunia. Namun, bagi developer dan UI/UX designer Indonesia yang sedang belajar:
1. **Bahasa & Terminologi**: Dokumentasi berbahasa Inggris dan penuh istilah abstrak teknis tanpa analogi lokal yang mudah dipahami.
2. **Ketiadaan AI Engineering Prompt**: Saat ini developer menggunakan AI (Claude, v0, Cursor, ChatGPT) untuk membuat antarmuka, tetapi sering bingung bagaimana menyusun *system prompt* atau spesifikasi komponen yang presisi agar AI menghasilkan komponen yang benar-benar accessible, semantic, dan production-ready.
3. **Ketiadaan Live Interactive Preview**: `component.gallery` hanya menyediakan screenshot statis dan link keluar; tidak ada *playground* lokal tempat pembelajar bisa langsung klik, inspect DOM, dan melihat bagaimana state interaksi (expanded, active, focus, disabled) bekerja.

## 2. Goals & Non-Goals
### Goals
- **G-1**: Membangun katalog referensi UI/UX komponen web berbahasa Indonesia dengan estetika editorial-arsitektural minimalis yang presisi seperti `component.gallery`.
- **G-2**: Menyediakan panduan lengkap per-komponen: Definisi & fungsi, nama alias di berbagai design system (Shopify Polaris, AntD, Carbon, dll.), do's & don'ts, struktur semantik & aksesibilitas (WAI-ARIA, keyboard navigation).
- **G-3**: Menyediakan **"AI Implementation Prompt"** siap salin (*copy-to-clipboard*) per-komponen yang telah dirancang untuk model AI terkini.
- **G-4**: Menyediakan **Interactive Sandbox / Live Demo** lokal untuk setiap komponen agar dapat diuji coba interaksinya secara langsung tanpa koneksi internet.
- **G-5**: Menyediakan pencarian instan (real-time filtering) berdasarkan nama komponen, alias, atau kategori.

### Non-Goals
- Bukan komponen library yang di-publish ke npm registry (ini adalah educational visual reference & interactive guide app).
- Tidak memuat backend database dinamis/server berbayar (arsitektur 100% static client-side dengan Astro).

## 3. Taxonomy & Component Coverage
Komponen dikelompokkan ke dalam 5 pilar utama antarmuka modern:
1. **Layout & Containers**: Card, Accordion, Modal / Dialog, Drawer / Sheet, Carousel, Aspect Ratio, Separator / Divider.
2. **Navigation**: Navbar / Header, Breadcrumbs, Tabs, Pagination, Stepper, Tree View, Sidebar / Menu.
3. **Forms & Inputs**: Button, Button Group, Text Input, Checkbox, Radio Button, Toggle Switch, Select, Combobox / Autocomplete, Datepicker, Slider, File Upload.
4. **Data Display**: Badge / Tag / Chip, Avatar, Table / Data Grid, Tooltip, Popover, Stat / KPI Card, Timeline, Rating, Progress Bar.
5. **Feedback & Overlays**: Alert / Banner, Toast / Snackbar, Skeleton Loader, Empty State, Spinner / Loading Indicator.

## 4. Requirements & Acceptance Criteria
- **REQ-1 (Directory & Catalog UI)**: Halaman beranda menampilkan grid komponen dengan wireframe SVG arsitektural, counter jumlah komponen, filter kategori, dan search bar instan.
  - *Acceptance Criterion*: Pengguna dapat memfilter komponen berdasarkan kategori (Layout, Navigation, Form, Data Display, Feedback) dan mengetik kata kunci dengan hasil filter muncul < 50ms tanpa reload halaman.
- **REQ-2 (Deep-dive Component Details)**: Setiap komponen memiliki halaman detail berstruktur standar:
  - Header: Nama utama, nama alias (*also known as*), kategori, dan ringkasan fungsi dalam Bahasa Indonesia lugas.
  - Visual Blueprint & Anatomy: Diagram SVG / wireframe dengan callout bagian-bagian komponen.
  - Panduan UX: Kapan wajib dipakai (*Use cases*) vs Kapan dilarang / kesalahan umum (*Anti-patterns*).
  - Aksesibilitas & Semantik: Tag HTML standar, atribut WAI-ARIA (`aria-expanded`, `role`, dll.), dan keyboard matrix (Tab, Enter, Space, Escape, Arrow keys).
  - Live Interactive Demo: Widget interaktif yang bisa diklik dan diuji langsung.
  - Code Snippets: Implementasi HTML/CSS murni dan Tailwind CSS / React component.
  - Production AI Prompt: Template prompt siap pakai untuk coding agent / AI chat.
  - *Acceptance Criterion*: Seluruh data komponen ditampilkan lengkap, tabs berpindah dengan mulus, dan tombol copy prompt/code bekerja dengan feedback visual.
- **REQ-3 (Visual Aesthetics & Theme)**: Mengadopsi desain brutalist-editorial bersih yang presisi menyerupai `component.gallery`:
  - 1px border grid layout dengan dark/light theme toggle.
  - Tipografi elegan (Serif untuk judul display, modern clean Sans untuk teks penjelasan teknis, dan Monospace untuk kode).
  - *Acceptance Criterion*: Toggle dark/light mode mengingat preferensi di localStorage dan tidak menyebabkan layout shift saat dimuat.
- **REQ-4 (Zero-Backend & Offline Capability)**: Aplikasi dapat dijalankan 100% lokal dengan `pnpm dev` atau di-build ke static HTML untuk deployment ke Cloudflare Pages/Vercel tanpa dependensi API eksternal.
  - *Acceptance Criterion*: `pnpm build` menghasilkan output statis murni tanpa error.

## 5. Technical Decisions
- **Framework**: **Astro v5** (Static Site Generator tercepat, component-driven, zero unnecessary JavaScript).
- **Styling**: **Tailwind CSS v4** dengan custom utility grid & border aesthetic.
- **Icons**: **Lucide Icons** (inline SVG untuk kecepatan dan konsistensi).
- **Data Architecture**: Structured TypeScript data models (`src/data/components.ts`) yang type-safe dan mudah ditambah kapan saja.
