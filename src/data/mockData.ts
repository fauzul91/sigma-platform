import type {
  RepropediaItem,
  MediaItem,
  UgcItem,
  EventItem,
  Counselor,
  StatRecord,
  QuizQuestion,
  OrgMember,
  ArticleItem,
} from "@/types";

// Re-export types for backward compatibility
export type {
  RepropediaItem,
  MediaItem,
  UgcItem,
  EventItem,
  Counselor,
  StatRecord,
  QuizQuestion,
  OrgMember,
};

// 1. STATS OVERVIEW
export const globalStats = {
  totalModules: 32,
  totalArticles: 48,
  totalUsersHelped: 524,
  activeCounselors: 12,
};

// 2. REPROPEDIA
export const repropediaModules: RepropediaItem[] = [
  {
    id: "r1",
    title: "Memahami Pubertas: Apa yang Terjadi pada Tubuhku?",
    slug: "memahami-pubertas-tubuhku",
    category: "pubertas",
    synopsis:
      "Panduan lengkap perubahan fisik, hormonal, dan psikologis selama masa pubertas untuk laki-laki dan perempuan.",
    content:
      "Masa pubertas adalah fase transisi yang luar biasa. Tubuh Anda memproduksi hormon baru yang memicu perubahan fisik seperti pertumbuhan tinggi badan, perubahan suara, menstruasi pertama pada perempuan, dan mimpi basah pada laki-laki. Selain fisik, emosi juga akan mengalami pasang surut. Memahami bahwa ini adalah proses alami membantu Anda menghadapinya dengan percaya diri dan tanpa rasa takut.",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    readTime: "5 menit",
    author: "dr. Andi Wijaya, Sp.A",
    date: "12 Mei 2026",
  },
  {
    id: "r2",
    title: "Mengapa Pernikahan Anak Merugikan Masa Depan?",
    slug: "mengapa-pernikahan-anak-merugikan",
    category: "pernikahan-anak",
    synopsis:
      "Analisis komprehensif dampak kesehatan reproduksi, sosial, dan ekonomi dari pernikahan usia dini.",
    content:
      "Pernikahan di bawah usia 19 tahun memiliki risiko medis yang sangat tinggi bagi remaja perempuan. Panggul yang belum berkembang sempurna meningkatkan risiko persalinan macet, perdarahan, hingga kematian ibu dan bayi. Secara psikososial, anak kehilangan hak belajar dan bermain, memicu siklus kemiskinan baru karena keterbatasan pendidikan dan akses ekonomi.",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    readTime: "7 menit",
    author: "Kader GARUDA Utama",
    date: "20 Juni 2026",
  },
  {
    id: "r3",
    title: "Mengenal Hak-Hak Anak dan Perlindungan Hukumnya",
    slug: "mengenal-hak-anak-dan-perlindungan",
    category: "hak-anak",
    synopsis:
      "Pelajari 4 hak dasar anak berdasarkan Konvensi PBB dan undang-undang perlindungan anak di Indonesia.",
    content:
      "Setiap individu di bawah usia 18 tahun dikategorikan sebagai anak dan memiliki hak mutlak: Hak Kelangsungan Hidup, Hak Tumbuh Kembang, Hak Perlindungan (dari kekerasan, eksploitasi, dan diskriminasi), serta Hak Berpartisipasi dalam menyatakan pendapat.",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    readTime: "6 menit",
    author: "LBH Perlindungan Anak",
    date: "05 Juli 2026",
  },
  {
    id: "r4",
    title: "Mencegah Kekerasan Seksual: Kenali Batasan Tubuhmu",
    slug: "mencegah-kekerasan-seksual-batasan-tubuh",
    category: "kekerasan-seksual",
    synopsis:
      "Panduan praktis mengenal sentuhan aman, sentuhan tidak aman, serta cara berani berkata TIDAK.",
    content:
      "Tubuhmu adalah otoritas pribadimu. Kenali area sensitif (dada, alat kelamin, pantat) yang tidak boleh disentuh atau dilihat oleh orang lain tanpa alasan medis yang sah. Jika seseorang membuatmu merasa tidak nyaman atau memaksa melintasi batasanmu, katakan TIDAK dengan tegas, tinggalkan tempat, dan segera laporkan ke orang dewasa tepercaya atau tekan tombol SOS di web ini.",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    readTime: "8 menit",
    author: "BKKBN & Psikolog Remaja",
    date: "18 Juli 2026",
  },
  {
    id: "r5",
    title: "Menjaga Kesehatan Mental di Era Digital",
    slug: "menjaga-kesehatan-mental-era-digital",
    category: "kesehatan-mental",
    synopsis:
      "Tips menghadapi kecemasan akademik, cyberbullying, dan menjaga self-esteem dari paparan media sosial.",
    content:
      "Media sosial sering kali menampilkan versi kehidupan orang lain yang telah disaring, memicu sindrom FOMO dan rasa tidak aman. Kesehatan mental remaja sangat dipengaruhi oleh persepsi diri. Batasi screen time, lakukan aktivitas fisik, dan ingatlah bahwa tidak apa-apa jika merasa lelah. Meminta pertolongan konseling adalah tanda kekuatan, bukan kelemahan.",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    readTime: "5 menit",
    author: "Siti Aminah, M.Psi",
    date: "25 Juli 2026",
  },
];

