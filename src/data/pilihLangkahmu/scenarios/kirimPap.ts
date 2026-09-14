import type { Scenario } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// KASUS 02: Tantangan Konten Viral
// Topik: Privasi Digital, Etika Media Sosial & Mengatasi Cyberbullying
// Format: 5 Langkah Keputusan Terarah (Converging Branches, 100% Aman & Relatable)
// ─────────────────────────────────────────────────────────────────────────────

export const kirimPap: Scenario = {
  id: "kirim-pap",
  number: 2,
  title: "Tantangan Konten Viral",
  subtitle: "Ketika teman mendesak menyebarkan rahasia pribadi demi likes dan FYP",
  topic: "Privasi Digital & Etika Media Sosial",
  duration: "3–4 menit",
  coverImage: "/assets/characters/bagas.jpg",
  icon: "📱",
  accentColor: "sky",
  startSceneId: "step_1",
  isReady: true,
  scenes: {
    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 1: Ajakan di Grup WhatsApp
    // ═════════════════════════════════════════════════════════════════════════
    step_1: {
      id: "step_1",
      stepNumber: 1,
      situationContext:
        "Malam hari pukul 20.00. Notifikasi grup WhatsApp kelasmu berbunyi bertubi-tubi. Bagas, teman sekelas yang gemar membuat konten video, mengirim pesan mengejutkan.",
      messages: [
        {
          id: "s1_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Ponselmu terus bergetar di atas meja belajar. Obrolan grup kelas sedang ramai membicarakan ide konten baru.",
        },
        {
          id: "s1_m2",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "{name}! Tadi siang kamu sempat rekam voice note curhatnya si Rian pas dia lagi nangis di pojok kelas kan? Bagi filenya dong!",
        },
        {
          id: "s1_m3",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Gue mau edit pakai sound sedih terus upload di TikTok kelas. Sumpah ini pasti viral dan FYP banyak yang nonton!",
        },
        {
          id: "s1_m4",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu terdiam. Rian menceritakan masalah keluarganya padamu karena dia percaya padamu, bukan untuk dijadikan konsumsi publik.",
        },
      ],
      choices: [
        {
          id: "c1_a",
          text: "\"Nggak mau, Bas. Rian cerita ke aku karena percaya. Jangan jadikan kesedihan orang bahan konten.\"",
          consequence: "Kamu menolak tegas dan membela privasi temanmu.",
          nextSceneId: "step_2_direct",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c1_b",
          text: "\"Bas, kalau posisi kamu yang lagi sedih terus disebar ke medsos, kamu bakal nyaman nggak?\"",
          consequence: "Kamu mengajak Bagas memikirkan empati dari sudut pandang korban.",
          nextSceneId: "step_2_empathy",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c1_c",
          text: "\"Aduh, rekamannya udah kehapus di HP-ku...\" (Mencari alasan agar tidak berdebat)",
          consequence: "Kamu berbohong untuk menghindari konfrontasi langsung di grup.",
          nextSceneId: "step_2_excuse",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 2: Menghadapi Tekanan & Ejekan di Grup
    // ═════════════════════════════════════════════════════════════════════════
    step_2_direct: {
      id: "step_2_direct",
      stepNumber: 2,
      situationContext: "Kamu menolak permintaan Bagas di grup.",
      messages: [
        {
          id: "s2d_m1",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Yaelah {name}, baperan banget lu! Kan cuma buat seru-seruan doang, nggak usah dibawa serius kali.",
        },
        {
          id: "s2d_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Dua orang teman lainnya ikut mengirim stiker tertawa dan mengetik: 'Iya nih {name}, lebay amat, kan biar kelas kita viral.'",
        },
        {
          id: "s2d_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu merasa tidak nyaman berada di tengah tekanan kelompok (peer pressure) yang menganggap privasi orang sebagai lelucon.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Bercanda itu kalau semua orang ikut ketawa, Bas. Kalau ada yang dipermalukan, itu namanya perundungan digital.\"",
          consequence: "Kamu mengedukasi teman-temanmu tentang batasan cyberbullying.",
          nextSceneId: "step_3",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c2_b",
          text: "Keluar sementara dari grup WhatsApp dan langsung mengirim pesan dukungan ke Rian.",
          consequence: "Kamu memilih memberi perlindungan emosional langsung kepada korban.",
          nextSceneId: "step_3",
          reflectionKey: "seek_support",
        },
      ],
    },

    step_2_empathy: {
      id: "step_2_empathy",
      stepNumber: 2,
      situationContext: "Kamu mengajak Bagas berefleksi tentang empati.",
      messages: [
        {
          id: "s2e_m1",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Ya beda lah! Gue kan kuat mental, nggak cengeng kayak si Rian. Udah buruan kirim filenya!",
        },
        {
          id: "s2e_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Bagas tetap menyepelekan perasaan orang lain. Jelas bahwa ajakan halus belum cukup menyadarkannya.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Mau kuat atau nggak, menyebarkan privasi orang tanpa izin itu melanggar aturan dan UU ITE.\"",
          consequence: "Kamu menggunakan fakta aturan hukum untuk menegaskan batasan.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c2_b",
          text: "\"Terserah kamu mau bilang apa Bas, jawabanku tetap TIDAK.\"",
          consequence: "Kamu menutup perdebatan dengan penolakan final.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
      ],
    },

    step_2_excuse: {
      id: "step_2_excuse",
      stepNumber: 2,
      situationContext: "Kamu beralasan rekaman itu sudah terhapus.",
      messages: [
        {
          id: "s2x_m1",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Ah bohong lu, baru tadi siang kan lu rekam! Coba cek folder sampah atau WhatsApp backup lu sekarang.",
        },
        {
          id: "s2x_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Beralasan palsu ternyata tidak menghentikan desakan Bagas. Kamu sadar bahwa ketegasan sikap jauh lebih efektif daripada mengelak.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Jujur Bas, sebenarnya filenya ada, tapi aku nggak akan kasih karena itu hak privasi Rian.\"",
          consequence: "Kamu mengoreksi sikap dan menyatakan pendirian jujur.",
          nextSceneId: "step_3",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c2_b",
          text: "Mematikan koneksi internet ponsel dan tidur dengan rasa gelisah.",
          consequence: "Kamu menunda masalah yang sebenarnya belum selesai.",
          nextSceneId: "step_3",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 3: Ancaman Balasan di Sekolah
    // ═════════════════════════════════════════════════════════════════════════
    step_3: {
      id: "step_3",
      stepNumber: 3,
      situationContext:
        "Keesokan harinya di koridor sekolah. Saat jam istirahat, Bagas mencegat langkahmu di dekat loker dengan wajah kesal sambil mengacungkan ponselnya.",
      messages: [
        {
          id: "s3_m1",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Lu sok pahlawan banget ya semalem di grup! Nih liat, gue punya foto lu pas ketiduran di perpus sambil mangap. Lucu kan?",
        },
        {
          id: "s3_m2",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Kalau lu nggak mau bagi video Rian, foto aib lu ini yang bakal gue jadiin stiker WhatsApp kelas dan upload ke medsos. Gimana?",
        },
        {
          id: "s3_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Dada terasa sesak. Ini bukan sekadar candaan lagi, melainkan bentuk pemerasan digital (doxing dan intimidasi).",
        },
      ],
      choices: [
        {
          id: "c3_a",
          text: "\"Jangan coba-coba mengancam aku, Bas. Menyebarkan foto orang tanpa izin itu ada konsekuensi hukum dan tata tertib sekolah!\"",
          consequence: "Kamu tidak gentar menghadapi ancaman pemerasan.",
          nextSceneId: "step_4",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c3_b",
          text: "\"Bas, kamu sadar nggak tindakanmu ini bisa bikin kamu diskors dari sekolah?\"",
          consequence: "Kamu mengingatkan Bagas tentang risiko sanksi nyata yang akan dia hadapi.",
          nextSceneId: "step_4",
          reflectionKey: "reconsider",
        },
        {
          id: "c3_c",
          text: "Mundur beberapa langkah dengan panik dan hampir terpikir mengalah.",
          consequence: "Kamu merasa tertekan oleh ancaman Bagas.",
          nextSceneId: "step_4",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 4: Melibatkan Sahabat & Guru BK
    // ═════════════════════════════════════════════════════════════════════════
    step_4: {
      id: "step_4",
      stepNumber: 4,
      situationContext: "Dina melihat ketegangan dari kejauhan dan segera menghampirimu.",
      messages: [
        {
          id: "s4_m1",
          sender: "other",
          senderName: "Dina",
          characterId: "dina",
          characterImage: "/assets/characters/dina.jpg",
          text: "Hei! Ada apa ini ribut-ribut? Bagas, kamu ngapain todong-todong HP ke {name}?",
        },
        {
          id: "s4_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Bagas langsung memasukkan ponselnya ke saku dengan salah tingkah. Sementara dari kejauhan, Bu Sari Guru BK sedang berjalan melintasi koridor.",
        },
        {
          id: "s4_m3",
          sender: "other",
          senderName: "Dina",
          characterId: "dina",
          characterImage: "/assets/characters/dina.jpg",
          text: "{name}, jangan takut. Kalau Bagas ngancem kamu soal foto atau video, kita harus lapor ke Bu Sari sekarang juga.",
        },
      ],
      choices: [
        {
          id: "c4_a",
          text: "\"Ayo Din, kita laporkan ke Bu Sari sekarang. Tindakan Bagas sudah melewati batas kenyamanan dan privasi.\"",
          consequence: "Kamu memilih menyelesaikan masalah lewat jalur bimbingan konseling yang adil.",
          nextSceneId: "step_5",
          reflectionKey: "seek_support",
        },
        {
          id: "c4_b",
          text: "\"Bas, aku kasih kamu satu kesempatan: hapus foto itu sekarang di depan kami, dan jangan pernah usik privasi Rian lagi.\"",
          consequence: "Kamu memberikan ultimatum tegas sebelum mengambil jalur pelaporan.",
          nextSceneId: "step_5",
          reflectionKey: "communicate_directly",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 5: Penyelesaian & Menegakkan Etika Digital
    // ═════════════════════════════════════════════════════════════════════════
    step_5: {
      id: "step_5",
      stepNumber: 5,
      situationContext:
        "Di ruang BK bersama Bu Sari. Bagas duduk tertunduk memegang ponselnya, sementara Rian juga turut dihadirkan dengan didampingi kamu dan Dina.",
      messages: [
        {
          id: "s5_m1",
          sender: "other",
          senderName: "Bu Sari",
          characterId: "bu_sari",
          characterImage: "/assets/characters/bu_sari.jpg",
          text: "Bagas, mengejar 'likes' dan konten viral tidak boleh mengorbankan martabat teman sendiri. Rekam jejak digital itu permanen dan bisa menghancurkan masa depan seseorang.",
        },
        {
          id: "s5_m2",
          sender: "other",
          senderName: "Bu Sari",
          characterId: "bu_sari",
          characterImage: "/assets/characters/bu_sari.jpg",
          text: "Ibu salut padamu, {name}. Kamu berani berdiri menjaga amanah temanmu meskipun sempat diancam.",
        },
        {
          id: "s5_m3",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Gue minta maaf ya, {name}, Rian... Gue beneran khilaf, cuma mikirin biar akun TikTok kelas rame. Fotonya udah gue hapus permanen barusan.",
        },
      ],
      choices: [
        {
          id: "c5_a",
          text: "\"Aku terima maafmu, Bas. Tapi tolong ingat: persetujuan (consent) dan privasi itu wajib dihormati, baik di dunia nyata maupun medsos.\"",
          consequence: "Kamu memaafkan dengan tetap menegaskan prinsip etika digital yang kuat.",
          nextSceneId: "ending_reflection",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c5_b",
          text: "\"Bu Sari, bolehkah di jam BK berikutnya kita adakan sesi edukasi etika bermedia sosial untuk seluruh kelas?\"",
          consequence: "Kamu mengubah pengalaman ini menjadi momentum edukasi positif bagi banyak orang.",
          nextSceneId: "ending_reflection",
          reflectionKey: "protect_boundary",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // ENDING
    // ═════════════════════════════════════════════════════════════════════════
    ending_reflection: {
      id: "ending_reflection",
      stepNumber: 5,
      situationContext: "Suasana ruang BK menjadi hangat dan penuh pembelajaran berharga.",
      isEnding: true,
      messages: [
        {
          id: "end_m1",
          sender: "other",
          senderName: "Bu Sari",
          characterId: "bu_sari",
          characterImage: "/assets/characters/bu_sari.jpg",
          text: "Ide yang luar biasa, {name}. Kita akan jadikan kelas ini pelopor literasi digital yang sehat di sekolah.",
        },
        {
          id: "end_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Rian menatapmu dengan senyum tulus dan membisikkan terima kasih. Menjaga batas privasi digital mungkin terasa sulit saat ditekan, tapi integritasmu telah menyelamatkan martabat seorang sahabat.",
        },
      ],
    },
  },

  reflections: {
    protect_boundary: {
      headline:
        "Dalam situasi tadi, kamu menunjukkan integritas kokoh dalam menjaga batas privasi dan tidak gentar menghadapi ancaman.",
      whatWasGood:
        "Kamu sadar bahwa persetujuan (consent) berlaku mutlak di ruang digital. Menolak konten pemerasan adalah tindakan yang sangat berani.",
      whatToTry:
        "Jadilah pelindung bagi teman-teman sebayamu. Banyak remaja menjadi korban cyberbullying karena tidak ada saksi yang berani bersuara seperti kamu.",
      coreReminder:
        "Rekam jejak digital bersifat abadi. Konten yang diunggah hanya butuh hitungan detik, tetapi dampaknya bisa bertahan seumur hidup.",
      repropediaChapter: {
        title: "Kesehatan Digital & Perlindungan Privasi Remaja",
        href: "/repropedia/kesehatan-digital",
      },
    },
    communicate_directly: {
      headline:
        "Dalam situasi tadi, kamu memilih mengedukasi dan mengajak pelaku melihat dari sudut pandang empati.",
      whatWasGood:
        "Kemampuanmu membedakan antara 'candaan sehat' dan 'pelecehan/perundungan digital' adalah literasi sosial yang sangat berharga.",
      whatToTry:
        "Pertahankan cara bertutur yang asertif namun tidak memancing permusuhan terbuka, sehingga orang lain terdorong untuk memperbaiki kesalahannya.",
      coreReminder:
        "Bercanda itu ketika semua orang tertawa. Jika ada satu orang yang merasa malu dan terluka, itu bukan lelucon.",
      repropediaChapter: {
        title: "Kesehatan Digital & Perlindungan Privasi Remaja",
        href: "/repropedia/kesehatan-digital",
      },
    },
    seek_support: {
      headline:
        "Dalam situasi tadi, kamu bijak melibatkan sahabat dan guru BK untuk menghentikan ancaman pemerasan.",
      whatWasGood:
        "Kamu tidak membiarkan dirimu terjebak sendirian dalam intimidasi digital. Menggunakan sistem pendukung sekolah adalah langkah paling tepat.",
      whatToTry:
        "Jika kamu atau temanmu mengalami doxing atau ancaman di medsos, selalu simpan tangkapan layar (screenshot) sebagai bukti sebelum melapor.",
      coreReminder:
        "Kamu tidak pernah sendirian menghadapi intimidasi online. Selalu ada guru, konselor, dan orang tua yang siap melindungimu.",
      repropediaChapter: {
        title: "Kesehatan Digital & Perlindungan Privasi Remaja",
        href: "/repropedia/kesehatan-digital",
      },
    },
    avoid_conflict: {
      headline:
        "Dalam situasi tadi, kamu sempat berhati-hati atau menghindar saat menghadapi tekanan kelompok yang agresif.",
      whatWasGood:
        "Menghindari pertengkaran frontal di ruang obrolan umum bisa mencegah eskalasi emosi yang tidak terkontrol.",
      whatToTry:
        "Belajar untuk menyatakan penolakan dengan tegas di awal. Mengelak dengan alasan palsu justru bisa membuat pelaku semakin penasaran.",
      coreReminder:
        "Berkata 'TIDAK' pada hal yang melanggar hak orang lain adalah hak dasarmu yang tidak perlu disertai rasa bersalah.",
      repropediaChapter: {
        title: "Kesehatan Digital & Perlindungan Privasi Remaja",
        href: "/repropedia/kesehatan-digital",
      },
    },
    reconsider: {
      headline:
        "Dalam situasi tadi, kamu menimbang dampak hukum dan tata tertib sebelum mengambil langkah lanjutan.",
      whatWasGood:
        "Memahami bahwa dunia maya memiliki konsekuensi hukum nyata (seperti UU ITE) membantumu berpikir jauh ke depan.",
      whatToTry:
        "Gunakan pemahaman regulasi ini untuk membantu teman-temanmu agar lebih bijak dan beretika dalam menggunakan gawai.",
      coreReminder:
        "Internet adalah ruang publik. Setiap teks, gambar, dan suara yang kamu bagikan mencerminkan karakter dan kehormatan dirimu.",
      repropediaChapter: {
        title: "Kesehatan Digital & Perlindungan Privasi Remaja",
        href: "/repropedia/kesehatan-digital",
      },
    },
  },
};