import type { Scenario } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// KASUS 03: Nongkrong Lewat Jam Malam
// Topik: Peer Pressure, Pengambilan Keputusan & Menjaga Kepercayaan Keluarga
// Format: 5 Langkah Keputusan Terarah (Converging Branches, 100% Aman & Relatable)
// ─────────────────────────────────────────────────────────────────────────────

export const nongkrongMalam: Scenario = {
  id: "nongkrong-malam",
  number: 3,
  title: "Nongkrong Lewat Jam Malam",
  subtitle: "Ketika ajakan kumpul bertabrakan dengan batas waktu dan rasa cemas orang tua",
  topic: "Tekanan Teman Sebaya & Manajemen Waktu",
  duration: "3–4 menit",
  coverImage: "/assets/characters/player_boy.png",
  icon: "👥",
  accentColor: "amber",
  startSceneId: "step_1",
  isReady: true,
  scenes: {
    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 1: Ajakan Pindah Lokasi Larut Malam
    // ═════════════════════════════════════════════════════════════════════════
    step_1: {
      id: "step_1",
      stepNumber: 1,
      situationContext:
        "Sabtu malam pukul 20.35. Kamu sedang mengerjakan tugas kelompok di kedai kopi dekat sekolah bersama teman-teman. Jam malam yang disepakati dengan orang tuamu adalah pukul 21.00.",
      messages: [
        {
          id: "s1_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Tugas kelompok sudah selesai dirapikan. Namun saat kamu mulai mengemasi tas, Bagas tiba-tiba berdiri sambil menepuk meja dengan semangat.",
        },
        {
          id: "s1_m2",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Woi guys! Nanggung amat jam segini udah mau bubar. Pindah ke tongkrongan belakang ruko yuk! Kakak gue ada di sana, kita nongkrong sampai tengah malam!",
        },
        {
          id: "s1_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu melihat arloji di tanganmu: 20.40. Perjalanan pulang ke rumah membutuhkan waktu sekitar 15 menit.",
        },
      ],
      choices: [
        {
          id: "c1_a",
          text: "\"Aku nggak bisa ikut, Bas. Udah jam 20.40, aku sudah janji sama orang tua harus sampai rumah jam 9 malam.\"",
          consequence: "Kamu langsung menyatakan komitmen waktu keluargamu dengan jujur.",
          nextSceneId: "step_2_direct",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c1_b",
          text: "\"Eee... kalau mampir cuma 15 menit boleh deh, tapi abis itu aku beneran harus cabut ya.\"",
          consequence: "Kamu berusaha berkompromi karena tidak enak hati menolak ajakan.",
          nextSceneId: "step_2_compromise",
          reflectionKey: "avoid_conflict",
        },
        {
          id: "c1_c",
          text: "\"Aku izin keluar sebentar buat telepon Ibu dulu, tanya apakah boleh pulang lebih lambat.\"",
          consequence: "Kamu mengutamakan komunikasi dengan orang tua sebelum memutuskan.",
          nextSceneId: "step_2_call",
          reflectionKey: "seek_support",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 2: Menghadapi Provokasi "Cupu / Anak Mami"
    // ═════════════════════════════════════════════════════════════════════════
    step_2_direct: {
      id: "step_2_direct",
      stepNumber: 2,
      situationContext: "Kamu menolak karena sudah ada kesepakatan jam malam.",
      messages: [
        {
          id: "s2d_m1",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Yaelah {name}, udah kelas 9 SMP masih aja dikandangin jam malam! Cupu amat lu, bilang aja ban motor bocor atau HP mati, beres kan!",
        },
        {
          id: "s2d_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Beberapa pasang mata memandang ke arahmu. Ada rasa canggung ketika dicap 'anak mami' di depan teman-teman sebaya.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Mau dibilang cupu atau apa, yang penting aku pegang janji ke ortu. Kepercayaan itu mahal, Bas.\"",
          consequence: "Kamu berdiri kokoh pada integritas dan prinsip pribadimu.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c2_b",
          text: "\"Bukan soal cupu, tapi jalanan malam hari bahaya dan orang tua khawatir. Lain kali kita kumpul siang aja.\"",
          consequence: "Kamu memberikan alasan logis dan menawarkan alternatif aman.",
          nextSceneId: "step_3",
          reflectionKey: "communicate_directly",
        },
      ],
    },

    step_2_compromise: {
      id: "step_2_compromise",
      stepNumber: 2,
      situationContext: "Kamu ikut mampir ke tongkrongan belakang ruko.",
      messages: [
        {
          id: "s2c_m1",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Nah gitu dong! 15 menit mana berasa, santai aja!",
        },
        {
          id: "s2c_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Tiba di lokasi, suasana ternyata sangat bising dan gelap. Tanpa terasa waktu sudah menunjukkan pukul 21.25. Hatimu mulai diliputi rasa bersalah dan cemas.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "Segera berdiri dan pamit sekarang juga sebelum keadaan semakin larut malam.",
          consequence: "Kamu menyadari kesalahan kompromi dan segera mengambil kendali.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c2_b",
          text: "Tetap duduk karena sungkan beranjak sendirian di tengah keramaian.",
          consequence: "Kamu membiarkan rasa sungkan mengalahkan batas keselamatanmu.",
          nextSceneId: "step_3",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    step_2_call: {
      id: "step_2_call",
      stepNumber: 2,
      situationContext: "Kamu menelepon Ibu di sudut teras kedai kopi.",
      messages: [
        {
          id: "s2call_m1",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Halo, {name}? Ini sudah hampir jam 9 malam, Nak. Ayahmu sudah bersiap memanaskan motor mau jemput kamu di kedai kopi.",
        },
        {
          id: "s2call_m2",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Ibu lebih tenang kalau kamu pulang sekarang. Kalau mau kumpul lagi, besok siang kan bisa.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Iya Bu, aku tunggu Ayah jemput sekarang ya. Tugas kelompoknya juga sudah selesai kok.\"",
          consequence: "Kamu menyambut kepedulian orang tua dengan lapang dada.",
          nextSceneId: "step_3",
          reflectionKey: "seek_support",
        },
        {
          id: "c2_b",
          text: "\"Bu, masa teman-teman boleh nongkrong aku nggak boleh? Sekali-kali dong Bu...\"",
          consequence: "Kamu sempat merajuk karena merasa terkekang di depan teman.",
          nextSceneId: "step_3",
          reflectionKey: "reconsider",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 3: Munculnya Tanda Bahaya (Red Flag di Tongkrongan)
    // ═════════════════════════════════════════════════════════════════════════
    step_3: {
      id: "step_3",
      stepNumber: 3,
      situationContext:
        "Suasana semakin malam. Salah satu anak yang lebih tua di tongkrongan mulai mengeluarkan bungkus rokok dan menantang anak-anak SMP untuk ikut mencoba.",
      messages: [
        {
          id: "s3_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Asap rokok mulai mengepul tebal di sudut ruangan. Beberapa anak mulai bercanda kasar dan saling memprovokasi.",
        },
        {
          id: "s3_m2",
          sender: "other",
          senderName: "Bagas",
          characterId: "bagas",
          characterImage: "/assets/characters/bagas.jpg",
          text: "Nih cobain sebat, {name}! Biar keliatan dewasa dikit, jangan kaku-kaku amat hidup lu!",
        },
        {
          id: "s3_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Nalurimu memberi sinyal bahaya yang nyata. Ini bukan lagi sekadar tempat nongkrong sehat, melainkan lingkungan berisiko bagi remaja.",
        },
      ],
      choices: [
        {
          id: "c3_a",
          text: "\"Nggak, makasih. Aku nggak merokok dan aku mau pamit pulang sekarang.\"",
          consequence: "Kamu menolak godaan berisiko dengan tegas dan tidak berkompromi.",
          nextSceneId: "step_4",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c3_b",
          text: "Mengalihkan pandangan dan mundur ke arah pintu keluar mencari udara segar.",
          consequence: "Kamu mencari celah aman untuk memisahkan diri dari kerumunan.",
          nextSceneId: "step_4",
          reflectionKey: "reconsider",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 4: Momen Penyelamatan & Komunikasi Darurat
    // ═════════════════════════════════════════════════════════════════════════
    step_4: {
      id: "step_4",
      stepNumber: 4,
      situationContext: "Ponselmu di saku bergetar kencang. Ada panggilan masuk dari Ayah.",
      messages: [
        {
          id: "s4_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Layar ponsel menunjukkan nama 'Ayah'. Kamu melangkah menjauh dari kerumunan untuk mengangkatnya.",
        },
        {
          id: "s4_m2",
          sender: "other",
          senderName: "Ayah",
          characterId: "ayah",
          characterImage: "/assets/characters/ayah.jpg",
          text: "{name}, kamu di mana? Ayah sudah sampai di depan kedai kopi tapi tempatnya sudah tutup. Kamu aman, Nak?",
        },
        {
          id: "s4_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Nada suara Ayah terdengar sangat cemas namun tetap berusaha tenang. Kamu berada di persimpangan: berbohong atau jujur?",
        },
      ],
      choices: [
        {
          id: "c4_a",
          text: "\"Ayah, maaf tadi diajak teman ke ruko belakang. Aku di sini sendirian mau pulang, tolong jemput di depan gang ruko ya Yah.\"",
          consequence: "Kamu memilih jujur tanpa membuat cerita palsu demi keselamatanmu.",
          nextSceneId: "step_5",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c4_b",
          text: "\"Ayah tunggu di situ aja! Aku langsung lari ke kedai kopi sekarang!\"",
          consequence: "Kamu segera berlari menuju titik jemput aman ayahmu.",
          nextSceneId: "step_5",
          reflectionKey: "protect_boundary",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 5: Refleksi Bersama Keluarga di Rumah
    // ═════════════════════════════════════════════════════════════════════════
    step_5: {
      id: "step_5",
      stepNumber: 5,
      situationContext:
        "Pukul 21.45 di ruang makan rumah. Ibu menyuguhkan segelas teh hangat, sementara Ayah duduk di sampingmu setelah perjalanan pulang yang tenang.",
      messages: [
        {
          id: "s5_m1",
          sender: "other",
          senderName: "Ayah",
          characterId: "ayah",
          characterImage: "/assets/characters/ayah.jpg",
          text: "Ayah senang kamu jujur dan mau langsung pulang tadi, {name}. Ayah tidak melarang kamu punya teman, tapi jalanan malam hari dan lingkungan yang tidak jelas itu berbahaya untuk anak seusiamu.",
        },
        {
          id: "s5_m2",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Ibu cuma ingin kamu selalu aman. Teman yang benar-benar baik pasti akan menghargai jam pulangmu, bukan malah mengejek.",
        },
      ],
      choices: [
        {
          id: "c5_a",
          text: "\"Terima kasih Ayah, Ibu, sudah selalu menjaga aku. Aku janji ke depannya akan lebih tegas menolak ajakan yang tidak jelas.\"",
          consequence: "Kamu memetik pelajaran berharga dan memperkuat ikatan kepercayaan keluarga.",
          nextSceneId: "ending_reflection",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c5_b",
          text: "\"Aku mengerti sekarang. Menjaga batas waktu bukan berarti cupu, tapi bentuk tanggung jawab pada diri sendiri.\"",
          consequence: "Kamu merefleksikan definisi sejati dari kedewasaan remaja.",
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
      situationContext: "Malam berakhir dengan rasa damai dan kehangatan keluarga.",
      isEnding: true,
      messages: [
        {
          id: "end_m1",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Tidurlah yang nyenyak, Nak. Esok hari masih banyak hal baik yang menunggumu.",
        },
        {
          id: "end_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Keberanian terbesar seorang remaja bukanlah mengikuti arus kelompok, melainkan berani berkata cukup ketika batas amanmu mulai terancam.",
        },
      ],
    },
  },

  reflections: {
    protect_boundary: {
      headline:
        "Dalam situasi tadi, kamu menunjukkan keteguhan prinsip yang luar biasa dalam menolak tekanan kelompok (peer pressure).",
      whatWasGood:
        "Kamu tidak gentar oleh sebutan 'cupu' atau 'anak mami'. Kamu membuktikan bahwa menjaga keselamatan diri jauh lebih penting dari sekadar gengsi sesaat.",
      whatToTry:
        "Pertahankan sikap asertif ini. Ketika kamu konsisten menjaga batasanmu, teman-temanmu perlahan akan menaruh respek pada prinsip hidupmu.",
      coreReminder:
        "Teman sejati adalah mereka yang menghargai batasan dan keselamatanmu, bukan yang memaksamu melanggarnya demi pengakuan kelompok.",
      repropediaChapter: {
        title: "Kesehatan Mental, Relasi Teman Sebaya & Asertivitas",
        href: "/repropedia/kesehatan-mental",
      },
    },
    communicate_directly: {
      headline:
        "Dalam situasi tadi, kamu memilih jalur komunikasi jujur dan transparan baik kepada teman maupun orang tua.",
      whatWasGood:
        "Tidak mudah untuk jujur saat posisi kita sedang salah atau terlambat. Sikap terus terangmu kepada Ayah berhasil mencegah masalah yang lebih besar.",
      whatToTry:
        "Terus biasakan bernegosiasi waktu secara sehat sejak awal sebelum pergi, sehingga tidak terjadi kepanikan di rumah.",
      coreReminder:
        "Kejujuran adalah modal utama dari kebebasan. Sekali orang tua melihat kamu bertanggung jawab, mereka akan memberikan kepercayaan lebih besar.",
      repropediaChapter: {
        title: "Kesehatan Mental, Relasi Teman Sebaya & Asertivitas",
        href: "/repropedia/kesehatan-mental",
      },
    },
    seek_support: {
      headline:
        "Dalam situasi tadi, kamu bijak melibatkan orang tua sebagai sistem perlindungan utamamu saat situasi mulai tidak nyaman.",
      whatWasGood:
        "Menghubungi orang tua saat berada di lingkungan yang meragukan adalah keputusan cerdas untuk menyelamatkan diri dari risiko bahaya.",
      whatToTry:
        "Pahami bahwa aturan jam malam dari orang tua lahir dari rasa cinta dan proteksi keselamatan di jalan raya malam hari.",
      coreReminder:
        "Keluarga adalah tempat pulang yang selalu aman. Meminta bantuan orang tua saat situasi memburuk adalah tanda kebijaksanaan.",
      repropediaChapter: {
        title: "Kesehatan Mental, Relasi Teman Sebaya & Asertivitas",
        href: "/repropedia/kesehatan-mental",
      },
    },
    avoid_conflict: {
      headline:
        "Dalam situasi tadi, kamu sempat berkompromi atau merasa sungkan menolak ajakan teman karena takut dikucilkan.",
      whatWasGood:
        "Keinginan untuk tetap berteman dan diterima oleh kelompok sebaya adalah naluri alami yang dirasakan semua remaja.",
      whatToTry:
        "Latih diri untuk berani pamit lebih awal jika suasana sudah tidak kondusif. Menghindari konflik dengan mengorbankan keselamatan diri sendiri sangat berisiko.",
      coreReminder:
        "Kamu tidak bertanggung jawab atas kekecewaan temanmu saat kamu memilih untuk menjaga keselamatan dan mematuhi orang tua.",
      repropediaChapter: {
        title: "Kesehatan Mental, Relasi Teman Sebaya & Asertivitas",
        href: "/repropedia/kesehatan-mental",
      },
    },
    reconsider: {
      headline:
        "Dalam situasi tadi, kamu cepat membaca tanda-tanda bahaya (red flags) dan mengambil langkah mundur yang tepat.",
      whatWasGood:
        "Kepekaanmu terhadap perubahan suasana tongkrongan membantumu menyelamatkan diri sebelum terjerumus pada perilaku berisiko.",
      whatToTry:
        "Gunakan insting tajam ini di mana pun kamu berada. Memilih lingkungan pergaulan yang sehat akan sangat membentuk masa depanmu.",
      coreReminder:
        "Lingkungan yang baik akan menarikmu ke atas untuk berprestasi, bukan menjatuhkanmu pada kebiasaan yang merusak tubuh.",
      repropediaChapter: {
        title: "Kesehatan Mental, Relasi Teman Sebaya & Asertivitas",
        href: "/repropedia/kesehatan-mental",
      },
    },
  },
};