// 3. ARTICLES & VIDEOS
export const mediaItems: MediaItem[] = [
  {
    id: "m1",
    title: "5 Cara Remaja Aktif Mencegah Pernikahan Anak di Sekolah",
    slug: "5-cara-remaja-aktif-mencegah-pernikahan-anak",
    type: "article",
    category: "edukasi",
    tags: ["Pernikahan Anak", "Advokasi", "Siswa"],
    content:
      "Sebagai remaja, kita memiliki kekuatan suara yang luar biasa. Berikut adalah cara konkrit kita dapat berpartisipasi: 1. Membuat forum diskusi sebaya. 2. Membagikan konten edukatif di sosial media. 3. Melaporkan indikasi perkawinan anak paksa ke guru BK. 4. Menjadi pendengar aktif untuk teman yang sedang stres. 5. Mendukung kampanye program SIGMA.",
    mediaUrl:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    readTime: "4 menit",
    author: "Rian Hidayat (Kader)",
    date: "28 Juli 2026",
  },
  {
    id: "m2",
    title: "Video: Apa itu Kesehatan Reproduksi Remaja (KRR)?",
    slug: "video-apa-itu-kesehatan-reproduksi-remaja",
    type: "video",
    category: "umum",
    tags: ["Reproduksi", "Video Edukasi", "BKKBN"],
    content:
      "Video animasi menarik yang menjelaskan pentingnya menjaga kebersihan organ reproduksi, memahami konsekuensi perilaku seksual berisiko, serta hak perlindungan kesehatan bagi seluruh siswa sekolah menengah.",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    duration: "4:32",
    author: "BKKBN RI",
    date: "15 Juni 2026",
  },
  {
    id: "m3",
    title: "Mengatasi Depresi & Stres Akademik Sebelum Ujian",
    slug: "mengatasi-depresi-stres-akademik-sebelum-ujian",
    type: "article",
    category: "edukasi",
    tags: ["Mental Health", "Tips Belajar", "Remaja"],
    content:
      "Stres menjelang ujian nasional sangat umum terjadi. Namun jika dibiarkan, stres dapat berubah menjadi depresi ringan. Artikel ini merangkum teknik pernapasan kotak (box breathing), manajemen waktu belajar yang sehat, serta pentingnya tidur 8 jam untuk menjaga kesehatan sel otak selama periode belajar intensif.",
    mediaUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    readTime: "5 menit",
    author: "Lia Lestari, Psi",
    date: "30 Juli 2026",
  },
  {
    id: "m4",
    title: "Dokumentasi Kampanye Anti Kekerasan Seksual 2026",
    slug: "video-kampanye-anti-kekerasan-seksual-2026",
    type: "video",
    category: "berita",
    tags: ["Kampanye", "Kekerasan Seksual", "GARUDA"],
    content:
      "Tonton rangkuman video aksi damai dan orasi edukatif yang diselenggarakan oleh Kader GARUDA SIGMA di alun-alun kota untuk menyuarakan perlindungan anak dari predator seksual.",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "5:15",
    author: "Tim Media GARUDA",
    date: "22 Juli 2026",
  },
];

