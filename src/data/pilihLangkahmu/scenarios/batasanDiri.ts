import type { Scenario } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// KASUS 04: Saat Batasanmu Diuji
// Topik: Relasi Sehat, Komunikasi Asertif & Mencegah Manipulasi Emosional
// Format: 5 Langkah Keputusan Terarah (Converging Branches, 100% Aman & Relatable)
// ─────────────────────────────────────────────────────────────────────────────

export const batasanDiri: Scenario = {
  id: "batasan-diri",
  number: 4,
  title: "Saat Batasanmu Diuji",
  subtitle: "Menghadapi gebetan yang menuntut kontrol penuh dengan dalih pembuktian rasa sayang",
  topic: "Relasi Sehat & Komunikasi Asertif",
  duration: "3–4 menit",
  coverImage: "/assets/characters/fajar.jpg",
  icon: "❤️",
  accentColor: "rose",
  startSceneId: "step_1",
  isReady: true,
  scenes: {
    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 1: Permintaan Akses Akun Pribadi
    // ═════════════════════════════════════════════════════════════════════════
    step_1: {
      id: "step_1",
      stepNumber: 1,
      situationContext:
        "Sore hari di teras perpustakaan sekolah. Kamu sedang duduk bersama Fajar, teman dekat yang sudah beberapa bulan ini dekat denganmu.",
      messages: [
        {
          id: "s1_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Fajar menggeser duduknya mendekat dan menyodorkan ponselnya ke hadapanmu.",
        },
        {
          id: "s1_m2",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "{name}, bagi password akun Instagram dan nomor PIN HP kamu dong. Biar gue bisa login dan pantau siapa aja yang sering chat kamu.",
        },
        {
          id: "s1_m3",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Kalau kamu beneran anggap aku spesial, harusnya nggak ada rahasia-rahasiaan kan? Pacaran yang bener itu harus saling terbuka tanpa batas.",
        },
        {
          id: "s1_m4",
          sender: "narrator",
          characterId: "narrator",
          text: "Permintaan itu membuat hatimu berdenyut tidak nyaman. Akun pribadimu berisi obrolan keluarga dan teman dekat yang bersifat rahasia.",
        },
      ],
      choices: [
        {
          id: "c1_a",
          text: "\"Menyayangi itu tentang saling percaya, Jar, bukan saling mengontrol dan memeriksa akun pribadi.\"",
          consequence: "Kamu langsung menegaskan perbedaan antara rasa sayang dan kontrol posesif.",
          nextSceneId: "step_2_direct",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c1_b",
          text: "\"Kenapa tiba-tiba minta password? Ada apa sebenarnya, kamu curiga sama aku?\"",
          consequence: "Kamu menanyakan motif di balik rasa cemburu Fajar secara terbuka.",
          nextSceneId: "step_2_ask",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c1_c",
          text: "\"Nanti aja ya Jar, lagi nggak bawa catatan password-nya...\" (Mencari alasan mengelak)",
          consequence: "Kamu merasa cemas dan memilih menunda jawaban.",
          nextSceneId: "step_2_avoid",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 2: Tuntutan Membatasi Pertemanan
    // ═════════════════════════════════════════════════════════════════════════
    step_2_direct: {
      id: "step_2_direct",
      stepNumber: 2,
      situationContext: "Kamu menolak membagikan password akun pribadimu.",
      messages: [
        {
          id: "s2d_m1",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Tuh kan! Pasti ada yang kamu sembunyiin dari gue! Apalagi akhir-akhir ini kamu sering banget jalan bareng Dina dan teman kelas lain.",
        },
        {
          id: "s2d_m2",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Mulai besok kamu nggak usah akrab lagi sama mereka. Pilih: lebih penting gue, atau sahabat-sahabat lu itu?",
        },
        {
          id: "s2d_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Fajar mulai melakukan taktik isolasi sosial (ultimatum 'pilih aku atau sahabatmu'), pola klasik dari hubungan yang tidak sehat.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Dina adalah sahabat baikku sejak lama. Hubunganku sama kamu nggak seharusnya merusak pertemananku dengan orang lain.\"",
          consequence: "Kamu mempertahankan hak sosialmu dan menolak diisolasi.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c2_b",
          text: "\"Kenapa harus memilih? Kita berdua punya ruang hidup dan teman masing-masing yang sehat.\"",
          consequence: "Kamu mengedukasi Fajar tentang konsep ruang pribadi yang setara.",
          nextSceneId: "step_3",
          reflectionKey: "communicate_directly",
        },
      ],
    },

    step_2_ask: {
      id: "step_2_ask",
      stepNumber: 2,
      situationContext: "Kamu menanyakan motif kecurigaan Fajar.",
      messages: [
        {
          id: "s2a_m1",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Ya wajar dong gue cemburu! Orang yang gue suka masa masih asik nongkrong sama temen-temennya tanpa ngajak gue.",
        },
        {
          id: "s2a_m2",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Kalau kamu mau buktiin kamu setia, mulai sekarang kamu harus izin gue dulu tiap mau main sama siapa pun.",
        },
        {
          id: "s2a_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Fajar menjadikan rasa cemburu sebagai alasan untuk mengontrol seluruh aktivitas keseharianmu.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Cemburu itu wajar, Jar, tapi menuntut izin setiap saat itu mengekang. Hubungan kita harus berlandaskan rasa saling percaya.\"",
          consequence: "Kamu menempatkan batas tegas antara cinta dan pengekangan.",
          nextSceneId: "step_3",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c2_b",
          text: "\"Kalau syaratnya seberat ini, aku merasa relasi ini sudah tidak sehat untuk diteruskan.\"",
          consequence: "Kamu berani mengevaluasi kelayakan hubungan tersebut.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
      ],
    },

    step_2_avoid: {
      id: "step_2_avoid",
      stepNumber: 2,
      situationContext: "Kamu menunda jawaban soal password.",
      messages: [
        {
          id: "s2av_m1",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Kamu jangan ngeles ya! Pokoknya sebelum kamu kasih password-nya, gue nggak mau denger alasan apa pun.",
        },
        {
          id: "s2av_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Menunda ternyata membuat Fajar semakin menekan. Rasa takut kehilangan mulai membuatmu merasa terjebak.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Fajar, stop. Aku tidak akan pernah memberikan password akun pribadiku kepada siapa pun.\"",
          consequence: "Kamu menghentikan sikap ragu dan mengambil sikap tegas.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c2_b",
          text: "Menghela napas panjang dan terdiam karena merasa bersalah.",
          consequence: "Kamu membiarkan rasa bersalah yang tidak perlu menguasai pikiranmu.",
          nextSceneId: "step_3",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 3: Puncak Manipulasi (Guilt-Tripping & Ancaman)
    // ═════════════════════════════════════════════════════════════════════════
    step_3: {
      id: "step_3",
      stepNumber: 3,
      situationContext:
        "Keesokan harinya di depan gerbang sekolah saat pulang. Fajar menghampirimu sambil melempar buku tugas matematikanya ke meja tempat dudukmu.",
      messages: [
        {
          id: "s3_m1",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Nih, kerjain PR matematika gue buat besok. Nilai tugas gue jelek kemarin gara-gara mikirin lu.",
        },
        {
          id: "s3_m2",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Kalau kamu nolak lagi, kita udahan aja! Pacar macam apa yang disuruh bantuin hal sepele aja nggak mau!",
        },
        {
          id: "s3_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Fajar menyalahkanmu atas kegagalannya sendiri dan menggunakan ancaman 'putus hubungan' untuk memaksamu mengerjakan tugasnya.",
        },
      ],
      choices: [
        {
          id: "c3_a",
          text: "\"Tugas sekolah itu tanggung jawab kamu sendiri, Jar. Dan kalau kamu terus mengancam putus tiap kali kemauanmu ditolak, silakan saja kita selesai.\"",
          consequence: "Kamu tidak membiarkan dirimu diperas oleh ancaman perpisahan.",
          nextSceneId: "step_4",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c3_b",
          text: "\"Aku bisa bantu ajarin caranya, tapi aku nggak akan ngerjain PR kamu dari nol.\"",
          consequence: "Kamu menawarkan bantuan yang sehat dan mendidik tanpa mau dimanfaatkan.",
          nextSceneId: "step_4",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c3_c",
          text: "Menatap buku itu dengan cemas, takut jika Fajar benar-benar marah dan pergi.",
          consequence: "Kamu merasakan beban emosi dari manipulasi pasangan.",
          nextSceneId: "step_4",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 4: Membuka Diri & Meminta Perspektif Sahabat
    // ═════════════════════════════════════════════════════════════════════════
    step_4: {
      id: "step_4",
      stepNumber: 4,
      situationContext: "Dina melihatmu duduk termenung dengan mata berkaca-kaca di gazebo sekolah.",
      messages: [
        {
          id: "s4_m1",
          sender: "other",
          senderName: "Dina",
          characterId: "dina",
          characterImage: "/assets/characters/dina.jpg",
          text: "{name}! Kamu nggak apa-apa kan? Tadi aku liat Fajar ngebentak kamu di depan gerbang.",
        },
        {
          id: "s4_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu menceritakan semua rentetan kejadian: permintaan password, larangan berteman, hingga paksaan mengerjakan tugas dengan ancaman putus.",
        },
        {
          id: "s4_m3",
          sender: "other",
          senderName: "Dina",
          characterId: "dina",
          characterImage: "/assets/characters/dina.jpg",
          text: "Dengerin aku baik-baik ya, {name}. Itu bukan rasa sayang, itu namanya manipulatif dan posesif! Kamu orang hebat, kamu berharga, kamu berhak diperlakukan dengan hormat!",
        },
      ],
      choices: [
        {
          id: "c4_a",
          text: "\"Makasih banyak Din... Kata-katamu bikin aku sadar bahwa selama ini aku terus mengorbankan diriku demi membahagiakan orang lain.\"",
          consequence: "Kamu menyadari nilai dirimu dan siap mengambil kendali atas kebahagiaanmu.",
          nextSceneId: "step_5",
          reflectionKey: "seek_support",
        },
        {
          id: "c4_b",
          text: "\"Besok pagi aku akan temui Fajar dan bicara tegas bahwa batasan ini tidak bisa ditawar lagi.\"",
          consequence: "Kamu menyiapkan keberanian untuk menyelesaikan masalah secara tuntas.",
          nextSceneId: "step_5",
          reflectionKey: "protect_boundary",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 5: Menegakkan Standar Relasi Sehat
    // ═════════════════════════════════════════════════════════════════════════
    step_5: {
      id: "step_5",
      stepNumber: 5,
      situationContext:
        "Keesokan harinya di bangku taman depan perpustakaan. Fajar menunggumu dengan ekspresi angkuh, mengira kamu akan datang membawa buku tugasnya.",
      messages: [
        {
          id: "s5_m1",
          sender: "other",
          senderName: "Fajar",
          characterId: "fajar",
          characterImage: "/assets/characters/fajar.jpg",
          text: "Udah selesai kan PR gue? Mana bukunya?",
        },
        {
          id: "s5_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu berdiri tegak. Tidak ada rasa takut lagi di matamu. Kamu meletakkan buku tugas itu kembali ke depan Fajar dalam keadaan kosong.",
        },
      ],
      choices: [
        {
          id: "c5_a",
          text: "\"Fajar, aku menyukai diriku lebih dari rasa takutku kehilanganmu. Hubungan yang sehat saling menghargai dan mendukung, bukan mengontrol dan mengekang. Jika kamu belum siap dengan itu, kita selesai di sini.\"",
          consequence: "Kamu menegakkan batas harga diri dengan tenang, berwibawa, dan tanpa dendam.",
          nextSceneId: "ending_reflection",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c5_b",
          text: "\"Aku kembalikan bukumu. Kerjakan sendiri prestasimu. Aku berhak merasa aman dan dihargai dalam setiap hubungan yang kujalani.\"",
          consequence: "Kamu menyatakan otonomi pribadimu dengan tegas dan mantap.",
          nextSceneId: "ending_reflection",
          reflectionKey: "communicate_directly",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // ENDING
    // ═════════════════════════════════════════════════════════════════════════
    ending_reflection: {
      id: "ending_reflection",
      stepNumber: 5,
      situationContext: "Sebuah kelegaan besar memancar dari dalam dirimu.",
      isEnding: true,
      messages: [
        {
          id: "end_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Fajar terperangah dan terdiam seribu bahasa. Dia tidak menyangka kamu yang selama ini pendiam memiliki keberanian dan ketegasan sekuat itu.",
        },
        {
          id: "end_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu melangkah pergi dengan langkah ringan dan kepala tegak, disambut pelukan hangat dari sahabatmu Dina. Mencintai diri sendiri dan menjaga batasan sehat adalah hadiah terbaik yang bisa kamu berikan untuk masa depanmu.",
        },
      ],
    },
  },

  reflections: {
    protect_boundary: {
      headline:
        "Dalam situasi tadi, kamu menunjukkan harga diri yang tinggi dan keberanian menolak manipulasi emosional (guilt-tripping).",
      whatWasGood:
        "Menolak diperlakukan secara tidak adil oleh orang yang kita sukai butuh kekuatan mental yang luar biasa. Kamu membuktikan bahwa mencintai diri sendiri adalah prioritas utama.",
      whatToTry:
        "Pertahankan standar relasi ini sepanjang hidupmu. Jangan pernah menurunkan standar kehormatan dan batasan pribadimu hanya demi menyenangkan orang lain.",
      coreReminder:
        "Relasi yang sehat tidak pernah memaksamu memilih antara pasangan dan sahabatmu. Cinta sejati membebaskanmu untuk bertumbuh, bukan mengurungmu.",
      repropediaChapter: {
        title: "Batasan Personal, Relasi Sehat & Mencegah Toxic Dating",
        href: "/repropedia/relasi-sehat",
      },
    },
    communicate_directly: {
      headline:
        "Dalam situasi tadi, kamu mampu membedakan dengan jernih antara rasa cinta yang tulus dan kontrol posesif yang destruktif.",
      whatWasGood:
        "Kamu tidak membalas amarah dengan kekerasan, melainkan mengedukasi dan menyatakan batasan secara berwibawa dan penuh ketenangan.",
      whatToTry:
        "Terus asah keterampilan komunikasi asertif ini. Orang yang memiliki komunikasi asertif yang kuat akan selalu terlindungi dari relasi yang manipulatif.",
      coreReminder:
        "Saling percaya adalah fondasi utama dari kasih sayang. Jika tidak ada rasa saling percaya, hubungan itu hanya akan diisi kecurigaan dan rasa lelah.",
      repropediaChapter: {
        title: "Batasan Personal, Relasi Sehat & Mencegah Toxic Dating",
        href: "/repropedia/relasi-sehat",
      },
    },
    seek_support: {
      headline:
        "Dalam situasi tadi, kamu bijak mencari sudut pandang objektif dari sahabat untuk menyadarkan dirimu dari jerat manipulasi.",
      whatWasGood:
        "Sering kali saat berada dalam hubungan yang toksik, kita sulit melihat kenyataan secara jernih. Keterbukaanmu kepada sahabat adalah penyelamat terbaik.",
      whatToTry:
        "Rawatlah sahabat-sahabat yang selalu mengingatkanmu pada kebenaran. Sistem pertemanan yang sehat adalah pelindung terbaik bagi remaja.",
      coreReminder:
        "Jangan pernah mengisolasi dirimu dari sahabat atau keluarga hanya demi satu orang. Sahabat sejati akan selalu ada untuk menguatkanmu.",
      repropediaChapter: {
        title: "Batasan Personal, Relasi Sehat & Mencegah Toxic Dating",
        href: "/repropedia/relasi-sehat",
      },
    },
    avoid_conflict: {
      headline:
        "Dalam situasi tadi, kamu sempat merasa cemas, bingung, atau takut kehilangan saat menghadapi pasangan yang menuntut.",
      whatWasGood:
        "Rasa takut mengecewakan orang lain menunjukkan bahwa kamu memiliki hati yang lembut dan peduli pada perasaan orang di sekitarmu.",
      whatToTry:
        "Sadari bahwa kebaikan hatimu tidak boleh dimanfaatkan orang lain. Mengatakan 'tidak' pada tuntutan yang melanggar privasimu adalah tanda kedewasaan.",
      coreReminder:
        "Kamu tidak berkewajiban membuktikan rasa sayangmu dengan menyerahkan privasi atau melakukan hal yang membuat hatimu merasa tertekan.",
      repropediaChapter: {
        title: "Batasan Personal, Relasi Sehat & Mencegah Toxic Dating",
        href: "/repropedia/relasi-sehat",
      },
    },
    reconsider: {
      headline:
        "Dalam situasi tadi, kamu cepat peka membaca tanda-tanda bahaya (red flags) dalam hubungan pertemanan dekat.",
      whatWasGood:
        "Kemampuanmu mendeteksi perilaku pengekangan sejak dini membantumu terhindar dari hubungan beracun yang lebih dalam.",
      whatToTry:
        "Jadikan pengalaman ini sebagai kompas pribadi dalam memilih teman dan pasangan di masa depan.",
      coreReminder:
        "Pasangan yang tepat akan membuatmu merasa aman, percaya diri, dan dihargai apa adanya—bukan cemas dan terancam.",
      repropediaChapter: {
        title: "Batasan Personal, Relasi Sehat & Mencegah Toxic Dating",
        href: "/repropedia/relasi-sehat",
      },
    },
  },
};