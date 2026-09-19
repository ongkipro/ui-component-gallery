export interface ComponentAnatomyItem {
  part: string;
  nameIndo: string;
  description: string;
}

export interface ComponentUsageItem {
  title: string;
  description: string;
}

export interface ComponentAccessibility {
  semanticTag: string;
  ariaAttributes: string[];
  keyboardNavigation: { key: string; action: string }[];
  criticalRules: string[];
}

export interface DesignSystemRef {
  name: string;
  framework: string;
  url: string;
}

export interface UIComponent {
  id: string;
  name: string;
  nameIndo: string;
  category: 'layout' | 'navigation' | 'forms' | 'data-display' | 'feedback';
  categoryLabel: string;
  summary: string;
  alsoKnownAs: string[];
  definition: string;
  svgIcon: string;
  anatomy: ComponentAnatomyItem[];
  useCases: ComponentUsageItem[];
  antiPatterns: ComponentUsageItem[];
  accessibility: ComponentAccessibility;
  aiPrompt: string;
  codeSnippets: {
    html: string;
    reactTailwind: string;
  };
  designSystems: DesignSystemRef[];
  liveDemoType: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'Semua Komponen' },
  { id: 'layout', label: 'Layout & Containers' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'forms', label: 'Forms & Inputs' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback & Overlays' },
] as const;