// 4. USER GENERATED CONTENT
export const ugcItems: UgcItem[] = [
  {
    id: "u1",
    title: "Poster: Masa Depan Gemilang Tanpa Pernikahan Dini",
    description:
      "Desain poster digital yang menggambarkan perbedaan jalan hidup antara melanjutkan sekolah vs menikah di usia anak.",
    mediaUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    creatorName: "Ahmad Fauzi",
    school: "SMA Negeri 1 Harapan",
    type: "poster",
    likes: 142,
  },
  {
    id: "u2",
    title: "Infografis: 5 Bahaya Kehamilan Usia Remaja bagi Ibu & Bayi",
    description:
      "Infografis sederhana namun padat informasi tentang risiko preeklampsia, bayi lahir prematur, dan robekan jalan lahir.",
    mediaUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
    creatorName: "Sarah Salsabila",
    school: "SMK Kesehatan Mandiri",
    type: "infografis",
    likes: 98,
  },
  {
    id: "u3",
    title: "Poster Campaign: My Body is My Own!",
    description:
      "Karya seni bertema integritas tubuh dan hak anak untuk menolak sentuhan yang tidak pantas dari siapapun.",
    mediaUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    creatorName: "Dinda Kirana",
    school: "MA Miftahul Ulum",
    type: "poster",
    likes: 215,
  },
];

// 5. EVENTS
export const eventItems: EventItem[] = [
  {
    id: "e1",
    title: "Workshop Edukasi Seksualitas & Pencegahan Nikah Dini",
    description:
      "Kegiatan edukasi interaktif yang diikuti oleh 120 siswa perwakilan OSIS se-kabupaten. Menghadirkan pembicara dari BKKBN dan Dinas Pemberdayaan Perempuan & Perlindungan Anak.",
    date: "14 Mei 2026",
    location: "Aula SMKN 2 Kabupaten Aman",
    images: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 120,
    week: 1,
  },
  {
    id: "e2",
    title: "Orientasi Kader Sebaya & Pemetaan Masalah Remaja",
    description:
      "Sesi pengenalan peran konselor sebaya GARUDA, pemetaan risiko perkawinan usia anak, dan membangun komitmen bersama para siswa.",
    date: "18 Mei 2026",
    location: "SMPN 4 Sumberjambe",
    images: [
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 45,
    week: 1,
  },
  {
    id: "e3",
    title: "Training of Trainer (ToT) Konseling Ramah Remaja",
    description:
      "Pelatihan intensif untuk mencetak konselor sebaya baru yang mampu mendeteksi dini kekerasan seksual dan merujuk teman sebaya ke guru BK.",
    date: "25 Mei 2026",
    location: "Pusat Diklat Kencana",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 30,
    week: 2,
  },
  {
    id: "e4",
    title: "Focus Group Discussion (FGD) Hak-Hak Dasar Anak",
    description:
      "Diskusi terarah bersama perwakilan guru BK dan orang tua murid mengenai hak perlindungan anak dan bahaya dispensasi kawin dini.",
    date: "02 Juni 2026",
    location: "Balai Desa Sukamaju",
    images: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 60,
    week: 2,
  },
  {
    id: "e5",
    title: "Sosialisasi Modul Repropedia & Batasan Diri Remaja",
    description:
      "Pengenalan buku pedoman Repropedia kepada seluruh siswa kelas 7 & 8, panduan higienitas reproduksi, dan pemahaman consent.",
    date: "09 Juni 2026",
    location: "Lapangan Serbaguna SMPN 1",
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 150,
    week: 3,
  },
  {
    id: "e6",
    title: "Simulasi Roleplay Pendampingan Konseling Sebaya",
    description:
      "Praktik langsung kader dalam mendengarkan aktif curhat teman sebaya tanpa menghakimi dan simulasi rujukan darurat ke puskesmas.",
    date: "16 Juni 2026",
    location: "Ruang Kolaborasi Remaja",
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 25,
    week: 3,
  },
  {
    id: "e7",
    title: "Kampanye Kreatif: Lomba Poster & Video Pencegahan Kekerasan",
    description:
      "Pameran karya seni poster dan pemutaran video edukasi karya siswa untuk menyuarakan stop perkawinan anak dan anti cyberbullying.",
    date: "23 Juni 2026",
    location: "Gedung Kesenian Daerah",
    images: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 200,
    week: 4,
  },
  {
    id: "e8",
    title: "Audiensi Advokasi Perlindungan Anak dengan Pemangku Adat",
    description:
      "Dialog terbuka bersama tokoh adat dan aparat desa untuk memperkuat kesepakatan penolakan dispensasi perkawinan anak di desa binaan.",
    date: "01 Juli 2026",
    location: "Kantor Kecamatan Sumberjambe",
    images: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 40,
    week: 5,
  },
  {
    id: "e9",
    title: "Festival SIGMA & Penobatan Duta Konselor Garuda 2026",
    description:
      "Puncak rangkaian program SIGMA, penyerahan apresiasi kepada 15 kader konselor berprestasi, dan deklarasi komitmen sekolah bebas kekerasan.",
    date: "10 Juli 2026",
    location: "Auditorium Utama Universitas",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    ],
    attendees: 350,
    week: 6,
  },
];

