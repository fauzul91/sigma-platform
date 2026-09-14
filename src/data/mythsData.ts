// Bank soal Mitos atau Fakta — SIGMA
// Kategori: Pubertas | Relasi | Pernikahan Anak | Literasi Digital

export type MythCategory = "pubertas" | "relasi" | "pernikahan-anak" | "literasi-digital";
export type MythDifficulty = "mudah" | "sedang" | "sulit";
export type MythAnswer = "myth" | "fact";

export interface MythItem {
  id: string;
  statement: string;
  answer: MythAnswer;
  category: MythCategory;
  explanation: string;
  relatedTopic?: string; // slug Repropedia atau artikel terkait
  difficulty: MythDifficulty;
}

export const MYTHS_DATA: MythItem[] = [
  // ── PUBERTAS ──────────────────────────────────────────────────────────────
  {
    id: "pub-01",
    statement: "Saat haid, perempuan tidak boleh berolahraga karena bisa memperparah nyeri.",
    answer: "myth",
    category: "pubertas",
    explanation:
      "Olahraga ringan seperti berjalan kaki atau yoga justru dapat membantu meredakan kram dan meningkatkan suasana hati saat haid. Hormon endorfin yang dilepas saat olahraga bersifat pereda nyeri alami.",
    relatedTopic: "kesehatan-reproduksi",
    difficulty: "mudah",
  },
  {
    id: "pub-02",
    statement: "Mimpi basah hanya dialami oleh laki-laki.",
    answer: "myth",
    category: "pubertas",
    explanation:
      "Perempuan juga bisa mengalami mimpi yang disertai sensasi orgasme saat tidur. Ini adalah respons fisiologis normal pada semua jenis kelamin.",
    relatedTopic: "kesehatan-reproduksi",
    difficulty: "sedang",
  },
  {
    id: "pub-03",
    statement: "Jerawat saat remaja disebabkan oleh perubahan hormon yang normal terjadi selama pubertas.",
    answer: "fact",
    category: "pubertas",
    explanation:
      "Benar. Lonjakan hormon androgen selama pubertas merangsang kelenjar minyak di kulit, sehingga pori-pori lebih mudah tersumbat dan memicu jerawat.",
    difficulty: "mudah",
  },
  {
    id: "pub-04",
    statement: "Perempuan yang payudaranya belum berkembang di usia 13 tahun pasti mengalami gangguan kesehatan.",
    answer: "myth",
    category: "pubertas",
    explanation:
      "Usia awal pubertas sangat bervariasi—bisa dimulai antara 8 hingga 13 tahun. Keterlambatan sedikit masih dalam rentang normal dan tidak selalu menandai gangguan kesehatan.",
    difficulty: "sedang",
  },
  {
    id: "pub-05",
    statement: "Mencuci rambut saat haid tidak memengaruhi siklus menstruasi.",
    answer: "fact",
    category: "pubertas",
    explanation:
      "Ini fakta. Keramas saat haid aman sepenuhnya dan tidak ada bukti ilmiah bahwa itu mempengaruhi siklus menstruasi. Mitos ini beredar di banyak budaya tanpa dasar medis.",
    relatedTopic: "kesehatan-reproduksi",
    difficulty: "mudah",
  },
  {
    id: "pub-06",
    statement: "Laki-laki tidak mengalami perubahan emosi yang signifikan selama pubertas.",
    answer: "myth",
    category: "pubertas",
    explanation:
      "Laki-laki juga mengalami perubahan emosi besar selama pubertas akibat fluktuasi testosteron. Mudah marah, moodswing, dan rasa tidak percaya diri adalah hal yang umum dan normal.",
    difficulty: "sedang",
  },

  // ── RELASI ────────────────────────────────────────────────────────────────
  {
    id: "rel-01",
    statement: "Cemburu berlebihan dalam hubungan adalah tanda cinta yang tulus.",
    answer: "myth",
    category: "relasi",
    explanation:
      "Cemburu berlebihan bisa menjadi tanda hubungan yang tidak sehat (controlling relationship). Cinta yang sehat dibangun di atas kepercayaan, bukan rasa takut kehilangan yang obsesif.",
    relatedTopic: "relasi-sehat",
    difficulty: "mudah",
  },
  {
    id: "rel-02",
    statement: "Memaksa pasangan untuk membagikan kata sandi akun media sosial adalah bentuk kekerasan.",
    answer: "fact",
    category: "relasi",
    explanation:
      "Benar. Ini termasuk kekerasan berbasis gender secara digital (KBGO). Setiap orang berhak atas privasi digital dalam hubungan apa pun.",
    relatedTopic: "literasi-digital",
    difficulty: "sedang",
  },
  {
    id: "rel-03",
    statement: "Dalam hubungan yang sehat, kedua belah pihak boleh tetap memiliki teman dan kehidupan di luar hubungan.",
    answer: "fact",
    category: "relasi",
    explanation:
      "Benar. Hubungan sehat tidak membatasi pergaulan. Memiliki kehidupan sosial dan minat mandiri justru membuat hubungan lebih kuat dan tidak kodependen.",
    relatedTopic: "relasi-sehat",
    difficulty: "mudah",
  },
  {
    id: "rel-04",
    statement: "Jika seseorang tidak mengucapkan \"tidak\", itu berarti mereka setuju.",
    answer: "myth",
    category: "relasi",
    explanation:
      "Persetujuan (consent) harus aktif, jelas, dan sadar. Diam, membekukan diri, atau tidak menolak bukan berarti setuju. Hanya \"ya\" yang berarti ya.",
    relatedTopic: "relasi-sehat",
    difficulty: "sedang",
  },
  {
    id: "rel-05",
    statement: "Seseorang yang sudah pernah pacaran otomatis siap untuk menikah.",
    answer: "myth",
    category: "relasi",
    explanation:
      "Kesiapan menikah mencakup banyak aspek—emosional, finansial, fisik, dan sosial. Pengalaman berpacaran tidak menjamin kesiapan tersebut.",
    difficulty: "sedang",
  },

  // ── PERNIKAHAN ANAK ───────────────────────────────────────────────────────
  {
    id: "pna-01",
    statement: "Menikah di usia remaja tidak memengaruhi kesehatan perempuan.",
    answer: "myth",
    category: "pernikahan-anak",
    explanation:
      "Data WHO menunjukkan komplikasi kehamilan adalah penyebab kematian terbesar pada perempuan usia 15–19 tahun. Tubuh yang belum matang berisiko tinggi mengalami fistula obstetrik dan komplikasi persalinan.",
    relatedTopic: "pernikahan-anak",
    difficulty: "mudah",
  },
  {
    id: "pna-02",
    statement: "Di Indonesia, batas usia minimum menikah adalah 19 tahun untuk laki-laki dan perempuan.",
    answer: "fact",
    category: "pernikahan-anak",
    explanation:
      "Benar. UU No. 16 Tahun 2019 tentang Perkawinan menetapkan batas usia minimum menikah adalah 19 tahun bagi keduanya, naik dari sebelumnya 16 tahun untuk perempuan.",
    relatedTopic: "pernikahan-anak",
    difficulty: "mudah",
  },
  {
    id: "pna-03",
    statement: "Pernikahan anak selalu terjadi karena keinginan kedua pihak.",
    answer: "myth",
    category: "pernikahan-anak",
    explanation:
      "Banyak pernikahan anak terjadi akibat tekanan ekonomi keluarga, adat, atau paksaan. Anak di bawah umur belum memiliki kapasitas hukum dan psikologis untuk memberikan persetujuan penuh.",
    relatedTopic: "pernikahan-anak",
    difficulty: "sedang",
  },
  {
    id: "pna-04",
    statement: "Anak perempuan yang menikah dini lebih kecil kemungkinannya untuk melanjutkan pendidikan.",
    answer: "fact",
    category: "pernikahan-anak",
    explanation:
      "Data UNICEF menunjukkan bahwa pernikahan dini adalah salah satu penyebab utama anak perempuan putus sekolah, sehingga memutus rantai pemberdayaan jangka panjang mereka.",
    relatedTopic: "pernikahan-anak",
    difficulty: "mudah",
  },
  {
    id: "pna-05",
    statement: "Menikahkan anak di bawah umur dengan alasan ekonomi sudah tidak dapat diproses secara hukum.",
    answer: "myth",
    category: "pernikahan-anak",
    explanation:
      "Pernikahan anak tetap dapat dilaporkan dan diproses secara hukum. Namun, ada celah berupa 'dispensasi kawin' dari pengadilan yang masih sering digunakan. Advokasi terus dilakukan untuk menutup celah ini.",
    relatedTopic: "pernikahan-anak",
    difficulty: "sulit",
  },
  {
    id: "pna-06",
    statement: "Anak laki-laki yang menikah di usia dini tidak terdampak secara psikologis.",
    answer: "myth",
    category: "pernikahan-anak",
    explanation:
      "Pernikahan dini juga berdampak pada anak laki-laki—tekanan ekonomi dini, terputusnya pendidikan, dan kematangan psikologis yang belum memadai adalah risiko nyata bagi keduanya.",
    relatedTopic: "pernikahan-anak",
    difficulty: "sedang",
  },

  // ── LITERASI DIGITAL ──────────────────────────────────────────────────────
  {
    id: "lid-01",
    statement: "Informasi kesehatan yang viral di media sosial sudah pasti benar.",
    answer: "myth",
    category: "literasi-digital",
    explanation:
      "Jumlah likes atau shares tidak menjamin kebenaran informasi. Selalu cek ke sumber resmi seperti Kemenkes, WHO, atau Ikatan Dokter Indonesia sebelum mempercayai dan menyebarkan informasi kesehatan.",
    relatedTopic: "literasi-digital",
    difficulty: "mudah",
  },
  {
    id: "lid-02",
    statement: "Menyebarkan foto atau video intim seseorang tanpa izin adalah tindak pidana di Indonesia.",
    answer: "fact",
    category: "literasi-digital",
    explanation:
      "Benar. UU ITE dan UU TPKS (Tindak Pidana Kekerasan Seksual) melarang penyebaran konten intim tanpa persetujuan. Pelanggar bisa dipidana penjara dan denda.",
    relatedTopic: "literasi-digital",
    difficulty: "sedang",
  },
  {
    id: "lid-03",
    statement: "Akun anonim di internet bisa sepenuhnya menyembunyikan identitas asli kita.",
    answer: "myth",
    category: "literasi-digital",
    explanation:
      "Tidak ada anonimitas penuh di internet. Aktivitas online meninggalkan jejak digital (IP address, metadata, pola perilaku) yang dapat diidentifikasi oleh penyedia layanan dan penegak hukum.",
    relatedTopic: "literasi-digital",
    difficulty: "sedang",
  },
  {
    id: "lid-04",
    statement: "Grooming online adalah ketika orang dewasa membangun kepercayaan anak secara online untuk tujuan eksploitasi.",
    answer: "fact",
    category: "literasi-digital",
    explanation:
      "Benar. Grooming adalah proses manipulasi bertahap yang dilakukan predator untuk mendapatkan kepercayaan korban (dan keluarganya) sebelum melakukan eksploitasi seksual.",
    relatedTopic: "literasi-digital",
    difficulty: "mudah",
  },
  {
    id: "lid-05",
    statement: "Jika seseorang mengirim uang atau hadiah melalui internet, mereka pasti memiliki niat baik.",
    answer: "myth",
    category: "literasi-digital",
    explanation:
      "Pemberian uang atau hadiah secara online sering digunakan sebagai taktik grooming atau penipuan untuk membangun ketergantungan emosional sebelum meminta sesuatu yang berbahaya.",
    relatedTopic: "literasi-digital",
    difficulty: "mudah",
  },
  {
    id: "lid-06",
    statement: "Membagikan lokasi real-time di media sosial bisa membahayakan keselamatan diri.",
    answer: "fact",
    category: "literasi-digital",
    explanation:
      "Benar. Berbagi lokasi secara publik memungkinkan orang yang tidak dikenal mengetahui keberadaanmu, yang bisa dimanfaatkan oleh pelaku kejahatan atau stalker.",
    relatedTopic: "literasi-digital",
    difficulty: "mudah",
  },
];

/** Ambil soal acak, opsional filter per kategori */
export function getShuffledMyths(
  count = 10,
  category?: MythCategory
): MythItem[] {
  const pool = category
    ? MYTHS_DATA.filter((m) => m.category === category)
    : MYTHS_DATA;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