export const COMPONENTS: UIComponent[] = [
  // 1. ACCORDION
  {
    id: 'accordion',
    name: 'Accordion',
    nameIndo: 'Akordion (Bagian Lipat Vertikal)',
    category: 'layout',
    categoryLabel: 'Layout & Containers',
    summary: 'Daftar tumpukan judul interaktif yang dapat diperluas (expand) atau dilipat (collapse) untuk menampilkan atau menyembunyikan rincian konten.',
    alsoKnownAs: [
      'Collapse (Ant Design, Bootstrap)',
      'Disclosure (Ariakit, Headless UI)',
      'Details (HTML5 Native, eBay MIND)',
      'Expander (Wanda / Wonderflow)',
      'Collapsible sections (Chakra UI)'
    ],
    definition: 'Accordion menerapkan prinsip UX "Progressive Disclosure" — yaitu teknik menyajikan informasi secara bertahap agar pengguna tidak kewalahan melihat terlalu banyak teks sekaligus (*cognitive overload*). Sangat ideal untuk konten yang sifatnya opsional, sekunder, atau berupa daftar pertanyaan bertahap.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="10" y="15" width="140" height="24" rx="4" fill="#E2E8F0" stroke="#0F172A" stroke-width="1.5"/><path d="M135 27L140 32L145 27" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/><rect x="20" y="24" width="60" height="6" rx="2" fill="#0F172A"/><rect x="10" y="43" width="140" height="62" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><path d="M135 55L140 50L145 55" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"/><rect x="20" y="52" width="70" height="6" rx="2" fill="#2563EB"/><rect x="20" y="68" width="120" height="4" rx="1" fill="#94A3B8"/><rect x="20" y="78" width="110" height="4" rx="1" fill="#94A3B8"/><rect x="20" y="88" width="80" height="4" rx="1" fill="#94A3B8"/></svg>`,
    anatomy: [
      { part: 'Header / Trigger Button', nameIndo: 'Tombol Judul Pemicu', description: 'Elemen tombol interaktif yang memicu pembukaan atau penutupan panel konten.' },
      { part: 'State Indicator (Chevron/Icon)', nameIndo: 'Ikon Penunjuk Status', description: 'Ikon panah yang berotasi (biasanya 180°) atau simbol plus/minus sebagai tanda visual keterbukaan panel.' },
      { part: 'Content Panel', nameIndo: 'Panel Konten Tubuh', description: 'Wadah teks atau elemen UI tersembunyi yang dirender ketika trigger dalam kondisi terbuka.' },
      { part: 'Container / Divider', nameIndo: 'Pembatas / Bingkai', description: 'Garis pembatas tipis 1px pemisah antar item accordion.' }
    ],
    useCases: [
      { title: 'Halaman FAQ (Tanya Jawab)', description: 'Sangat cocok untuk pertanyaan umum di mana pengguna hanya ingin membaca jawaban dari pertanyaan tertentu tanpa harus scroll halaman yang sangat panjang.' },
      { title: 'Filter Samping E-Commerce (Sidebar Filters)', description: 'Mengelompokkan filter berdasarkan kategori, harga, ukuran, dan warna tanpa memakan ruang vertikal layar yang berlebihan.' },
      { title: 'Formulir Berkas Multi-Bagian Opsional', description: 'Mengelompokkan input profil, alamat alternatif, atau preferensi tambahan dalam dashboard.' }
    ],
    antiPatterns: [
      { title: 'Menyembunyikan Informasi Kritis Transaksi', description: 'Jangan sembunyikan total biaya, peringatan keamanan penting, atau tombol submit utama di dalam accordion yang terlipat.' },
      { title: 'Konten di Dalamnya Sangat Pendek (1 Kalimat)', description: 'Jika isi penjelasan hanya satu kalimat pendek, lebih baik tampilkan langsung tanpa menyuruh pengguna mengklik tombol.' },
      { title: 'Accordion di Dalam Accordion (Nested Accordion)', description: 'Membuat tumpukan lipatan di dalam lipatan membingungkan orientasi visual pengguna (*depth confusion*).' }
    ],
    accessibility: {
      semanticTag: '<details> + <summary> (Native) ATAU <button> di dalam elemen Heading (H2/H3/H4) dengan <div role="region">.',
      ariaAttributes: [
        'aria-expanded="true|false": Memberitahu screen reader apakah konten sedang terbuka atau tertutup.',
        'aria-controls="content-id": Menghubungkan tombol pemicu dengan ID container kontennya.',
        'aria-hidden="true" pada ikon panah: Mencegah screen reader membaca SVG dekoratif.'
      ],
      keyboardNavigation: [
        { key: 'Tab', action: 'Berpindah fokus antar tombol header accordion.' },
        { key: 'Enter / Spasi', action: 'Membuka atau menutup panel accordion yang sedang difokuskan.' },
        { key: 'Panah Atas / Bawah', action: 'Berpindah langsung ke header accordion sebelum atau sesudahnya (standar WAI-ARIA advanced).' }
      ],
      criticalRules: [
        'Jangan pernah menggunakan elemen <div> biasa yang diberi onClick tanpa role="button" dan tabindex="0".',
        'Teks judul WAJIB dibungkus level heading yang tepat sesuai struktur dokumen (misal <h3>).'
      ]
    },
    aiPrompt: `Buatkan komponen Accordion UI/UX modern dan production-ready dengan spesifikasi:
1. Framework: React + Tailwind CSS (atau HTML Semantic native).
2. Semantik & Aksesibilitas (WAI-ARIA):
   - Gunakan <button> di dalam tag Heading yang memiliki atribut 'aria-expanded' dinamis dan 'aria-controls'.
   - Panel konten memiliki 'id' yang sesuai dan role="region".
   - Support navigasi keyboard penuh (Enter, Spasi, Tab).
   - Ikon chevron SVG berotasi halus dengan transisi CSS 'transform rotate-180 duration-200' saat expanded.
3. Fitur Interaksi:
   - Berikan opsi props 'allowMultiple' (apakah bisa membuka banyak panel sekaligus atau hanya satu item aktif pada satu waktu).
   - Sediakan styling border halus 1px dan hover background yang responsif terhadap dark/light mode.
4. Desain: Minimalis, clean typography, dan pastikan tidak ada layout shift saat panel terbuka.`,
    codeSnippets: {
      html: `<!-- Pendekatan 1: Native HTML5 (Zero JS) -->
<details class="group border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-2">
  <summary class="flex justify-between items-center font-medium cursor-pointer list-none text-slate-900 dark:text-slate-100">
    <span>Berapa lama estimasi pengiriman pesanan?</span>
    <span class="transition group-open:rotate-180">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </span>
  </summary>
  <div class="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
    Pesanan dikirimkan dalam 1-3 hari kerja tergantung lokasi pengiriman Anda. Anda akan menerima nomor resi otomatis via email.
  </div>
</details>`,
      reactTailwind: `import React, { useState } from 'react';

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden mb-3">
      <h3>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-full flex justify-between items-center px-4 py-3.5 text-left font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
        >
          <span>{title}</span>
          <svg
            className={\`w-4 h-4 text-slate-500 transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      {isOpen && (
        <div className="px-4 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}`
    },
    designSystems: [
      { name: 'Polaris (Shopify)', framework: 'Web Components', url: 'https://polaris.shopify.com' },
      { name: 'Carbon (IBM)', framework: 'React / Vanilla', url: 'https://carbondesignsystem.com/components/accordion/usage/' },
      { name: 'Ant Design', framework: 'React', url: 'https://ant.design/components/collapse' }
    ],
    liveDemoType: 'accordion'
  },

  // 2. MODAL / DIALOG
  {
    id: 'modal',
    name: 'Modal / Dialog',
    nameIndo: 'Jendela Dialog Pop-up (Modal)',
    category: 'layout',
    categoryLabel: 'Layout & Containers',
    summary: 'Jendela overlay yang muncul di atas halaman utama untuk menuntut perhatian penuh pengguna sebelum dapat melanjutkan interaksi.',
    alsoKnownAs: [
      'Dialog (WAI-ARIA, Radix UI, Material Design)',
      'Pop-up Window',
      'Lightbox',
      'Alert Dialog (untuk aksi destruktif)'
    ],
    definition: 'Modal bersifat "modal" — artinya ia memutus alur kerja biasa dan mengunci interaksi di luar jendelanya (backdrop overlay) sampai pengguna melakukan aksi (konfirmasi, isi form, atau membatalkan/menutup). Modal dirancang untuk interaksi dengan konsekuensi tinggi atau formulir terisolasi.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect width="160" height="120" fill="#94A3B8" fill-opacity="0.4"/><rect x="25" y="20" width="110" height="80" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><rect x="35" y="32" width="50" height="8" rx="2" fill="#0F172A"/><circle cx="123" cy="36" r="5" fill="#E2E8F0"/><rect x="35" y="50" width="90" height="4" rx="1" fill="#94A3B8"/><rect x="35" y="58" width="75" height="4" rx="1" fill="#94A3B8"/><rect x="65" y="76" width="30" height="14" rx="3" fill="#E2E8F0"/><rect x="100" y="76" width="25" height="14" rx="3" fill="#2563EB"/></svg>`,
    anatomy: [
      { part: 'Backdrop / Scrim', nameIndo: 'Latar Belakang Redup', description: 'Lapisan semi-transparan gelap di belakang modal yang mengaburkan halaman dasar.' },
      { part: 'Dialog Header & Title', nameIndo: 'Kepala & Judul Dialog', description: 'Judul spesifik dan ringkas yang menjelaskan maksud kemunculan modal.' },
      { part: 'Close Button (X)', nameIndo: 'Tombol Tutup Cepat', description: 'Tombol ikon silang di sudut kanan atas untuk membatalkan dialog secara cepat.' },
      { part: 'Body Content', nameIndo: 'Isi Konten / Form', description: 'Pesan konfirmasi, form input, atau rincian transaksi yang perlu diisi.' },
      { part: 'Footer Actions', nameIndo: 'Tombol Aksi Utama & Batal', description: 'Pasangan tombol tindakan jelas (misal: "Batal" vs "Simpan Perubahan" / "Hapus Akun").' }
    ],
    useCases: [
      { title: 'Konfirmasi Aksi Destruktif', description: 'Mencegah ketidaksengajaan fatal pengguna, misal "Apakah Anda yakin ingin menghapus proyek ini secara permanen?".' },
      { title: 'Tugas Singkat yang Terisolasi', description: 'Mengubah nama file, mengundang anggota tim via email, atau memasukkan kode OTP tanpa meninggalkan halaman utama.' }
    ],
    antiPatterns: [
      { title: 'Modal Muncul di Atas Modal (Stacked Modals)', description: 'Membuka modal kedua di atas modal pertama adalah anti-pattern fatal yang merusak fokus dan orientasi pengguna.' },
      { title: 'Modal yang Isinya Terlalu Panjang Berisi Artikel', description: 'Jika isi konten membutuhkan scrolling berkali-kali, gunakan halaman terpisah atau Drawer/Sheet, bukan Modal.' },
      { title: 'Tidak Mengunci Scroll Halaman Belakang (Body Scroll Lock)', description: 'Ketika modal terbuka, scroll mouse justru menggerakkan halaman belakang yang gelap.' }
    ],
    accessibility: {
      semanticTag: '<dialog> (Native HTML5) atau <div role="dialog" aria-modal="true">.',
      ariaAttributes: [
        'aria-modal="true": Menginstruksikan screen reader bahwa konten di luar dialog tidak aktif.',
        'aria-labelledby="dialog-title-id": Mengaitkan judul dialog sebagai label pembuka screen reader.',
        'aria-describedby="dialog-desc-id": Mengaitkan teks penjelasan di bawah judul.'
      ],
      keyboardNavigation: [
        { key: 'Escape', action: 'Menutup modal secara instan.' },
        { key: 'Tab & Shift+Tab', action: 'Focus Trap: Navigasi keyboard terperangkap hanya di dalam elemen interaktif modal.' },
        { key: 'Focus Return', action: 'Saat modal tertutup, fokus harus otomatis dikembalikan ke tombol pemicu semula.' }
      ],
      criticalRules: [
        'Wajib menerapkan Focus Trap! Jangan biarkan user menekan Tab lalu fokus melompat ke link di belakang backdrop.',
        'Selalu sediakan tombol tutup (Esc dan klik backdrop).'
      ]
    },
    aiPrompt: `Buatkan komponen Modal Dialog interaktif dan accessible dengan spesifikasi:
1. Menggunakan elemen native HTML5 <dialog> atau React Portal + Tailwind CSS.
2. Fitur UX & Aksesibilitas:
   - Focus Trap aktif: Tab tidak boleh keluar dari modal saat terbuka.
   - Menutup otomatis saat tombol Escape ditekan atau backdrop diklik.
   - Body scroll terkunci saat modal aktif ('overflow: hidden' pada <body>).
   - Fokus otomatis berpindah ke tombol aksi pertama atau input pertama saat dibuka, dan kembali ke tombol pembuka saat ditutup.
3. Struktur Anatomi:
   - Header dengan judul jelas dan tombol close 'X'.
   - Body dengan slot konten fleksibel.
   - Footer dengan tombol Batal (secondary/ghost) dan tombol Aksi Utama (primary/destructive).
4. Animasi: Fade-in backdrop halus dan scale-up kecil (95% ke 100%) untuk jendela modal.`,
    codeSnippets: {
      html: `<!-- HTML5 Native Dialog API (Sangat Direkomendasikan) -->
<dialog id="myModal" class="rounded-xl p-6 backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  <div class="flex justify-between items-start mb-4">
    <h2 class="text-lg font-bold">Konfirmasi Hapus Data</h2>
    <form method="dialog"><button class="text-slate-400 hover:text-slate-600">✕</button></form>
  </div>
  <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">Tindakan ini permanen dan tidak dapat dibatalkan.</p>
  <div class="flex justify-end gap-3">
    <form method="dialog"><button class="px-4 py-2 text-sm rounded-lg border border-slate-300">Batal</button></form>
    <button class="px-4 py-2 text-sm rounded-lg bg-red-600 text-white font-medium hover:bg-red-700">Ya, Hapus</button>
  </div>
</dialog>
<script>
  // Cara panggil: document.getElementById('myModal').showModal();
</script>`,
      reactTailwind: `import React, { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
            ✕
          </button>
        </div>
        <div className="mb-6 text-sm text-slate-600 dark:text-slate-300">{children}</div>
      </div>
    </div>
  );
}`
    },
    designSystems: [
      { name: 'Base Web (Uber)', framework: 'React', url: 'https://baseweb.design/components/modal/' },
      { name: 'Radix UI / shadcn', framework: 'React', url: 'https://ui.shadcn.com/docs/components/dialog' },
      { name: 'Carbon (IBM)', framework: 'React / Web Components', url: 'https://carbondesignsystem.com/components/modal/usage/' }
    ],
    liveDemoType: 'modal'
  },

  // 3. TABS
  {
    id: 'tabs',
    name: 'Tabs',
    nameIndo: 'Navigasi Tab Panel',
    category: 'navigation',
    categoryLabel: 'Navigation',
    summary: 'Komponen navigasi horizontal berlapis yang memungkinkan pengguna berpindah antar panel tampilan dalam satu ruang yang sama tanpa reload halaman.',
    alsoKnownAs: [
      'Tabbed Interface',
      'Tab Bar (Mobile iOS)',
      'Segmented Control (versi kecil/bersebelahan)',
      'View Switcher'
    ],
    definition: 'Tabs membagi satu topik besar menjadi beberapa sub-tampilan yang saling eksklusif. Komponen ini menghemat luas layar secara drastis dengan hanya menampilkan satu panel aktif pada satu saat, menciptakan transisi visual yang instan dan mulus.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="15" y="25" width="40" height="20" rx="3" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><rect x="23" y="32" width="24" height="6" rx="1.5" fill="#2563EB"/><rect x="60" y="25" width="40" height="20" rx="3" fill="#E2E8F0"/><rect x="68" y="32" width="24" height="6" rx="1.5" fill="#64748B"/><rect x="105" y="25" width="40" height="20" rx="3" fill="#E2E8F0"/><line x1="10" y1="45" x2="150" y2="45" stroke="#0F172A" stroke-width="1.5"/><rect x="15" y="55" width="130" height="45" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/><rect x="25" y="65" width="110" height="5" rx="1" fill="#94A3B8"/><rect x="25" y="75" width="90" height="5" rx="1" fill="#94A3B8"/><rect x="25" y="85" width="60" height="5" rx="1" fill="#94A3B8"/></svg>`,
    anatomy: [
      { part: 'Tab List (Container)', nameIndo: 'Daftar Wadah Tab', description: 'Wadah pembungkus barisan tombol tab dengan role="tablist".' },
      { part: 'Tab Item (Trigger)', nameIndo: 'Tombol Pemicu Tab', description: 'Elemen tombol dengan role="tab" yang merepresentasikan label setiap kategori konten.' },
      { part: 'Active Indicator', nameIndo: 'Garis Indikator Aktif', description: 'Garis aksen bawah atau background kontras penanda tab yang sedang terbuka.' },
      { part: 'Tab Panel', nameIndo: 'Panel Konten Terkait', description: 'Kotak konten dengan role="tabpanel" yang terhubung dengan tab aktif.' }
    ],
    useCases: [
      { title: 'Pengaturan Profil / Akun', description: 'Memisahkan "Profil Umum", "Keamanan & Password", "Penagihan / Billing", dan "Notifikasi".' },
      { title: 'Halaman Detail Produk E-Commerce', description: 'Berpindah antara "Deskripsi", "Spesifikasi Teknis", "Ulasan Pembeli", dan "Kebijakan Garansi".' },
      { title: 'Dokumentasi Kode Multi-Bahasa', description: 'Menampilkan contoh kode yang sama dalam JavaScript, Python, cURL, dan Go.' }
    ],
    antiPatterns: [
      { title: 'Menggunakan Tab untuk Alur Langkah Berurutan (Wizard)', description: 'Jika pengguna HARUS mengisi langkah 1 dulu baru langkah 2, gunakan Stepper, BUKAN Tabs.' },
      { title: 'Tab Memiliki Terlalu Banyak Baris (Multi-row Tabs)', description: 'Tab bertumpuk 2 baris sangat membingungkan ketika tab berpindah posisi saat diklik.' },
      { title: 'Membandingkan Dua Data Sekaligus', description: 'Jika pengguna perlu membandingkan spesifikasi produk A dan B berdampingan, jangan sembunyikan di tab terpisah.' }
    ],
    accessibility: {
      semanticTag: '<div role="tablist"> berisi <button role="tab"> yang mengontrol <div role="tabpanel">.',
      ariaAttributes: [
        'role="tablist", role="tab", dan role="tabpanel".',
        'aria-selected="true|false": Menunjukkan status aktif ke screen reader.',
        'aria-controls="panel-id" pada tab, dan aria-labelledby="tab-id" pada panel.'
      ],
      keyboardNavigation: [
        { key: 'Panah Kiri / Kanan', action: 'Berpindah fokus dan memilih tab berikutnya/sebelumnya (standar WAI-ARIA).' },
        { key: 'Home / End', action: 'Melompat langsung ke tab pertama atau tab terakhir.' },
        { key: 'Tab', action: 'Keluar dari tablist dan langsung masuk ke elemen interaktif pertama di dalam tabpanel aktif.' }
      ],
      criticalRules: [
        'Gunakan role="tab" pada tombol dan hindari penggunaan tautan (anchor <a href>) untuk tab murni yang tidak mengubah URL halaman.'
      ]
    },
    aiPrompt: `Buatkan komponen Tabs yang sepenuhnya memenuhi standar WAI-ARIA menggunakan React dan Tailwind CSS:
1. Fitur Navigasi Keyboard WAI-ARIA:
   - Panah Kiri dan Kanan untuk berpindah tab secara aktif.
   - Home dan End untuk lompat ke tab pertama/terakhir.
   - Tab key langsung masuk ke dalam tabpanel.
2. Atribut Aksesibilitas:
   - role="tablist", role="tab", role="tabpanel".
   - aria-selected="true/false", aria-controls, aria-labelledby.
   - tabindex="0" hanya untuk tab aktif, dan tabindex="-1" untuk tab tidak aktif.
3. Desain & Animasi:
   - Indikator aktif berupa garis bawah dinamis dengan transisi halus.
   - Desain responsif (bisa scroll horizontal jika label melebihi lebar layar mobile).`,
    codeSnippets: {
      html: `<div class="border-b border-slate-200 dark:border-slate-800">
  <nav class="flex gap-4" role="tablist" aria-label="Tab Pengaturan">
    <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1" class="py-3 px-1 border-b-2 border-blue-600 font-semibold text-blue-600 text-sm">
      Umum
    </button>
    <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" class="py-3 px-1 border-b-2 border-transparent text-slate-500 hover:text-slate-700 text-sm">
      Keamanan
    </button>
  </nav>
</div>
<div id="panel-1" role="tabpanel" aria-labelledby="tab-1" class="py-4 text-sm text-slate-600">
  Konten pengaturan profil umum Anda di sini...
</div>`,
      reactTailwind: `import React, { useState } from 'react';

export function AccessibleTabs({ tabs }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      setActiveIdx((index + 1) % tabs.length);
    } else if (e.key === 'ArrowLeft') {
      setActiveIdx((index - 1 + tabs.length) % tabs.length);
    }
  };

  return (
    <div>
      <div className="border-b border-slate-200 dark:border-slate-800" role="tablist">
        <div className="flex space-x-6">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              role="tab"
              id={\`tab-\${tab.id}\`}
              aria-selected={activeIdx === idx}
              aria-controls={\`panel-\${tab.id}\`}
              tabIndex={activeIdx === idx ? 0 : -1}
              onClick={() => setActiveIdx(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={\`py-3 px-1 border-b-2 text-sm font-medium transition-all duration-150 outline-none \${
                activeIdx === idx
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }\`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={\`panel-\${tabs[activeIdx].id}\`}
        aria-labelledby={\`tab-\${tabs[activeIdx].id}\`}
        className="py-4 text-sm text-slate-700 dark:text-slate-300"
      >
        {tabs[activeIdx].content}
      </div>
    </div>
  );
}`
    },
    designSystems: [
      { name: 'Polaris (Shopify)', framework: 'Web Components', url: 'https://polaris.shopify.com/components/navigation/tabs' },
      { name: 'Carbon (IBM)', framework: 'React', url: 'https://carbondesignsystem.com/components/tabs/usage/' },
      { name: 'Atlassian Design System', framework: 'React', url: 'https://atlassian.design/components/tabs' }
    ],
    liveDemoType: 'tabs'
  },

  // 4. BADGE / TAG
  {
    id: 'badge',
    name: 'Badge / Tag',
    nameIndo: 'Lencana Status / Tag Kategori',
    category: 'data-display',
    categoryLabel: 'Data Display',
    summary: 'Label kecil padat yang disematkan di dekat elemen utama untuk mengomunikasikan status, kategori, jumlah, atau metadata penting.',
    alsoKnownAs: [
      'Tag (Ant Design, Carbon)',
      'Chip (Material Design)',
      'Label',
      'Pill',
      'Status Indicator'
    ],
    definition: 'Badge berfungsi sebagai penanda visual berukuran mikro. Memberikan informasi sekunder secara cepat melalui kontras warna semantik (hijau = sukses/aktif, kuning = pending, merah = error/dibatalkan, abu-abu = draft).',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="20" y="30" width="120" height="60" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><circle cx="45" cy="60" r="14" fill="#E2E8F0"/><rect x="68" y="52" width="40" height="6" rx="2" fill="#0F172A"/><rect x="68" y="64" width="28" height="4" rx="1" fill="#94A3B8"/><rect x="100" y="44" width="32" height="14" rx="7" fill="#DCFCE7" stroke="#22C55E" stroke-width="1"/><rect x="106" y="49" width="20" height="4" rx="1" fill="#16A34A"/></svg>`,
    anatomy: [
      { part: 'Pill / Rounded Container', nameIndo: 'Wadah Kapsul Bulat', description: 'Kotak berujung melengkung (*rounded-full*) dengan padding horizontal rapat.' },
      { part: 'Status Dot / Icon', nameIndo: 'Titik Status / Ikon Kecil', description: 'Ikon atau dot warna kecil di sisi kiri teks untuk menegaskan status tanpa bergantung pada warna saja.' },
      { part: 'Label Text', nameIndo: 'Teks Label Singkat', description: 'Teks 1-2 kata dengan huruf kapital atau title case (misal: "Aktif", "Baru", "Selesai").' },
      { part: 'Dismiss Icon (Opsional pada Tag)', nameIndo: 'Ikon Hapus (Tag interaktif)', description: 'Tanda silang kecil untuk menghapus tag filter (biasanya pada tag input).' }
    ],
    useCases: [
      { title: 'Status Pesanan E-Commerce', description: 'Menampilkan status "Menunggu Pembayaran", "Diproses", "Terkirim", atau "Dibatalkan" di tabel order.' },
      { title: 'Kategori / Tag Artikel Blog', description: 'Mengelompokkan konten (misal: #React, #SEO, #Shopify).' },
      { title: 'Badge Angka Notifikasi', description: 'Menempel di atas ikon lonceng untuk menunjukkan jumlah notifikasi yang belum dibaca.' }
    ],
    antiPatterns: [
      { title: 'Teks Terlalu Panjang Berupa Kalimat', description: 'Badge dirancang untuk 1-2 kata. Kalimat panjang di dalam badge merusak tata letak visual.' },
      { title: 'Hanya Mengandalkan Warna untuk Informasi Kritis', description: 'Orang yang mengalami buta warna tidak bisa membedakan merah dan hijau jika tidak ada teks atau ikon penjelas.' }
    ],
    accessibility: {
      semanticTag: '<span> dengan styling CSS atau <button> jika tag dapat diklik/dihapus.',
      ariaAttributes: [
        'Jika badge merupakan hitungan angka notifikasi: aria-label="3 pesan belum dibaca".',
        'Jika tag interaktif bisa dihapus: tombol silang diberi aria-label="Hapus tag React".'
      ],
      keyboardNavigation: [
        { key: 'Tab', action: 'Fokus ke tag HANYA jika tag bersifat interaktif (dapat diklik atau dihapus).' },
        { key: 'Backspace / Delete', action: 'Menghapus tag aktif pada komponen Tag Input.' }
      ],
      criticalRules: [
        'Pastikan kontras warna teks dan background badge memenuhi standar WCAG AA (minimal rasio 4.5:1).'
      ]
    },
    aiPrompt: `Buatkan komponen Badge / Status Tag yang fleksibel dan accessible dengan Tailwind CSS:
1. Varian Warna Semantik:
   - Success: hijau lembut (bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300).
   - Warning: kuning/oranye (amber).
   - Error / Destructive: merah (rose).
   - Info / Neutral: slate atau blue.
2. Varian Tampilan:
   - Dot indicator di sebelah kiri.
   - Opsi tombol 'x' dismissible untuk tag filter yang bisa dihapus.
3. Tipografi: Teks kecil (text-xs) font-medium dengan tracking yang seimbang.`,
    codeSnippets: {
      html: `<!-- Badge Status Aktif -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
  Aktif
</span>

<!-- Badge Peringatan -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
  Tertunda
</span>`,
      reactTailwind: `export function Badge({ variant = 'neutral', dot = false, onDismiss, children }) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  };

  return (
    <span className={\`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border \${styles[variant]}\`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Hapus tag" className="hover:opacity-75 focus:outline-none">
          ✕
        </button>
      )}
    </span>
  );
}`
    },
    designSystems: [
      { name: 'Polaris (Shopify)', framework: 'Web Components', url: 'https://polaris.shopify.com/components/feedback-indicators/badge' },
      { name: 'Ant Design', framework: 'React', url: 'https://ant.design/components/badge' },
      { name: 'GitHub Primer', framework: 'React / Rails', url: 'https://primer.style/components/badge' }
    ],
    liveDemoType: 'badge'
  },

  // 5. BUTTON & BUTTON GROUP
  {
    id: 'button',
    name: 'Button',
    nameIndo: 'Tombol Aksi Utama & Sekunder',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Elemen interaktif fundamental yang memicu tindakan komputasi, pengiriman formulir, atau perubahan status antarmuka.',
    alsoKnownAs: [
      'Action Button',
      'CTA (Call To Action)',
      'Icon Button',
      'Split Button (dengan dropdown samping)'
    ],
    definition: 'Button adalah jembatan utama antara niat pengguna dan eksekusi sistem. Hirarki visual tombol (Primary, Secondary, Outline, Ghost, Destructive) memandu mata pengguna ke tindakan paling penting dalam sebuah layar.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="15" y="25" width="60" height="28" rx="5" fill="#2563EB"/><rect x="30" y="36" width="30" height="6" rx="2" fill="#FFFFFF"/><rect x="85" y="25" width="60" height="28" rx="5" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><rect x="100" y="36" width="30" height="6" rx="2" fill="#0F172A"/><rect x="15" y="65" width="60" height="28" rx="5" fill="#EF4444"/><rect x="30" y="76" width="30" height="6" rx="2" fill="#FFFFFF"/><rect x="85" y="65" width="60" height="28" rx="5" fill="#F1F5F9"/><rect x="100" y="76" width="30" height="6" rx="2" fill="#64748B"/></svg>`,
    anatomy: [
      { part: 'Button Label', nameIndo: 'Teks Label Aksi', description: 'Kata kerja aktif yang spesifik, misal: "Simpan Draf", "Beli Sekarang", bukan sekadar "Klik di Sini".' },
      { part: 'Leading / Trailing Icon', nameIndo: 'Ikon Awal / Akhir', description: 'Ikon pendukung seperti keranjang belanja atau panah kanan untuk mempertegas makna aksi.' },
      { part: 'Loading Spinner Indicator', nameIndo: 'Indikator Memproses', description: 'Animasi putar yang menggantikan ikon saat permintaan API sedang berjalan.' },
      { part: 'Focus Ring', nameIndo: 'Cincin Fokus Aksesibilitas', description: 'Garis luar tebal yang menyala saat tombol diakses via keyboard (Tab).' }
    ],
    useCases: [
      { title: 'Submit Formulir Data', description: 'Tombol "Kirim Pesanan", "Daftar Akun", atau "Perbarui Profil".' },
      { title: 'Aksi Cepat di Tabel / Kartu', description: 'Tombol "Unduh Faktur", "Edit", atau "Bagikan Tautan".' }
    ],
    antiPatterns: [
      { title: 'Menggunakan <div> atau <a> padahal memicu aksi JavaScript', description: 'Jika memicu aksi fungsi JS, WAJIB gunakan <button>, BUKAN <div onClick> atau <a href="#">.' },
      { title: 'Lebih dari Satu Tombol Primary dalam Satu Form', description: 'Dua tombol dengan warna mencolok berdampingan membingungkan prioritas keputusan pengguna.' }
    ],
    accessibility: {
      semanticTag: '<button type="button|submit|reset">.',
      ariaAttributes: [
        'aria-disabled="true" (lebih ramah screen reader daripada atribut disabled murni yang memutus fokus).',
        'aria-label jika tombol hanya berupa ikon tanpa teks terlihat (misal tombol tong sampah: aria-label="Hapus item ini").'
      ],
      keyboardNavigation: [
        { key: 'Enter & Spasi', action: 'Memicu eksekusi klik tombol secara native.' },
        { key: 'Tab', action: 'Berpindah fokus ke tombol berikutnya.' }
      ],
      criticalRules: [
        'Tombol wajib memiliki kontras warna teks dan latar belakang minimal 4.5:1.',
        'Selalu tentukan type="button" secara eksplisit jika tombol berada di dalam tag <form> agar tidak men-submit form tanpa sengaja.'
      ]
    },
    aiPrompt: `Buatkan set komponen Button lengkap berbasis Tailwind CSS & React yang mencakup:
1. Varian Visual:
   - Primary (solid background kontras tinggi).
   - Secondary (soft background).
   - Outline (border halus 1px).
   - Ghost (tanpa border, hover efek lembut).
   - Destructive (warna merah untuk aksi bahaya).
2. States Lengkap:
   - Default, Hover, Active/Pressed, Focus-Visible ring, dan Disabled.
   - Loading State: tampilkan spinner SVG berputar dan nonaktifkan klik ganda.
3. Aksesibilitas: Wajib menyertakan focus-visible:ring-2 focus-visible:ring-offset-2.`,
    codeSnippets: {
      html: `<!-- Tombol Primary -->
<button type="button" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-lg shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition">
  Simpan Perubahan
</button>

<!-- Tombol Outline -->
<button type="button" class="px-4 py-2 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-sm font-medium rounded-lg transition">
  Batal
</button>`,
      reactTailwind: `export function Button({ variant = 'primary', isLoading, children, ...props }) {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus-visible:ring-blue-500",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
    danger: "bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500"
  };

  return (
    <button className={\`\${base} \${variants[variant]}\`} disabled={isLoading || props.disabled} {...props}>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}`
    },
    designSystems: [
      { name: 'Polaris (Shopify)', framework: 'Web Components', url: 'https://polaris.shopify.com/components/actions/button' },
      { name: 'Carbon (IBM)', framework: 'React', url: 'https://carbondesignsystem.com/components/button/usage/' }
    ],
    liveDemoType: 'button'
  },

  // 6. DRAWER / SHEET
  {
    id: 'drawer',
    name: 'Drawer / Sheet',
    nameIndo: 'Panel Geser Samping (Drawer)',
    category: 'layout',
    categoryLabel: 'Layout & Containers',
    summary: 'Panel overlay yang meluncur keluar dari tepi layar (kanan, kiri, atau bawah) untuk menampilkan konten pendukung tanpa kehilangan konteks halaman utama.',
    alsoKnownAs: [
      'Sheet (shadcn/ui, iOS)',
      'Offcanvas (Bootstrap)',
      'Flyout',
      'Slide-over Panel',
      'Side Sheet / Bottom Sheet'
    ],
    definition: 'Drawer adalah alternatif modern dari modal untuk konten yang lebih kaya atau berupa formulir bertingkat (misal: Keranjang Belanja / Cart Drawer, Filter Lanjutan, atau Detail Transaksi Cepat). Pada perangkat mobile, drawer yang meluncur dari bawah dikenal sebagai Bottom Sheet.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect width="160" height="120" fill="#94A3B8" fill-opacity="0.3"/><rect x="80" y="0" width="80" height="120" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><rect x="92" y="15" width="40" height="6" rx="2" fill="#0F172A"/><circle cx="145" cy="18" r="4" fill="#E2E8F0"/><line x1="80" y1="32" x2="160" y2="32" stroke="#E2E8F0"/><rect x="92" y="45" width="55" height="4" rx="1" fill="#94A3B8"/><rect x="92" y="55" width="48" height="4" rx="1" fill="#94A3B8"/><rect x="92" y="90" width="56" height="14" rx="3" fill="#2563EB"/></svg>`,
    anatomy: [
      { part: 'Slide-in Container', nameIndo: 'Wadah Geser', description: 'Kotak vertikal setinggi layar (100vh) yang meluncur dengan transisi transform translate-x.' },
      { part: 'Drawer Header', nameIndo: 'Kepala Drawer', description: 'Judul drawer dan tombol silang (X) untuk menutup.' },
      { part: 'Scrollable Body', nameIndo: 'Badan Konten Dapat Di-scroll', description: 'Wadah konten yang memiliki overflow-y-auto mandiri.' },
      { part: 'Fixed Footer Actions', nameIndo: 'Tombol Aksi Bawah Terpaku', description: 'Tombol checkout, simpan, atau konfirmasi yang selalu terlihat di dasar drawer.' }
    ],
    useCases: [
      { title: 'Shopping Cart Drawer (Mini Cart)', description: 'Standar emas e-commerce: saat klik "Tambah ke Keranjang", keranjang muncul dari kanan tanpa membawa user keluar dari halaman produk.' },
      { title: 'Filter Kompleks di Tampilan Mobile', description: 'Menampilkan puluhan opsi filter dalam bottom sheet yang nyaman dijangkau jempol.' }
    ],
    antiPatterns: [
      { title: 'Membuka Drawer di Layar Desktop Sangat Lebar Tanpa Alasan', description: 'Jika konten sangat ringkas (hanya konfirmasi 2 baris), gunakan modal biasa daripada membuka panel sebesar layar.' }
    ],
    accessibility: {
      semanticTag: '<div role="dialog" aria-modal="true"> dengan aria-labelledby.',
      ariaAttributes: ['aria-modal="true"', 'aria-labelledby="drawer-title"'],
      keyboardNavigation: [
        { key: 'Escape', action: 'Menutup drawer dan mengembalikan fokus ke tombol pemanggil.' },
        { key: 'Tab', action: 'Focus trap di dalam isi drawer.' }
      ],
      criticalRules: ['Wajib mengunci scroll background body saat drawer aktif.']
    },
    aiPrompt: `Buatkan komponen Slide-over Drawer / Sheet menggunakan React dan Tailwind CSS:
1. Posisi meluncur dari sisi kanan (right-0) setinggi penuh layar (h-screen).
2. Animasi: Masuk halus dengan CSS transition transform (translate-x-full ke translate-x-0).
3. Backdrop gelap semi-transparan yang menutup drawer saat diklik.
4. Support keyboard Escape untuk menutup.
5. Header sticky, body scrollable, dan sticky footer untuk tombol aksi.`,
    codeSnippets: {
      html: `<!-- Pola Dasar Drawer dengan Tailwind -->
<div class="fixed inset-0 z-50 flex justify-end">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"></div>
  <!-- Panel -->
  <div class="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col z-10">
    <div class="flex justify-between items-center pb-4 border-b border-slate-200">
      <h3 class="font-bold text-lg">Keranjang Belanja</h3>
      <button class="text-slate-400 hover:text-slate-600">✕</button>
    </div>
    <div class="flex-grow overflow-y-auto py-4">Konten item keranjang...</div>
    <div class="pt-4 border-t border-slate-200"><button class="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium">Lanjut Checkout</button></div>
  </div>
</div>`,
      reactTailwind: `// Lihat implementasi interaktif pada Live Playground di tab bawah.`
    },
    designSystems: [
      { name: 'shadcn/ui (Sheet)', framework: 'React', url: 'https://ui.shadcn.com/docs/components/sheet' },
      { name: 'Base Web (Uber)', framework: 'React', url: 'https://baseweb.design/components/drawer/' }
    ],
    liveDemoType: 'drawer'
  },

  // 7. ALERT / BANNER
  {
    id: 'alert',
    name: 'Alert / Banner',
    nameIndo: 'Peringatan Sistem / Banner Pemberitahuan',
    category: 'feedback',
    categoryLabel: 'Feedback & Overlays',
    summary: 'Kotak pesan statis beraksen warna yang diletakkan di tempat strategis untuk menginformasikan status penting, peringatan, atau keberhasilan aksi.',
    alsoKnownAs: [
      'Banner (Shopify Polaris)',
      'Callout',
      'Notification Bar',
      'Inline Alert',
      'Message'
    ],
    definition: 'Alert berbeda dari Toast/Snackbar. Alert disematkan langsung di dalam aliran tata letak halaman (*inline*) dan tidak menghilang sendiri secara otomatis, sehingga cocok untuk informasi penting yang membutuhkan perhatian sebelum melangkah ke proses berikutnya.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="15" y="35" width="130" height="50" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/><circle cx="35" cy="55" r="8" fill="#3B82F6"/><path d="M35 51V56M35 59H35.01" stroke="white" stroke-width="1.5" stroke-linecap="round"/><rect x="52" y="48" width="60" height="6" rx="1.5" fill="#1E3A8A"/><rect x="52" y="60" width="80" height="4" rx="1" fill="#60A5FA"/><circle cx="133" cy="47" r="3" fill="#93C5FD"/></svg>`,
    anatomy: [
      { part: 'Severity Icon', nameIndo: 'Ikon Derajat Kepentingan', description: 'Ikon tanda seru (warning), centang (sukses), atau silang (error) penjelas makna.' },
      { part: 'Alert Title & Description', nameIndo: 'Judul & Isi Pesan', description: 'Penjelasan yang ringkas, solutif, dan tidak menimbulkan kepanikan.' },
      { part: 'Action Link / Button', nameIndo: 'Tautan Aksi Perbaikan', description: 'Tautan langsung untuk memperbaiki masalah, misal "Perbarui metode pembayaran".' }
    ],
    useCases: [
      { title: 'Pemberitahuan Sistem / Maintenance', description: '"Server akan mengalami pemeliharaan rutin pada pukul 23:00 WIB".' },
      { title: 'Form Validation Summary', description: 'Menampilkan rangkuman error di bagian atas formulir panjang.' }
    ],
    antiPatterns: [
      { title: 'Hanya Memberi Tahu Masalah Tanpa Solusi', description: 'Jangan tulis "Terjadi Kesalahan!". Tulis: "Email tidak valid. Pastikan format menggunakan @domain.com".' }
    ],
    accessibility: {
      semanticTag: '<div role="alert"> (untuk error/peringatan mendesak) atau <div role="status"> (untuk info biasa).',
      ariaAttributes: ['role="alert" memicu screen reader untuk membacakan pesan seketika tanpa menunggu navigasi.'],
      keyboardNavigation: [],
      criticalRules: ['Jangan gunakan role="alert" sembarangan untuk pesan sepele karena akan memotong pembacaan screen reader.']
    },
    aiPrompt: `Buatkan komponen Alert Banner responsif dengan varian Info, Success, Warning, dan Error menggunakan Tailwind CSS dan ikon SVG. Sertakan tombol dismiss 'X' opsional.`,
    codeSnippets: {
      html: `<div role="alert" class="flex gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200">
  <svg class="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0114 0z"/></svg>
  <div>
    <h4 class="font-semibold text-sm">Pembaruan Sistem Berhasil</h4>
    <p class="text-xs text-blue-700 dark:text-blue-300 mt-0.5">Versi v2.4 telah diterapkan. Muat ulang halaman jika Anda menemukan kendala.</p>
  </div>
</div>`,
      reactTailwind: `// Lihat implementasi interaktif pada Live Playground.`
    },
    designSystems: [
      { name: 'Polaris (Shopify Banner)', framework: 'Web Components', url: 'https://polaris.shopify.com/components/feedback-indicators/banner' },
      { name: 'Carbon (IBM Inline Notification)', framework: 'React', url: 'https://carbondesignsystem.com/components/notification/usage/' }
    ],
    liveDemoType: 'alert'
  },

  // 8. COMBOBOX / AUTOCOMPLETE
  {
    id: 'combobox',
    name: 'Combobox / Autocomplete',
    nameIndo: 'Kolom Pilih Berpencarian Cepat',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Kombinasi input teks dan dropdown menu yang memungkinkan pengguna mengetik untuk memfilter daftar opsi yang sangat banyak.',
    alsoKnownAs: [
      'Autocomplete (Google Material)',
      'Autosuggest',
      'Searchable Select',
      'Typeahead'
    ],
    definition: 'Ketika opsi pilihan berjumlah lebih dari 15 item (seperti daftar negara, kota/provinsi, atau nama produk), dropdown select standar menjadi mimpi buruk UX. Combobox menyelesaikan masalah ini dengan menyaring opsi secara instan saat pengguna mengetik.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="15" y="20" width="130" height="28" rx="5" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.5"/><rect x="25" y="31" width="40" height="6" rx="2" fill="#0F172A"/><path d="M130 32L135 37L140 32" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/><rect x="15" y="52" width="130" height="52" rx="5" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))"/><rect x="20" y="58" width="120" height="12" rx="3" fill="#EFF6FF"/><rect x="25" y="62" width="50" height="4" rx="1" fill="#2563EB"/><rect x="25" y="78" width="60" height="4" rx="1" fill="#64748B"/><rect x="25" y="92" width="45" height="4" rx="1" fill="#64748B"/></svg>`,
    anatomy: [
      { part: 'Text Input Field', nameIndo: 'Kolom Ketik Filter', description: 'Input teks di mana pengguna mengetikkan kata kunci pencarian.' },
      { part: 'Options Listbox', nameIndo: 'Daftar Hasil Opsi', description: 'Daftar mengambang dengan role="listbox" yang berisi item opsi terfilter.' },
      { part: 'Active Highlighted Item', nameIndo: 'Item Sedang Disorot', description: 'Item opsi yang sedang aktif ditunjuk oleh tombol panah keyboard.' }
    ],
    useCases: [
      { title: 'Pemilihan Lokasi & Provinsi / Kota', description: 'Memilih dari ratusan kota/kecamatan pengiriman barang di Indonesia.' },
      { title: 'Pencarian Pelanggan / Produk Cepat', description: 'Memilih produk dalam form kasir (POS) atau admin dashboard.' }
    ],
    antiPatterns: [
      { title: 'Memakai Combobox untuk Pilihan Sedikit (< 5 opsi)', description: 'Jika opsinya hanya "Pria/Wanita" atau "Ya/Tidak", gunakan Radio Button atau Select biasa.' }
    ],
    accessibility: {
      semanticTag: '<input role="combobox" aria-autocomplete="list">.',
      ariaAttributes: ['aria-expanded="true/false"', 'aria-controls="listbox-id"', 'aria-activedescendant="option-id"'],
      keyboardNavigation: [
        { key: 'Panah Bawah / Atas', action: 'Menggeser sorotan pilihan di dalam daftar opsi.' },
        { key: 'Enter', action: 'Memilih item yang sedang disorot.' },
        { key: 'Escape', action: 'Menutup daftar opsi.' }
      ],
      criticalRules: ['Wajib mengelola aria-activedescendant agar screen reader mengetahui item mana yang sedang disorot.']
    },
    aiPrompt: `Buatkan komponen Combobox / Autocomplete yang accessible menggunakan React & Tailwind CSS dengan fitur filter real-time, navigasi keyboard panah atas/bawah, Enter untuk memilih, dan Escape untuk menutup.`,
    codeSnippets: {
      html: `<!-- Pola Combobox HTML Semantic -->
<div class="relative max-w-sm">
  <input type="text" role="combobox" aria-expanded="false" placeholder="Cari kota..." class="w-full px-4 py-2 border rounded-lg text-sm"/>
</div>`,
      reactTailwind: `// Lihat implementasi interaktif pada Live Playground.`
    },
    designSystems: [
      { name: 'Ariakit (Combobox)', framework: 'React', url: 'https://ariakit.org/components/combobox' },
      { name: 'Radix UI (Command)', framework: 'React', url: 'https://ui.shadcn.com/docs/components/combobox' }
    ],
    liveDemoType: 'combobox'
  },

  // 9. BREADCRUMBS
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    nameIndo: 'Jejak Navigasi Hirarkis (Remah Roti)',
    category: 'navigation',
    categoryLabel: 'Navigation',
    summary: 'Daftar tautan berurutan yang menunjukkan lokasi halaman saat ini dalam struktur hirarki situs.',
    alsoKnownAs: [
      'Breadcrumb Trail',
      'Path Navigation',
      'Hierarchy Links'
    ],
    definition: 'Diambil dari dongeng Hansel dan Gretel yang meninggalkan remah roti di jalan. Breadcrumbs membantu pengguna mengetahui posisi mereka di dalam arsitektur website yang dalam (kedalaman >= 3 level) dan memberikan jalan pintas untuk melompat kembali ke kategori induk.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="15" y="45" width="25" height="6" rx="2" fill="#2563EB"/><path d="M48 48L52 51L48 54" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/><rect x="60" y="45" width="30" height="6" rx="2" fill="#2563EB"/><path d="M98 48L102 51L98 54" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/><rect x="110" y="45" width="35" height="6" rx="2" fill="#0F172A"/></svg>`,
    anatomy: [
      { part: 'Crumb Link', nameIndo: 'Tautan Induk', description: 'Link yang mengarahkan ke halaman level di atasnya.' },
      { part: 'Separator', nameIndo: 'Pemisah Karakter (/) atau (>)', description: 'Karakter pembatas visual yang disembunyikan dari screen reader (aria-hidden="true").' },
      { part: 'Current Page Item', nameIndo: 'Halaman Aktif Terakhir', description: 'Teks polos (bukan link) yang ditandai dengan aria-current="page".' }
    ],
    useCases: [
      { title: 'Toko Online E-Commerce', description: 'Home > Elektronik > Handphone > Aksesoris > Casing iPhone 15.' }
    ],
    antiPatterns: [
      { title: 'Menggantikan Menu Navigasi Utama', description: 'Breadcrumbs adalah pelengkap orientasi, bukan pengganti navbar utama.' }
    ],
    accessibility: {
      semanticTag: '<nav aria-label="Breadcrumb"><ol><li>.',
      ariaAttributes: ['aria-current="page" pada item terakhir.'],
      keyboardNavigation: [{ key: 'Tab', action: 'Berpindah antar tautan remah roti.' }],
      criticalRules: ['Selalu gunakan elemen <ol> terurut karena breadcrumbs memiliki makna hirarki level.']
    },
    aiPrompt: `Buatkan komponen Breadcrumbs accessible dengan schema JSON-LD BreadcrumbList untuk SEO Google menggunakan Tailwind CSS dan Astro/React.`,
    codeSnippets: {
      html: `<nav aria-label="Breadcrumb" class="text-sm">
  <ol class="flex items-center gap-2 text-slate-500">
    <li><a href="/" class="hover:text-slate-900">Home</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="/produk" class="hover:text-slate-900">Produk</a></li>
    <li aria-hidden="true">/</li>
    <li aria-current="page" class="font-semibold text-slate-900">Sepatu Lari</li>
  </ol>
</nav>`,
      reactTailwind: `// Pola dasar breadcrumbs.`
    },
    designSystems: [
      { name: 'Carbon (IBM)', framework: 'React', url: 'https://carbondesignsystem.com/components/breadcrumb/usage/' }
    ],
    liveDemoType: 'breadcrumbs'
  },

  // 10. TOOLTIP & POPOVER
  {
    id: 'tooltip',
    name: 'Tooltip & Popover',
    nameIndo: 'Petunjuk Bantu Melayang (Tooltip)',
    category: 'data-display',
    categoryLabel: 'Data Display',
    summary: 'Kotak teks kecil yang muncul saat pengguna mengarahkan kursor (hover) atau memfokuskan elemen untuk menjelaskan fungsi elemen tersebut.',
    alsoKnownAs: [
      'Infotip',
      'Hover Card',
      'Hint',
      'Tippy'
    ],
    definition: 'Tooltip memberikan bantuan kontekstual mikro bagi antarmuka yang sangat padat (seperti toolbar ikon). Beda Tooltip vs Popover: Tooltip muncul saat hover/focus dan HANYA berisi teks singkat non-interaktif; Popover muncul saat klik dan bisa memuat form, tombol, atau link.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="60" y="65" width="40" height="30" rx="6" fill="#0F172A"/><circle cx="80" cy="80" r="6" fill="#FFFFFF"/><rect x="40" y="25" width="80" height="26" rx="5" fill="#1E293B" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/><path d="M75 51L80 56L85 51H75Z" fill="#1E293B"/><rect x="50" y="35" width="60" height="5" rx="1" fill="#F8FAFC"/></svg>`,
    anatomy: [
      { part: 'Trigger Element', nameIndo: 'Elemen Pemicu (Ikon/Tombol)', description: 'Elemen yang di-hover atau difokuskan oleh keyboard.' },
      { part: 'Tooltip Bubble', nameIndo: 'Gelembung Petunjuk', description: 'Kotak gelap kontras tinggi berisi satu frasa penjelasan.' },
      { part: 'Anchor Arrow / Beak', nameIndo: 'Panah Penunjuk Sudut', description: 'Segitiga kecil yang menunjuk tepat ke elemen asalnya.' }
    ],
    useCases: [
      { title: 'Menjelaskan Ikon Tanpa Teks', description: 'Tombol ikon printer di dashboard: Tooltip bertuliskan "Cetak Laporan (Ctrl+P)".' }
    ],
    antiPatterns: [
      { title: 'Menaruh Informasi Penting yang Wajib Dibaca', description: 'Pengguna smartphone tidak memiliki kursor mouse untuk hover. Jangan taruh info kritis hanya di dalam tooltip.' }
    ],
    accessibility: {
      semanticTag: '<div role="tooltip">.',
      ariaAttributes: ['aria-describedby="tooltip-id" pada elemen pemicu.'],
      keyboardNavigation: [
        { key: 'Tab', action: 'Memfokuskan elemen pemicu dan otomatis menampilkan tooltip.' },
        { key: 'Escape', action: 'Menghilangkan tooltip tanpa memindahkan fokus kursor.' }
      ],
      criticalRules: ['Tooltip wajib bisa diakses via keyboard focus, bukan mouse hover saja!']
    },
    aiPrompt: `Buatkan komponen Tooltip accessible dengan React dan Tailwind CSS yang mendukung hover dan keyboard focus, dengan posisi dinamis (top, bottom) dan transisi fade halus.`,
    codeSnippets: {
      html: `<div class="relative group inline-block">
  <button class="p-2 rounded-lg bg-slate-100 hover:bg-slate-200">🔍</button>
  <div role="tooltip" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-2.5 py-1 text-xs text-white bg-slate-900 rounded shadow-md whitespace-nowrap">
    Cari Dokumen (⌘F)
  </div>
</div>`,
      reactTailwind: `// Pola Tooltip.`
    },
    designSystems: [
      { name: 'Radix UI (Tooltip)', framework: 'React', url: 'https://ui.shadcn.com/docs/components/tooltip' }
    ],
    liveDemoType: 'tooltip'
  },

  // 11. CARD
  {
    id: 'card',
    name: 'Card',
    nameIndo: 'Kartu Informasi Terpadu',
    category: 'layout',
    categoryLabel: 'Layout & Containers',
    summary: 'Wadah visual berbentuk kotak fleksibel yang mengelompokkan informasi terkait mengenai satu entitas tunggal (produk, artikel, profil).',
    alsoKnownAs: ['Tile', 'Box', 'Panel', 'Paper (Material UI)'],
    definition: 'Card adalah metafora dari kartu fisik (seperti kartu nama atau kartu pos). Card bertindak sebagai satu kesatuan objek mandiri. Jika di-klik, seringkali card mengarahkan ke halaman detail entitas tersebut.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="25" y="15" width="110" height="90" rx="8" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><rect x="25" y="15" width="110" height="42" rx="8" fill="#F1F5F9"/><path d="M60 40L75 25L90 40H60Z" fill="#CBD5E1"/><rect x="35" y="68" width="50" height="7" rx="2" fill="#0F172A"/><rect x="35" y="80" width="80" height="4" rx="1" fill="#94A3B8"/><rect x="35" y="88" width="60" height="4" rx="1" fill="#94A3B8"/></svg>`,
    anatomy: [
      { part: 'Card Media (Header Image)', nameIndo: 'Gambar Sampul', description: 'Foto produk atau thumbnail artikel.' },
      { part: 'Card Header & Title', nameIndo: 'Judul Entitas', description: 'Nama produk atau judul artikel.' },
      { part: 'Card Body / Description', nameIndo: 'Deskripsi Singkat', description: 'Ringkasan isi dalam 1-2 baris.' },
      { part: 'Card Footer / Actions', nameIndo: 'Aksi Bawah', description: 'Tombol "Beli", harga, atau profil penulis.' }
    ],
    useCases: [
      { title: 'Katalog Produk E-Commerce', description: 'Grid produk dengan foto, harga, rating bintang, dan tombol add-to-cart.' },
      { title: 'Daftar Artikel Blog / Berita', description: 'Thumbnail gambar, judul artikel, tanggal terbit, dan estimasi waktu baca.' }
    ],
    antiPatterns: [
      { title: 'Menumpuk Terlalu Banyak Aksi di Satu Card', description: 'Jika seluruh card bisa diklik sebagai link, jangan taruh 5 link berbeda di dalamnya yang membuat salah klik.' }
    ],
    accessibility: {
      semanticTag: '<article> atau <div> dengan batas semantik.',
      ariaAttributes: ['Jika seluruh card adalah link, gunakan pola "Pseudo-content Clickable Card" agar screen reader tidak membaca berulang.'],
      keyboardNavigation: [{ key: 'Tab', action: 'Fokus ke link utama atau tombol di dalam card.' }],
      criticalRules: ['Hindari nesting tag <a> di dalam tag <a> lain.']
    },
    aiPrompt: `Buatkan komponen Card Produk e-commerce yang accessible dan responsif dengan Tailwind CSS, dilengkapi aspect-ratio gambar, badge diskon melayang, judul dengan line-clamp, harga rupiah tebal, dan tombol aksi.`,
    codeSnippets: {
      html: `<article class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg transition-shadow">
  <img src="/sample.jpg" alt="Sepatu Sneakers" class="w-full aspect-video object-cover" />
  <div class="p-4">
    <span class="text-xs font-semibold text-blue-600 uppercase">Sneakers</span>
    <h3 class="font-bold text-base mt-1 text-slate-900 dark:text-slate-100">Urban Runner Pro X</h3>
    <p class="text-xs text-slate-500 mt-1">Rp 899.000</p>
  </div>
</article>`,
      reactTailwind: `// Pola Card React.`
    },
    designSystems: [{ name: 'Carbon (IBM)', framework: 'React', url: 'https://carbondesignsystem.com/components/card/usage/' }],
    liveDemoType: 'card'
  },

  // 12. DATA TABLE
  {
    id: 'table',
    name: 'Table / Data Grid',
    nameIndo: 'Tabel Data & Informasi Terstruktur',
    category: 'data-display',
    categoryLabel: 'Data Display',
    summary: 'Tampilan baris dan kolom untuk menyajikan sejumlah besar data terstruktur agar mudah dipindai, diurutkan, dan dibandingkan.',
    alsoKnownAs: ['Data Grid', 'Data Table', 'Matrix'],
    definition: 'Table adalah jantung dari sistem backoffice, ERP, CRM, dan admin dashboard. Tabel data yang baik wajib memiliki kemampuan sort (urutkan per kolom), pagination, bulk action (pilih banyak baris), dan responsif pada layar kecil.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="15" y="20" width="130" height="80" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><line x1="15" y1="40" x2="145" y2="40" stroke="#0F172A" stroke-width="1.5"/><line x1="15" y1="60" x2="145" y2="60" stroke="#E2E8F0"/><line x1="15" y1="80" x2="145" y2="80" stroke="#E2E8F0"/><rect x="25" y="27" width="25" height="5" rx="1" fill="#0F172A"/><rect x="70" y="27" width="30" height="5" rx="1" fill="#0F172A"/><rect x="115" y="27" width="20" height="5" rx="1" fill="#0F172A"/><circle cx="25" cy="50" r="3" fill="#94A3B8"/><rect x="35" y="48" width="20" height="4" rx="1" fill="#94A3B8"/><rect x="70" y="48" width="35" height="4" rx="1" fill="#94A3B8"/><circle cx="25" cy="70" r="3" fill="#94A3B8"/><rect x="35" y="68" width="20" height="4" rx="1" fill="#94A3B8"/><rect x="70" y="68" width="35" height="4" rx="1" fill="#94A3B8"/></svg>`,
    anatomy: [
      { part: 'Table Header (<thead>)', nameIndo: 'Baris Kepala Tabel', description: 'Menampung judul setiap kolom data beserta ikon pengurutan (sort).' },
      { part: 'Table Body (<tbody>)', nameIndo: 'Baris Data', description: 'Kumpulan baris (<tr>) dan sel (<td>) data.' },
      { part: 'Checkbox Column', nameIndo: 'Kolom Seleksi Massal', description: 'Kotak centang untuk memilih satu baris atau "Pilih Semua".' }
    ],
    useCases: [
      { title: 'Daftar Pesanan Penjualan', description: 'Nomor Order, Pelanggan, Tanggal, Total, Status, dan Tombol Aksi Cetak Resi.' }
    ],
    antiPatterns: [
      { title: 'Mengabaikan Layar Mobile', description: 'Tabel 8 kolom yang dipaksa tampil di HP tanpa horizontal scroll atau card collapse menjadi tidak terbaca.' }
    ],
    accessibility: {
      semanticTag: '<table>, <thead>, <tbody>, <th> (dengan scope="col/row"), <td>.',
      ariaAttributes: ['aria-sort="ascending|descending" pada <th> yang bisa diurutkan.'],
      keyboardNavigation: [{ key: 'Arrow Keys', action: 'Navigasi sel pada grid kompleks.' }],
      criticalRules: ['Wajib menggunakan tag <th> untuk kepala kolom dengan atribut scope="col".']
    },
    aiPrompt: `Buatkan komponen Data Table admin responsif dengan Tailwind CSS & React yang mendukung sorting kolom (klik header untuk ascending/descending), bulk checkbox, dan hover efek baris.`,
    codeSnippets: {
      html: `<div class="overflow-x-auto border border-slate-200 rounded-lg">
  <table class="min-w-full divide-y divide-slate-200 text-sm">
    <thead class="bg-slate-50">
      <tr>
        <th scope="col" class="px-4 py-3 text-left font-semibold text-slate-900">Nama</th>
        <th scope="col" class="px-4 py-3 text-left font-semibold text-slate-900">Peran</th>
        <th scope="col" class="px-4 py-3 text-left font-semibold text-slate-900">Status</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white">
      <tr>
        <td class="px-4 py-3 font-medium">Budi Santoso</td>
        <td class="px-4 py-3 text-slate-500">Administrator</td>
        <td class="px-4 py-3"><span class="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">Aktif</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
      reactTailwind: `// Pola Tabel Data.`
    },
    designSystems: [{ name: 'Polaris (Shopify)', framework: 'Web Components', url: 'https://polaris.shopify.com/components/tables/data-table' }],
    liveDemoType: 'table'
  },

  // 13. PAGINATION
  {
    id: 'pagination',
    name: 'Pagination',
    nameIndo: 'Navigasi Nomor Halaman',
    category: 'navigation',
    categoryLabel: 'Navigation',
    summary: 'Komponen untuk memecah daftar data yang sangat panjang ke dalam beberapa halaman terpisah dan menyediakan tombol navigasi nomor halaman.',
    alsoKnownAs: ['Page Switcher', 'Pager'],
    definition: 'Pagination mencegah browser memuat ribuan data sekaligus yang dapat memperlambat performa render (*DOM overhead*). Pengguna dapat melompat ke halaman 1, 2, 3 atau halaman terakhir dengan pasti.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="15" y="45" width="24" height="24" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><path d="M29 53L25 57L29 61" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/><rect x="45" y="45" width="24" height="24" rx="4" fill="#2563EB"/><text x="54" y="61" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">1</text><rect x="75" y="45" width="24" height="24" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/><text x="84" y="61" fill="#64748B" font-family="sans-serif" font-size="11">2</text><rect x="105" y="45" width="24" height="24" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/><text x="114" y="61" fill="#64748B" font-family="sans-serif" font-size="11">3</text><rect x="135" y="45" width="24" height="24" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><path d="M145 53L149 57L145 61" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    anatomy: [
      { part: 'Previous / Next Buttons', nameIndo: 'Tombol Sebelumnya & Selanjutnya', description: 'Tombol panah mundur atau maju satu halaman.' },
      { part: 'Page Number Buttons', nameIndo: 'Tombol Angka Halaman', description: 'Nomor-nomor halaman dengan penanda aktif pada halaman yang sedang dibuka.' },
      { part: 'Ellipsis (...)', nameIndo: 'Titik Tiga Pemendek', description: 'Simbol penyingkat jika jumlah total halaman melebihi 10.' }
    ],
    useCases: [{ title: 'Hasil Pencarian & Katalog Produk', description: 'Membagi 500 produk menjadi 25 item per halaman.' }],
    antiPatterns: [{ title: 'Mematikan Tombol Back Browser', description: 'Setiap pergantian halaman wajib memperbarui query URL (?page=2) agar link bisa di-bookmark.' }],
    accessibility: {
      semanticTag: '<nav aria-label="Pagination"><ul role="list">.',
      ariaAttributes: ['aria-current="page" pada tombol halaman yang sedang aktif.'],
      keyboardNavigation: [{ key: 'Tab', action: 'Berpindah antar tombol nomor halaman.' }],
      criticalRules: ['Wajib membungkus pagination dengan tag <nav> yang diberi aria-label="Pagination".']
    },
    aiPrompt: `Buatkan komponen Pagination accessible dengan Tailwind CSS yang menghandle query params URL, tombol prev/next, dan ellipsis otomatis jika total halaman > 7.`,
    codeSnippets: {
      html: `<nav aria-label="Pagination" class="flex justify-center items-center gap-1.5 text-sm">
  <button class="px-3 py-1.5 rounded border border-slate-300 disabled:opacity-50" disabled>Sebelumnya</button>
  <button aria-current="page" class="w-8 h-8 rounded bg-blue-600 text-white font-semibold">1</button>
  <button class="w-8 h-8 rounded hover:bg-slate-100">2</button>
  <button class="px-3 py-1.5 rounded border border-slate-300">Selanjutnya</button>
</nav>`,
      reactTailwind: `// Pola Pagination.`
    },
    designSystems: [{ name: 'Carbon (IBM)', framework: 'React', url: 'https://carbondesignsystem.com/components/pagination/usage/' }],
    liveDemoType: 'pagination'
  },

  // 14. TOGGLE SWITCH
  {
    id: 'toggle-switch',
    name: 'Toggle Switch',
    nameIndo: 'Sakelar Hidup/Mati (Switch)',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Komponen input biner yang merepresentasikan kondisi Nyala/Mati (On/Off) yang langsung berdampak seketika tanpa perlu menekan tombol submit.',
    alsoKnownAs: ['Switch', 'Toggle Button', 'Light Switch'],
    definition: 'Terinspirasi dari sakelar lampu fisik di dinding. Perbedaan kunci: Checkbox biasanya memerlukan penekanan tombol "Simpan" pada formulir, sedangkan Toggle Switch langsung mengubah preferensi seketika saat digeser (misal: "Aktifkan Mode Gelap").',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="30" y="45" width="50" height="28" rx="14" fill="#E2E8F0"/><circle cx="44" cy="59" r="10" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5"/><rect x="90" y="45" width="50" height="28" rx="14" fill="#2563EB"/><circle cx="126" cy="59" r="10" fill="#FFFFFF"/></svg>`,
    anatomy: [
      { part: 'Track (Background)', nameIndo: 'Lintasan Geser', description: 'Kapsul lonjong yang berubah warna saat On (biru/hijau) dan Off (abu-abu).' },
      { part: 'Thumb (Handle)', nameIndo: 'Kepala Tombol Geser', description: 'Lingkaran putih yang meluncur ke kiri (Off) atau ke kanan (On).' },
      { part: 'Label', nameIndo: 'Label Keterangan', description: 'Teks deskriptif di samping sakelar.' }
    ],
    useCases: [{ title: 'Halaman Pengaturan & Preferensi', description: '"Terima Notifikasi Email", "Gunakan Autentikasi 2FA", "Mode Gelap".' }],
    antiPatterns: [{ title: 'Menjadikan Switch sebagai Syarat Form (TOS)', description: 'Untuk "Saya menyetujui Syarat & Ketentuan", gunakan Checkbox, BUKAN Switch.' }],
    accessibility: {
      semanticTag: '<button role="switch" aria-checked="true|false">.',
      ariaAttributes: ['role="switch"', 'aria-checked="true|false"'],
      keyboardNavigation: [{ key: 'Spasi & Enter', action: 'Membalikkan status sakelar (toggle On/Off).' }],
      criticalRules: ['Wajib menggunakan role="switch" dan aria-checked, jangan gunakan checkbox biasa tanpa label yang jelas.']
    },
    aiPrompt: `Buatkan komponen Toggle Switch yang accessible dengan WAI-ARIA role="switch", keyboard spacebar toggle, dan animasi transisi geser thumb yang halus di Tailwind CSS.`,
    codeSnippets: {
      html: `<button type="button" role="switch" aria-checked="true" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 transition-colors duration-200">
  <span class="inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white transition duration-200 shadow"></span>
</button>`,
      reactTailwind: `// Pola Toggle Switch.`
    },
    designSystems: [{ name: 'Base Web (Uber)', framework: 'React', url: 'https://baseweb.design/components/switch/' }],
    liveDemoType: 'toggle-switch'
  },

  // 15. CHECKBOX & RADIO
  {
    id: 'checkbox',
    name: 'Checkbox & Radio Button',
    nameIndo: 'Kotak Centang & Tombol Radio',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Elemen input pilihan standar: Checkbox untuk memilih nol, satu, atau banyak opsi; Radio Button untuk memilih tepat satu opsi dari beberapa alternatif.',
    alsoKnownAs: ['Tick box', 'Option Button', 'Multi-select Choice'],
    definition: 'Checkbox dan Radio Button adalah dua kontrol formulir paling fundamental dalam sejarah antarmuka komputer. Aturan emas UX: Gunakan Radio Button jika pilihan saling meniadakan (*mutually exclusive*); gunakan Checkbox jika pengguna bebas mencentang kombinasi apapun.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="30" y="30" width="22" height="22" rx="4" fill="#2563EB"/><path d="M35 41L39 45L47 37" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><rect x="60" y="38" width="65" height="6" rx="2" fill="#0F172A"/><circle cx="41" cy="78" r="11" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/><circle cx="41" cy="78" r="5" fill="#2563EB"/><rect x="60" y="75" width="55" height="6" rx="2" fill="#0F172A"/></svg>`,
    anatomy: [
      { part: 'Check Mark / Radio Dot', nameIndo: 'Tanda Centang / Dot Bulat', description: 'Simbol visual penanda bahwa item terpilih.' },
      { part: 'Input Box / Ring', nameIndo: 'Bingkai Kotak / Lingkaran', description: 'Kotak (checkbox) atau lingkaran (radio) batas klik.' },
      { part: 'Clickable Label', nameIndo: 'Label Teks Dapat Diklik', description: 'Teks <label> yang ketika diklik ikut mencentang input.' }
    ],
    useCases: [
      { title: 'Pilihan Metode Pembayaran (Radio)', description: 'Transfer Bank BCA ATAU QRIS ATAU COD (Hanya bisa pilih 1).' },
      { title: 'Pilihan Topping Makanan (Checkbox)', description: 'Ekstra Keju DAN Ekstra Saus DAN Es Teh (Bisa pilih 0 atau lebih).' }
    ],
    antiPatterns: [
      { title: 'Teks Label Tidak Terhubung dengan Input', description: 'Mengklik teks label tidak mencentang kotak karena lupa memasang atribut htmlFor="id".' }
    ],
    accessibility: {
      semanticTag: '<input type="checkbox"> dan <input type="radio">.',
      ariaAttributes: ['aria-checked="true|false|mixed" (status mixed untuk induk checkbox "Pilih Semua").'],
      keyboardNavigation: [
        { key: 'Spasi', action: 'Mencentang / melepas centang checkbox.' },
        { key: 'Panah Atas / Bawah', action: 'Berpindah pilihan antar radio button dalam satu group.' }
      ],
      criticalRules: ['Radio buttons dalam satu kelompok WAJIB memiliki atribut "name" yang persis sama.']
    },
    aiPrompt: `Buatkan komponen Checkbox dan Radio Button kustom yang tetap mempertahankan native input di belakangnya demi aksesibilitas sempurna, dengan label yang bisa diklik dan indikator focus ring di Tailwind CSS.`,
    codeSnippets: {
      html: `<label class="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300">
  <span class="text-sm font-medium text-slate-900">Ingat saya di perangkat ini</span>
</label>`,
      reactTailwind: `// Pola Checkbox.`
    },
    designSystems: [{ name: 'Polaris (Shopify)', framework: 'Web Components', url: 'https://polaris.shopify.com/components/selection-and-input/checkbox' }],
    liveDemoType: 'checkbox'
  },

  // 16. SKELETON LOADER
  {
    id: 'skeleton',
    name: 'Skeleton Loader',
    nameIndo: 'Kerangka Pemuatan Animasi',
    category: 'feedback',
    categoryLabel: 'Feedback & Overlays',
    summary: 'Versi tiruan wireframe kosong dari konten yang berdenyut lembut untuk memberi tahu pengguna bentuk struktur data yang sedang dimuat.',
    alsoKnownAs: ['Ghost Screen', 'Content Placeholder', 'Shimmer'],
    definition: 'Skeleton loader terbukti secara psikologis menurunkan persepsi waktu tunggu (*perceived load time*) dibandingkan layar putih kosong atau spinner putar di tengah layar. Pengguna merasa antarmuka lebih cepat dan siap menerima konten.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="20" y="25" width="120" height="70" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/><circle cx="45" cy="50" r="14" fill="#E2E8F0"/><rect x="68" y="42" width="60" height="7" rx="2" fill="#E2E8F0"/><rect x="68" y="55" width="40" height="5" rx="1.5" fill="#E2E8F0"/><rect x="30" y="75" width="100" height="5" rx="1.5" fill="#F1F5F9"/></svg>`,
    anatomy: [
      { part: 'Shimmering Bone Elements', nameIndo: 'Balok Tulang Berdenyut', description: 'Elemen abu-abu beranimasi pulse (opacity bergelombang).' },
      { part: 'Matching Geometry', nameIndo: 'Geometri yang Presisi', description: 'Bentuk skeleton persis menyerupai ukuran avatar, teks, dan tombol aslinya.' }
    ],
    useCases: [{ title: 'Memuat Feed Berita / Produk', description: 'Menampilkan susunan kartu produk saat data API sedang diambil.' }],
    antiPatterns: [{ title: 'Bentuk Skeleton Tidak Cocok dengan Konten Asli', description: 'Jika skeleton berbentuk lingkaran kecil, tetapi konten aslinya berupa tabel lebar, terjadi layout shift (CLS).' }],
    accessibility: {
      semanticTag: '<div aria-busy="true" aria-live="polite">.',
      ariaAttributes: ['aria-hidden="true" pada balok visual dan teks tersembunyi <span class="sr-only">Sedang memuat data...</span>.'],
      keyboardNavigation: [],
      criticalRules: ['Pastikan screen reader tidak membaca belasan balok skeleton sebagai gambar kosong.']
    },
    aiPrompt: `Buatkan komponen Skeleton Loader kartu profil dan tabel dengan Tailwind CSS kelas 'animate-pulse' dan penanganan screen-reader 'sr-only'.`,
    codeSnippets: {
      html: `<div class="animate-pulse flex space-x-4 p-4 border rounded-xl">
  <div class="rounded-full bg-slate-200 dark:bg-slate-800 h-10 w-10"></div>
  <div class="flex-1 space-y-2 py-1">
    <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
    <div class="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
  </div>
</div>`,
      reactTailwind: `// Pola Skeleton.`
    },
    designSystems: [{ name: 'shadcn/ui (Skeleton)', framework: 'React', url: 'https://ui.shadcn.com/docs/components/skeleton' }],
    liveDemoType: 'skeleton'
  },

  // 17. AVATAR
  {
    id: 'avatar',
    name: 'Avatar',
    nameIndo: 'Foto Profil / Identitas Pengguna',
    category: 'data-display',
    categoryLabel: 'Data Display',
    summary: 'Representasi grafis melingkar dari pengguna: berupa foto profil asli, inisial nama, atau ikon ilustrasi abstrak.',
    alsoKnownAs: ['User Picture', 'Profile Icon'],
    definition: 'Avatar memanusiakan antarmuka digital. Memberikan rasa kepemilikan akun dan memudahkan mengenali siapa yang meninggalkan komentar atau melakukan perubahan data di dalam tim.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><circle cx="80" cy="60" r="30" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2"/><circle cx="80" cy="50" r="11" fill="#4F46E5"/><path d="M60 76C60 67 69 64 80 64C91 64 100 67 100 76" fill="#4F46E5"/><circle cx="102" cy="78" r="6" fill="#22C55E" stroke="#FFFFFF" stroke-width="2"/></svg>`,
    anatomy: [
      { part: 'Circular Mask', nameIndo: 'Masking Lingkaran (rounded-full)', description: 'Memotong foto secara rapi dalam rasio 1:1.' },
      { part: 'Fallback Initials', nameIndo: 'Inisial Pengganti', description: 'Huruf inisial (misal "FB") jika foto gagal dimuat atau belum diunggah.' },
      { part: 'Presence Status Badge', nameIndo: 'Titik Status Kehadiran', description: 'Dot hijau kecil penanda status sedang online / aktif.' }
    ],
    useCases: [{ title: 'Daftar Kolaborator & Komentar', description: 'Menampilkan wajah orang di samping setiap pesan obrolan.' }],
    antiPatterns: [{ title: 'Tanpa Inisial Pengganti saat Gambar Error', description: 'Menampilkan ikon broken image jelek saat foto pengguna gagal dimuat dari server.' }],
    accessibility: {
      semanticTag: '<img> dengan atribut alt yang bermakna atau <div> dengan inisial.',
      ariaAttributes: ['alt="Foto profil Budi Santoso"'],
      keyboardNavigation: [],
      criticalRules: ['Wajib menyediakan alt text deskriptif untuk foto profil.']
    },
    aiPrompt: `Buatkan komponen Avatar yang otomatis menampilkan inisial 2 huruf jika gambar tidak ada atau gagal dimuat (onError fallback) dengan opsi status online badge.`,
    codeSnippets: {
      html: `<div class="relative inline-block">
  <img class="h-10 w-10 rounded-full object-cover border-2 border-white" src="/avatar.jpg" alt="Foto Profil" />
  <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
</div>`,
      reactTailwind: `// Pola Avatar.`
    },
    designSystems: [{ name: 'Polaris (Shopify)', framework: 'Web Components', url: 'https://polaris.shopify.com/components/images-and-icons/avatar' }],
    liveDemoType: 'avatar'
  },

  // 18. TOAST
  {
    id: 'toast',
    name: 'Toast / Snackbar',
    nameIndo: 'Notifikasi Mengambang Sementara',
    category: 'feedback',
    categoryLabel: 'Feedback & Overlays',
    summary: 'Pemberitahuan ringan yang muncul mengambang di tepi layar untuk mengonfirmasi bahwa suatu aksi berhasil dijalankan, lalu menghilang otomatis.',
    alsoKnownAs: ['Snackbar (Material Design)', 'Floating Notification'],
    definition: 'Toast dinamai demikian karena perilakunya yang "meloncat" keluar seperti roti panggang dari mesin pemanggang (*toaster*). Didesain agar tidak mengganggu fokus kerja pengguna dan tidak memerlukan tombol konfirmasi wajib.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="30" y="70" width="100" height="32" rx="6" fill="#0F172A" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/><circle cx="44" cy="86" r="6" fill="#22C55E"/><path d="M41 86L43 88L47 84" stroke="white" stroke-width="1.2" stroke-linecap="round"/><rect x="56" y="83" width="50" height="5" rx="1.5" fill="#FFFFFF"/><circle cx="118" cy="86" r="4" fill="#334155"/></svg>`,
    anatomy: [
      { part: 'Floating Capsule', nameIndo: 'Kapsul Melayang', description: 'Kotak gelap mengambang dengan elevasi bayangan z-index tinggi.' },
      { part: 'Action Button (Undo)', nameIndo: 'Tombol Batalkan Aksi (Undo)', description: 'Tombol "Urungkan" untuk membatalkan aksi yang baru saja dilakukan.' }
    ],
    useCases: [{ title: 'Konfirmasi Simpan Berhasil', description: '"Perubahan berhasil disimpan", "Tautan telah disalin ke papan klip".' }],
    antiPatterns: [{ title: 'Menaruh Pesan Error Fatal di Toast', description: 'Toast menghilang otomatis dalam 4 detik. Jika ada kegagalan transaksi krusial, gunakan Alert permanen.' }],
    accessibility: {
      semanticTag: '<div role="status" aria-live="polite">.',
      ariaAttributes: ['aria-live="polite"'],
      keyboardNavigation: [],
      criticalRules: ['Berikan waktu tayang cukup (minimal 4-5 detik) atau tombol tutup manual bagi pengguna disabilitas.']
    },
    aiPrompt: `Buatkan sistem Toast Notification (Sonner style) dengan Tailwind CSS dan React yang mendukung auto-dismiss 4 detik, tombol Undo, dan stack animasi tumpuk di sudut kanan bawah.`,
    codeSnippets: {
      html: `<div role="status" class="fixed bottom-5 right-5 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl text-sm z-50">
  <span class="text-green-400 font-bold">✓</span>
  <span>Tautan produk berhasil disalin!</span>
</div>`,
      reactTailwind: `// Pola Toast.`
    },
    designSystems: [{ name: 'Sonner / Radix UI', framework: 'React', url: 'https://sonner.emilkowal.ski/' }],
    liveDemoType: 'toast'
  },

  // 19. CAROUSEL
  {
    id: 'carousel',
    name: 'Carousel / Slider',
    nameIndo: 'Slider Geser Konten Bergilir',
    category: 'layout',
    categoryLabel: 'Layout & Containers',
    summary: 'Komponen tampilan bergeser yang menampilkan serangkaian kartu atau slide foto satu per satu dengan tombol panah atau geseran sentuh.',
    alsoKnownAs: ['Content Slider', 'Image Swiper', 'Rotator'],
    definition: 'Sering dipakai pada banner promosi beranda toko online. Namun dalam UX modern, carousel otomatis berputar (*auto-rotating*) sering dikritik karena memicu "banner blindness" dan menurunkan rasio konversi slide ke-2 ke bawah.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="35" y="25" width="90" height="65" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/><circle cx="20" cy="57" r="7" fill="#E2E8F0"/><path d="M22 54L19 57L22 60" stroke="#0F172A" stroke-width="1.5"/><circle cx="140" cy="57" r="7" fill="#E2E8F0"/><path d="M138 54L141 57L138 60" stroke="#0F172A" stroke-width="1.5"/><circle cx="68" cy="100" r="3" fill="#2563EB"/><circle cx="80" cy="100" r="3" fill="#CBD5E1"/><circle cx="92" cy="100" r="3" fill="#CBD5E1"/></svg>`,
    anatomy: [
      { part: 'Slides Track', nameIndo: 'Jalur Slide Geser', description: 'Wadah fleksibel horizontal yang bergeser menggunakan scroll-snap CSS.' },
      { part: 'Nav Arrows (Prev/Next)', nameIndo: 'Panah Navigasi Kiri-Kanan', description: 'Tombol untuk melangkah ke slide berikutnya.' },
      { part: 'Dot Indicators', nameIndo: 'Titik Indikator Posisi', description: 'Barisan titik bulat kecil yang menandakan posisi slide aktif.' }
    ],
    useCases: [{ title: 'Galeri Foto Produk Toko Online', description: 'Melihat 5 sudut foto baju yang berbeda secara geser.' }],
    antiPatterns: [{ title: 'Auto-play Terlalu Cepat Tanpa Tombol Pause', description: 'Slide bergeser sendiri saat pengguna sedang membaca teks promosi.' }],
    accessibility: {
      semanticTag: '<section aria-roledescription="carousel">.',
      ariaAttributes: ['aria-roledescription="carousel"', 'Wajib sediakan tombol Pause/Play jika ada animasi otomatis.'],
      keyboardNavigation: [{ key: 'Panah Kiri/Kanan', action: 'Menggeser slide ke kiri dan kanan.' }],
      criticalRules: ['Wajib mematuhi preferensi prefers-reduced-motion pengguna.']
    },
    aiPrompt: `Buatkan Carousel galeri foto produk dengan pure CSS Scroll-Snap dan tombol Next/Prev yang accessible dan touch-friendly di mobile.`,
    codeSnippets: {
      html: `<!-- Pure CSS Carousel dengan Scroll Snap -->
<div class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
  <div class="snap-center shrink-0 w-80 h-48 bg-slate-100 rounded-xl flex items-center justify-center font-bold">Slide 1</div>
  <div class="snap-center shrink-0 w-80 h-48 bg-slate-100 rounded-xl flex items-center justify-center font-bold">Slide 2</div>
</div>`,
      reactTailwind: `// Pola Carousel.`
    },
    designSystems: [{ name: 'Embla Carousel', framework: 'Framework Agnostic', url: 'https://www.embla-carousel.com/' }],
    liveDemoType: 'carousel'
  },

  // 20. TREE VIEW
  {
    id: 'tree-view',
    name: 'Tree View',
    nameIndo: 'Navigasi Hirarki Beranting',
    category: 'navigation',
    categoryLabel: 'Navigation',
    summary: 'Komponen untuk menampilkan struktur informasi bertingkat (seperti direktori folder file atau daftar kategori produk bersarang).',
    alsoKnownAs: ['Directory Tree', 'Nested List', 'Hierarchy Browser'],
    definition: 'Tree View menyajikan hubungan induk-anak (*parent-child*) bertingkat. Pengguna dapat membuka cabang folder untuk menelusuri sub-folder dan berkas di dalamnya.',
    svgIcon: `<svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="25" y="25" width="12" height="12" rx="2" fill="#2563EB"/><rect x="45" y="28" width="50" height="6" rx="2" fill="#0F172A"/><line x1="31" y1="37" x2="31" y2="70" stroke="#CBD5E1" stroke-width="1.5"/><line x1="31" y1="55" x2="45" y2="55" stroke="#CBD5E1" stroke-width="1.5"/><rect x="50" y="52" width="45" height="6" rx="2" fill="#64748B"/><line x1="31" y1="75" x2="45" y2="75" stroke="#CBD5E1" stroke-width="1.5"/><rect x="50" y="72" width="40" height="6" rx="2" fill="#64748B"/></svg>`,
    anatomy: [
      { part: 'Folder Node (Expandable)', nameIndo: 'Induk Cabang (Bisa Dilipat)', description: 'Item yang memiliki anak di bawahnya.' },
      { part: 'Leaf Node', nameIndo: 'Ujung Daun (File Terakhir)', description: 'Item akhir tanpa anak cabang.' }
    ],
    useCases: [{ title: 'File Manager & Explorer', description: 'Navigasi file di Google Drive, VS Code, atau CMS dokumen.' }],
    antiPatterns: [{ title: 'Kedalaman Lebih dari 5 Level di Layar Sempit', description: 'Indentasi ruang terlalu dalam membuat teks terpotong di mobile.' }],
    accessibility: {
      semanticTag: '<ul role="tree"><li role="treeitem">.',
      ariaAttributes: ['role="tree"', 'role="treeitem"', 'aria-expanded="true/false"'],
      keyboardNavigation: [
        { key: 'Panah Kanan', action: 'Membuka folder yang sedang tertutup.' },
        { key: 'Panah Kiri', action: 'Menutup folder atau kembali ke induk cabang.' }
      ],
      criticalRules: ['Wajib mendukung penuh navigasi 4 arah panah keyboard sesuai WAI-ARIA Tree View pattern.']
    },
    aiPrompt: `Buatkan komponen Tree View direktori berkas bertingkat rekursif menggunakan React, Tailwind CSS, dan WAI-ARIA role="tree".`,
    codeSnippets: {
      html: `<!-- Tree View Semantic -->
<ul role="tree" class="font-mono text-sm space-y-1">
  <li role="treeitem" aria-expanded="true">📁 src/
    <ul role="group" class="pl-4 border-l border-slate-200 mt-1 space-y-1">
      <li role="treeitem">📄 App.tsx</li>
      <li role="treeitem">📄 index.css</li>
    </ul>
  </li>
</ul>`,
      reactTailwind: `// Pola Tree View.`
    },
    designSystems: [{ name: 'Carbon (IBM TreeView)', framework: 'React', url: 'https://carbondesignsystem.com/components/treeview/usage/' }],
    liveDemoType: 'tree-view'
  }
];