// 6. COUNSELING DIRECTORY
export const counselingDirectory: Counselor[] = [
  {
    id: "c1",
    name: "Rian Hidayat",
    role: "Kader GARUDA",
    whatsappNumber: "+6281234567890",
    operationalHours: "Senin - Sabtu, 13:00 - 18:00 WIB",
  },
  {
    id: "c2",
    name: "Siti Rahma, S.Pd",
    role: "Guru BK",
    whatsappNumber: "+6289876543210",
    operationalHours: "Hari Sekolah, 07:00 - 15:00 WIB",
    locationName: "Ruang BK SMA Negeri 1 Harapan",
  },
  {
    id: "c3",
    name: "Unit KIA & KB Puskesmas Sehat",
    role: "Puskesmas",
    whatsappNumber: "+628555123456",
    operationalHours: "Setiap Hari Kerja, 08:00 - 12:00 WIB",
    locationName: "Jl. Puskesmas No. 12, Kec. Sehat",
    locationMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507028!3d-6.194657195493392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f417f7d6a5d1%3A0xc3f17d3b5b1df639!2sGrand%20Indonesia!5e0!3m2!1sid!2sid!4v1628151234567!5m2!1sid!2sid",
  },
  {
    id: "c4",
    name: "Lia Lestari, M.Psi",
    role: "Psikolog",
    whatsappNumber: "+6289999111222",
    operationalHours: "Dengan Perjanjian (Rujukan BK)",
    locationName: "Klinik Harapan Jiwa, Kota Aman",
  },
];

// 7. STATISTICS CASES (Aggregate, Child Marriage Case numbers per village)
export const statisticsCases: StatRecord[] = [
  {
    year: 2022,
    "Desa Sukamaju": 12,
    "Desa Harapan": 8,
    "Desa Mekarjaya": 15,
    "Desa Kertajaya": 9,
  },
  {
    year: 2023,
    "Desa Sukamaju": 10,
    "Desa Harapan": 6,
    "Desa Mekarjaya": 11,
    "Desa Kertajaya": 7,
  },
  {
    year: 2024,
    "Desa Sukamaju": 7,
    "Desa Harapan": 3,
    "Desa Mekarjaya": 8,
    "Desa Kertajaya": 4,
  },
  {
    year: 2025,
    "Desa Sukamaju": 4,
    "Desa Harapan": 1,
    "Desa Mekarjaya": 3,
    "Desa Kertajaya": 2,
  },
  {
    year: 2026,
    "Desa Sukamaju": 2,
    "Desa Harapan": 0,
    "Desa Mekarjaya": 1,
    "Desa Kertajaya": 0,
  },
];

