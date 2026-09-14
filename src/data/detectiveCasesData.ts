// Bank Kasus Detektif Informasi — SIGMA
// Setiap kasus mensimulasikan konten media sosial yang perlu diverifikasi

export type VerdictType = "trusted" | "check" | "misleading";
export type ClueType = "source" | "language" | "medical" | "legal" | "statistic";
export type Platform = "instagram" | "twitter" | "tiktok" | "whatsapp" | "facebook";

export interface DetectiveClue {
  type: ClueType;
  title: string;
  content: string;
}

export interface SocialPost {
  username: string;
  handle: string;
  caption: string;
  imageAlt?: string; // deskripsi gambar jika ada
  likes?: number;
  shares?: number;
}

export interface DetectiveCase {
  id: string;
  platform: Platform;
  post: SocialPost;
  correctVerdict: VerdictType;
  clues: [DetectiveClue, DetectiveClue, DetectiveClue]; // selalu 3 petunjuk
  conclusion: string; // penjelasan setelah verdict
  relatedTopic?: string;
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: "det-01",
    platform: "instagram",
    post: {
      username: "Info Sehat Remaja",
      handle: "@infosehatremaja",
      caption:
        "🚨 BAHAYA! Dokter di Jepang buktikan bahwa perempuan yang pakai pembalut merek X bisa kena kanker dalam 3 tahun! Ganti sekarang sebelum terlambat! Share ke semua temenmu! 😱🔴 #HealthAlert #BahayaPembalut",
      likes: 12400,
      shares: 8900,
    },
    correctVerdict: "misleading",
    clues: [
      {
        type: "source",
        title: "Cek sumbernya",
        content:
          "Tidak ada nama dokter, institusi, atau jurnal ilmiah yang disebutkan. Klaim 'dokter di Jepang' sangat samar—penelitian sahih selalu mencantumkan identitas dan afiliasi peneliti.",
      },
      {
        type: "language",
        title: "Perhatikan bahasanya",
        content:
          "Kata-kata seperti 'BAHAYA!', '🚨', dan 'Share ke semua temenmu!' adalah ciri khas konten yang sengaja memancing kepanikan. Informasi medis yang valid biasanya disampaikan dengan tenang dan terukur.",
      },
      {
        type: "medical",
        title: "Klaim medisnya masuk akal?",
        content:
          "Tidak ada bukti ilmiah yang menghubungkan merek pembalut tertentu dengan kanker. Kemenkes RI dan BPOM mengawasi produk ini. Jika benar berbahaya, produk sudah ditarik dari peredaran.",
      },
    ],
    conclusion:
      "Ini informasi menyesatkan (misleading). Tidak ada studi ilmiah yang mendukung klaim ini. Sebelum menyebarkan informasi kesehatan, cek ke situs Kemenkes atau BPOM. Kepanikan yang tidak perlu bisa merugikan banyak orang.",
    relatedTopic: "literasi-digital",
  },

  {
    id: "det-02",
    platform: "whatsapp",
    post: {
      username: "Pesan dari Grup 'Info Penting'",
      handle: "WhatsApp Group",
      caption:
        "Assalamu'alaikum. Info penting!! UU Pernikahan terbaru 2024 membolehkan pernikahan usia 15 tahun lagi dengan izin orang tua. Sudah disahkan DPR kemarin. Tolong disebarkan agar tidak ada yang salah paham. Mohon diteruskan 🙏",
      likes: 0,
      shares: 0,
    },
    correctVerdict: "misleading",
    clues: [
      {
        type: "legal",
        title: "Cek dasar hukumnya",
        content:
          "UU No. 16 Tahun 2019 masih berlaku dan menetapkan batas minimum 19 tahun untuk menikah. Tidak ada undang-undang baru yang mengubah ini. Perubahan UU adalah proses panjang yang bisa dilacak di situs resmi DPR.",
      },
      {
        type: "source",
        title: "Siapa yang bilang?",
        content:
          "Pesan berantai WhatsApp tanpa nama, tanpa link berita resmi, dan tanpa nomor peraturan yang bisa dicek adalah tanda pertama hoaks. Sumber yang valid selalu bisa diverifikasi.",
      },
      {
        type: "language",
        title: "Urgensi palsu",
        content:
          "'Tolong disebarkan', 'mohon diteruskan'—frasa ini sengaja dipakai untuk menyebarkan informasi sebelum orang sempat berpikir kritis. Semakin mendesak pesannya, semakin kamu perlu hati-hati.",
      },
    ],
    conclusion:
      "Ini hoaks. UU Perkawinan yang berlaku tetap UU No. 16 Tahun 2019 dengan batas usia 19 tahun. Sebelum meneruskan pesan berantai hukum, selalu cek di situs resmi DPR (dpr.go.id) atau Kemenkumham.",
    relatedTopic: "pernikahan-anak",
  },

  {
    id: "det-03",
    platform: "tiktok",
    post: {
      username: "dr. Rina Pratiwi, Sp.OG",
      handle: "@drrinaobgyn",
      caption:
        "Buat kamu yang lagi remaja: siklus haid tidak teratur di 2 tahun pertama setelah menstruasi pertama adalah hal yang NORMAL. Tubuhmu masih menyesuaikan diri. Tapi kalau tidak teratur setelah 2 tahun atau disertai nyeri luar biasa, konsultasikan ke dokter ya 💙 #KesehatanRemaja #EdukasiBerhak",
      imageAlt: "Dokter perempuan berjas putih berbicara di depan kamera",
      likes: 45200,
      shares: 12100,
    },
    correctVerdict: "trusted",
    clues: [
      {
        type: "source",
        title: "Sumber yang bisa diverifikasi",
        content:
          "Akun ini mencantumkan nama lengkap dan gelar spesialis kandungan (Sp.OG). Gelar dokter spesialis bisa diverifikasi melalui website IDI (Ikatan Dokter Indonesia).",
      },
      {
        type: "medical",
        title: "Klaim medisnya valid?",
        content:
          "Benar secara medis. WHO dan berbagai pedoman ginekologi menyatakan bahwa siklus haid remaja memang belum teratur pada 1–2 tahun pertama. Ini bukan konten yang melebih-lebihkan.",
      },
      {
        type: "language",
        title: "Nada informasinya",
        content:
          "Tidak ada kepanikan, tidak ada produk yang dijual, dan ada anjuran konsultasi dokter yang bertanggung jawab. Konten edukatif yang baik mendorong profesional, bukan menggantikannya.",
      },
    ],
    conclusion:
      "Informasi ini terpercaya. Siklus haid tidak teratur di awal menstruasi pertama memang normal. Ini adalah contoh konten edukasi kesehatan yang baik—berdasarkan fakta, dari sumber yang bisa diverifikasi, dan mendorong konsultasi profesional.",
    relatedTopic: "kesehatan-reproduksi",
  },

  {
    id: "det-04",
    platform: "facebook",
    post: {
      username: "Komunitas Orang Tua Peduli",
      handle: "Komunitas Facebook",
      caption:
        "Menurut penelitian baru dari Universitas Harvard, remaja yang aktif di media sosial lebih dari 2 jam/hari memiliki risiko depresi 70% lebih tinggi. Batasi screen time anak kalian sekarang! 📵 Sumber: Harvard Health, 2023",
      likes: 3200,
      shares: 1800,
    },
    correctVerdict: "check",
    clues: [
      {
        type: "statistic",
        title: "Angka 70% dari mana?",
        content:
          "Memang ada penelitian Harvard tentang media sosial dan kesehatan mental remaja, tapi angka '70%' ini tidak ditemukan dalam studi utamanya. Angka spesifik sering dilebih-lebihkan saat konten dibagikan ulang.",
      },
      {
        type: "source",
        title: "Sumbernya ada, tapi...",
        content:
          "Menyebut 'Harvard Health, 2023' terdengar kredibel, tapi tanpa link langsung ke artikel aslinya, sulit diverifikasi. Laporan asli Harvard lebih bernuansa—hubungan media sosial dan depresi kompleks, tidak sesederhana '2 jam = berbahaya'.",
      },
      {
        type: "medical",
        title: "Korelasi vs. kausalitas",
        content:
          "Studi menunjukkan ada korelasi antara screen time berlebih dan risiko depresi, tapi bukan kausalitas langsung. Anak yang sudah rentan secara mental mungkin menghabiskan lebih banyak waktu di media sosial—bukan sebaliknya.",
      },
    ],
    conclusion:
      "Perlu dicek lebih lanjut. Inti pesannya ada benarnya—screen time berlebih memang terkait risiko kesehatan mental—tapi angka '70%' dan penyederhanaannya perlu dikritisi. Baca langsung sumber asli sebelum berbagi statistik spesifik.",
    relatedTopic: "literasi-digital",
  },

  {
    id: "det-05",
    platform: "instagram",
    post: {
      username: "KPAI Official",
      handle: "@kpai.official",
      caption:
        "📊 Data terbaru KPAI 2024: Indonesia masih termasuk negara dengan angka pernikahan anak tertinggi ke-8 di dunia dan ke-2 di ASEAN. Bersama kita bisa putus rantai ini! Dukung hak pendidikan anak perempuan 💪 #StopPernikahanAnak #HakAnak",
      imageAlt: "Infografis data pernikahan anak KPAI dengan logo resmi",
      likes: 8900,
      shares: 4300,
    },
    correctVerdict: "trusted",
    clues: [
      {
        type: "source",
        title: "Akun resmi lembaga negara",
        content:
          "KPAI (Komisi Perlindungan Anak Indonesia) adalah lembaga negara resmi. Akun @kpai.official dapat diverifikasi di situs kpai.go.id. Data yang mereka publikasikan bersumber dari laporan resmi.",
      },
      {
        type: "statistic",
        title: "Datanya bisa dicek silang",
        content:
          "Peringkat ini konsisten dengan data UNICEF dan laporan Bank Dunia. Indonesia memang masuk dalam daftar negara dengan pernikahan anak tertinggi di Asia Tenggara.",
      },
      {
        type: "language",
        title: "Tujuan komunikasinya jelas",
        content:
          "Postingan ini mendorong tindakan positif (mendukung hak pendidikan), bukan memancing kepanikan. Tidak ada produk yang dijual, tidak ada link mencurigakan.",
      },
    ],
    conclusion:
      "Informasi ini terpercaya dan datanya dapat diverifikasi. Indonesia memang memiliki tantangan besar dalam mengatasi pernikahan anak. KPAI adalah sumber yang dapat dipercaya untuk data ini. Bantu sebarkan kesadaran—tapi dari sumber yang benar.",
    relatedTopic: "pernikahan-anak",
  },
];