// 8. QUIZ QUESTIONS
export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    category: "pubertas",
    questionText:
      "Manakah hormon utama yang memicu perkembangan fisik sekunder pada remaja perempuan selama masa pubertas?",
    options: [
      "Testosteron",
      "Estrogen dan Progesteron",
      "Adrenalin",
      "Melatonin",
    ],
    correctAnswer: 1,
    explanation:
      "Hormon estrogen dan progesteron diproduksi oleh indung telur (ovarium) perempuan saat pubertas dan memicu pembentukan payudara, pinggul, serta siklus menstruasi.",
  },
  {
    id: "q2",
    category: "pernikahan-anak",
    questionText:
      "Berapakah batas usia minimal untuk melangsungkan pernikahan baik bagi laki-laki maupun perempuan sesuai UU No. 16 Tahun 2019?",
    options: ["16 tahun", "17 tahun", "18 tahun", "19 tahun"],
    correctAnswer: 3,
    explanation:
      "Undang-Undang No. 16 Tahun 2019 menetapkan bahwa perkawinan hanya diizinkan apabila pria dan wanita sudah mencapai umur 19 tahun demi meminimalkan bahaya perkawinan anak.",
  },
  {
    id: "q3",
    category: "kekerasan-seksual",
    questionText:
      "Jika ada seseorang yang kamu kenal menyentuh area tubuh sensitifmu dan memintamu untuk merahasiakannya, tindakan terbaik apa yang harus segera kamu lakukan?",
    options: [
      "Diam saja karena takut dia marah",
      "Mematuhinya agar tidak terjadi keributan",
      "Menolak tegas, pergi, dan segera laporkan kepada orang tua, guru, atau kader kesehatan tepercaya",
      "Menunggu sampai dia mengulanginya baru melapor",
    ],
    correctAnswer: 2,
    explanation:
      "Area sensitif tubuhmu adalah hak pribadimu. Setiap sentuhan tidak nyaman atau rahasia yang mencurigakan wajib ditolak keras dan segera dilaporkan demi keselamatanmu.",
  },
  {
    id: "q4",
    category: "hak-anak",
    questionText:
      "Berikut ini adalah empat hak dasar anak berdasarkan Konvensi Hak Anak PBB, KECUALI...",
    options: [
      "Hak kelangsungan hidup",
      "Hak perlindungan",
      "Hak memiliki kekayaan pribadi",
      "Hak tumbuh kembang",
    ],
    correctAnswer: 2,
    explanation:
      "Empat hak dasar anak adalah hak kelangsungan hidup, hak tumbuh kembang, hak perlindungan, dan hak berpartisipasi. Memiliki kekayaan pribadi bukan salah satu hak dasar anak.",
  },
  {
    id: "q5",
    category: "kesehatan-mental",
    questionText:
      "Saat kamu merasa cemas berlebihan dan tertekan secara emosional karena cyberbullying, langkah awal yang paling bijak untuk self-care adalah...",
    options: [
      "Membalas pelaku dengan kata-kata kasar",
      "Menghapus media sosial sementara (digital detox), bercerita kepada sahabat/keluarga, atau menghubungi konselor sebaya SIGMA",
      "Menyimpan kesedihan sendirian di kamar",
      "Mencari pelarian dengan begadang semalaman bermain game",
    ],
    correctAnswer: 1,
    explanation:
      "Melakukan digital detox membantu menenangkan pikiran dari paparan intimidasi siber. Bercerita kepada pendengar tepercaya/konselor SIGMA memberikan dukungan emosional yang sehat.",
  },
];

// 9. ORGANIZATION MEMBERS (Badan Organisasi Kader GARUDA)
export const orgMembers: OrgMember[] = [
  {
    id: "o1",
    key: "pelindung",
    role: "Pelindung",
    name: "Bupati / Kepala Dinas Kesehatan",
    description:
      "Memberikan arahan kebijakan makro, legalitas hukum, dan dukungan finansial bagi keberlanjutan program SIGMA.",
    sortOrder: 1,
  },
  {
    id: "o2",
    key: "pembina",
    role: "Pembina Teknis",
    name: "Kepala Puskesmas & Kepala BK",
    description:
      "Membimbing substansi medis kesehatan reproduksi serta mengawasi protokol rujukan psikososial & medis siswa.",
    sortOrder: 2,
  },
  {
    id: "o3",
    key: "ketua",
    role: "Ketua Kader GARUDA",
    name: "Rian Hidayat",
    description:
      "Mengkoordinasi seluruh divisi, memantau rujukan aktif, serta memimpin forum advokasi pencegahan nikah dini di sekolah.",
    sortOrder: 3,
  },
  {
    id: "o4",
    key: "sekretaris",
    role: "Sekretaris",
    name: "Sarah Salsabila",
    description:
      "Mengelola persuratan, pendaftaran kuis/kegiatan, dokumentasi kasus anonim, dan administrasi umum.",
    sortOrder: 4,
  },
  {
    id: "o5",
    key: "bendahara",
    role: "Bendahara",
    name: "Ahmad Fauzi",
    description:
      "Menyusun rencana anggaran kegiatan workshop, mengelola dana kas operasional, dan membuat pelaporan keuangan.",
    sortOrder: 5,
  },
  {
    id: "o6",
    key: "div_edukasi",
    role: "Divisi Edukasi & Literasi",
    name: "Dinda Kirana & Tim",
    description:
      "Menyusun modul Repropedia, menyunting artikel/video edukatif, serta menyelenggarakan mini kuis kesehatan reproduksi.",
    sortOrder: 6,
  },
  {
    id: "o7",
    key: "div_konseling",
    role: "Divisi Pendampingan & Konseling",
    name: "Lia Lestari & Tim",
    description:
      "Menangani kontak awal SOS, memberikan konseling sebaya dasar yang aman & rahasia, serta merujuk ke BK/Puskesmas.",
    sortOrder: 7,
  },
];

// 10. ARTICLES (TIPTAP FORMAT)
export const initialArticles: ArticleItem[] = [
  {
    id: "art-1",
    title: "Mengenal Kesehatan Reproduksi Remaja Secara Ilmiah & Menyeluruh",
    slug: "mengenal-kesehatan-reproduksi-remaja",
    subtitle:
      "Panduan komprehensif memahami perubahan fisik, psikologis, dan organ reproduksi saat memasuki masa pubertas tanpa rasa canggung.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Masa remaja merupakan fase transisi krusial dari masa anak-anak menuju kedewasaan. Selama periode ini, tubuh mengalami lonjakan hormon pertumbuhan yang memicu perubahan fisik, emosional, dan biologis yang signifikan.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "1. Mengapa Edukasi Reproduksi Itu Penting?",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Banyak remaja merasa tabu atau malu untuk menanyakan perubahan pada tubuh mereka. Akibatnya, banyak yang mencari informasi dari sumber yang keliru di internet atau teman sebaya yang belum tentu benar secara medis.",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Kesehatan reproduksi bukan sekadar tentang organ biologis, melainkan kondisi sehat secara fisik, mental, dan sosial dalam segala hal yang berkaitan dengan sistem dan fungsi reproduksi (WHO).",
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            {
              type: "text",
              text: "Langkah Sederhana Merawat Kebersihan Diri:",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Mengganti pakaian dalam minimal dua kali sehari dengan bahan katun yang menyerap keringat.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Membasuh organ genital dengan air bersih yang mengalir dari arah depan ke belakang.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Tidak menggunakan produk sabun pembersih berpewangi tajam yang dapat merusak pH alami.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "published",
    author: "dr. Siti Rahmawati, Sp.A",
    category: "Kesehatan Reproduksi",
    readTime: "4 Menit",
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T08:00:00.000Z",
  },
  {
    id: "art-2",
    title: "Batasan Tubuh (Consent) & Cara Berani Menolak Perlakuan Tidak Pantas",
    slug: "mengenal-batasan-tubuh-dan-consent",
    subtitle:
      "Kenali hak atas tubuhmu sendiri, tanda-tanda bahaya dalam pergaulan (red flags), serta nomor kontak darurat pendampingan.",
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Setiap anak dan remaja berhak atas rasa aman dan perlindungan dari segala bentuk perlakuan salah, kekerasan fisik, maupun non-fisik. Mengetahui batasan tubuh (body boundaries) adalah benteng pertahanan pertama setiap remaja.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Bagian Tubuh yang Bersifat Pribadi",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Secara umum, bagian tubuh yang tertutup pakaian renang (bibir, dada, area genital/antara paha, dan pantat) adalah area privat yang tidak boleh disentuh, difoto, atau dilihat oleh orang lain tanpa persetujuan medis resmi dengan didampingi orang tua.",
            },
          ],
        },
      ],
    },
    status: "published",
    author: "Tim Konselor SIGMA",
    category: "Pencegahan Kekerasan",
    readTime: "3 Menit",
    createdAt: "2026-03-05T09:30:00.000Z",
    updatedAt: "2026-03-05T09:30:00.000Z",
  },
];

