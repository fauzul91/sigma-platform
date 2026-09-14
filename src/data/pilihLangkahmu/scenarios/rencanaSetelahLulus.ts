import type { Scenario } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// KASUS 01: Rencana Setelah Lulus
// Topik: Perkawinan Anak vs Melanjutkan Pendidikan ke SMA
// Format: 5 Langkah Keputusan Terarah (Converging Branches, 100% Aman & Relatable)
// ─────────────────────────────────────────────────────────────────────────────

export const rencanaSetelahLulus: Scenario = {
  id: "rencana-setelah-lulus",
  number: 1,
  title: "Rencana Setelah Lulus",
  subtitle: "Ketika impian melanjutkan sekolah bertabrakan dengan harapan keluarga",
  topic: "Pencegahan Perkawinan Anak & Hak Pendidikan",
  duration: "3–4 menit",
  coverImage: "/assets/characters/ibu.jpg",
  icon: "🏠",
  accentColor: "emerald",
  startSceneId: "step_1",
  isReady: true,
  scenes: {
    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 1: Situasi Awal di Ruang Tamu
    // ═════════════════════════════════════════════════════════════════════════
    step_1: {
      id: "step_1",
      stepNumber: 1,
      situationContext:
        "Sore hari setelah kelulusan SMP. Surat pengumuman kamu diterima di SMA negeri favorit baru saja kamu letakkan di meja. Namun, suasana di ruang tamu terasa lebih hening dari biasanya.",
      messages: [
        {
          id: "s1_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Ayah duduk bersandar di kursi rotan, sementara Ibu menatapmu dengan pandangan lembut namun ada keraguan di matanya.",
        },
        {
          id: "s1_m2",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Duduk dulu ya, Nak. Ada hal penting yang ingin Ibu dan Ayah bicarakan dari hati ke hati.",
        },
        {
          id: "s1_m3",
          sender: "other",
          senderName: "Ayah",
          characterId: "ayah",
          characterImage: "/assets/characters/ayah.jpg",
          text: "Tadi pagi, Pak Rudi tetangga blok sebelah datang ke rumah. Beliau menanyakan kesediaanmu untuk dipinang oleh anaknya setelah kelulusan ini.",
        },
        {
          id: "s1_m4",
          sender: "narrator",
          characterId: "narrator",
          text: "Dada terasa berdegup kencang. Kamu baru berusia 15 tahun dan baru saja merayakan kelulusan SMP.",
        },
      ],
      choices: [
        {
          id: "c1_a",
          text: "\"Tapi Yah, Bu... aku masih ingin melanjutkan sekolah ke SMA.\"",
          consequence: "Kamu langsung mengungkapkan keinginan belajarmu dengan sopan.",
          nextSceneId: "step_2_direct",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c1_b",
          text: "Menunduk terdiam sejenak, menahan rasa kaget dan bingung.",
          consequence: "Kamu memilih diam sejenak untuk menenangkan perasaan yang berkecamuk.",
          nextSceneId: "step_2_silent",
          reflectionKey: "avoid_conflict",
        },
        {
          id: "c1_c",
          text: "\"Boleh aku minta waktu untuk memikirkannya baik-baik dulu?\"",
          consequence: "Kamu meminta ruang untuk berpikir sebelum memberikan jawaban.",
          nextSceneId: "step_2_reconsider",
          reflectionKey: "reconsider",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 2: Mengemukakan Alasan & Kekhawatiran Biaya
    // ═════════════════════════════════════════════════════════════════════════
    step_2_direct: {
      id: "step_2_direct",
      stepNumber: 2,
      situationContext: "Kamu menyatakan keinginanmu untuk tetap bersekolah.",
      messages: [
        {
          id: "s2d_m1",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Ibu tahu kamu pintar dan suka belajar, Nak. Tapi biaya masuk SMA dan seragamnya cukup berat buat keluarga kita saat ini.",
        },
        {
          id: "s2d_m2",
          sender: "other",
          senderName: "Ayah",
          characterId: "ayah",
          characterImage: "/assets/characters/ayah.jpg",
          text: "Pekerjaan Ayah sedang sepi. Kalau kamu menikah, ada yang menjamin masa depanmu. Kami cuma tidak mau kamu terlantar nanti.",
        },
        {
          id: "s2d_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu menyadari bahwa kekhawatiran orang tua sebenarnya berakar dari kondisi ekonomi dan rasa cemas, bukan karena tidak menyayangimu.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Soal biaya, aku akan coba cari beasiswa atau program bantuan dari sekolah, Yah.\"",
          consequence: "Kamu menawarkan alternatif solusi nyata untuk masalah biaya.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c2_b",
          text: "\"Apakah tidak ada jalan keluar lain selain harus menikah di usia 15 tahun begini?\"",
          consequence: "Kamu mengajak orang tua merenungkan kembali batasan usia yang sehat.",
          nextSceneId: "step_3",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c2_c",
          text: "\"Kalau memang keadaan seberat itu... apa aku harus mengalah saja?\"",
          consequence: "Kamu merasa tertekan oleh keadaan ekonomi keluarga.",
          nextSceneId: "step_3",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    step_2_silent: {
      id: "step_2_silent",
      stepNumber: 2,
      situationContext: "Kamu terdiam. Suasana hening beberapa detik.",
      messages: [
        {
          id: "s2s_m1",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Ibu tahu ini mengejutkan. Tapi kami cuma memikirkan bagaimana kamu nanti. Sekolah SMA tiga tahun itu butuh biaya banyak.",
        },
        {
          id: "s2s_m2",
          sender: "other",
          senderName: "Ayah",
          characterId: "ayah",
          characterImage: "/assets/characters/ayah.jpg",
          text: "Keluarga Pak Rudi mapan. Ayah cuma takut tidak bisa membiayaimu sampai tuntas kalau kamu tetap sekolah.",
        },
        {
          id: "s2s_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Diammu hampir diartikan sebagai kepasrahan. Kamu tahu harus mulai mencari bantuan atau menyuarakan isi hatimu.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Soal biaya, aku akan coba cari beasiswa atau program bantuan dari sekolah, Yah.\"",
          consequence: "Kamu memberanikan diri mencari solusi beasiswa daripada menyerah.",
          nextSceneId: "step_3",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c2_b",
          text: "\"Aku tetap ingin sekolah, Bu. Tolong beri aku kesempatan mencari jalan keluar.\"",
          consequence: "Kamu meminta kesempatan untuk membuktikan niat belajarmu.",
          nextSceneId: "step_3",
          reflectionKey: "communicate_directly",
        },
      ],
    },

    step_2_reconsider: {
      id: "step_2_reconsider",
      stepNumber: 2,
      situationContext: "Kamu meminta waktu untuk berpikir.",
      messages: [
        {
          id: "s2r_m1",
          sender: "other",
          senderName: "Ayah",
          characterId: "ayah",
          characterImage: "/assets/characters/ayah.jpg",
          text: "Bagus kalau kamu mau memikirkan dulu. Tapi jangan terlalu lama, karena Pak Rudi menunggu kabar minggu ini.",
        },
        {
          id: "s2r_m2",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Alasan utama Ayah dan Ibu cuma satu: kami cemas tidak punya biaya cukup untuk 3 tahun SMA-mu nanti.",
        },
        {
          id: "s2r_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Sekarang kamu tahu masalah intinya: kekhawatiran finansial orang tua atas biaya sekolah.",
        },
      ],
      choices: [
        {
          id: "c2_a",
          text: "\"Aku mengerti kekhawatiran Ibu. Besok aku akan tanya ke sekolah apakah ada beasiswa bantuan.\"",
          consequence: "Kamu proaktif mencari info bantuan pendidikan.",
          nextSceneId: "step_3",
          reflectionKey: "seek_support",
        },
        {
          id: "c2_b",
          text: "\"Beri aku waktu beberapa hari untuk bicara dengan Kak Rani dulu ya, Bu.\"",
          consequence: "Kamu memutuskan meminta pandangan dari kakak sepupu yang kuliah.",
          nextSceneId: "step_3",
          reflectionKey: "reconsider",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 3: Mencari Dukungan di Lingkungan Sekolah
    // ═════════════════════════════════════════════════════════════════════════
    step_3: {
      id: "step_3",
      stepNumber: 3,
      situationContext:
        "Keesokan harinya di koridor sekolah. Kamu duduk termenung memegang brosur pendaftaran ulang SMA. Pikiranmu masih tertuju pada percakapan semalam.",
      messages: [
        {
          id: "s3_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Langkah kaki terdengar mendekat. Dina, sahabatmu sejak kelas 7, datang membawa dua kotak susu.",
        },
        {
          id: "s3_m2",
          sender: "other",
          senderName: "Dina",
          characterId: "dina",
          characterImage: "/assets/characters/dina.jpg",
          text: "Hei! Dari tadi dipanggil kok melamun terus? Wajahmu tegang banget, ada apa sih?",
        },
        {
          id: "s3_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Di ujung koridor, terlihat pintu ruang BK terbuka. Bu Sari, guru bimbingan konseling yang terkenal ramah, sedang merapikan berkas di mejanya.",
        },
      ],
      choices: [
        {
          id: "c3_a",
          text: "\"Din, aku mau ke ruang BK Bu Sari sekarang. Boleh temani aku sebentar?\"",
          consequence: "Kamu mengambil inisiatif mencari bantuan profesional di sekolah.",
          nextSceneId: "step_4_bk",
          reflectionKey: "seek_support",
        },
        {
          id: "c3_b",
          text: "\"Din, orang tuaku ragu membiayai SMA dan menyarankan menikah muda. Aku bingung harus gimana.\"",
          consequence: "Kamu mencurahkan isi hatimu ke sahabat yang dipercaya.",
          nextSceneId: "step_4_dina",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c3_c",
          text: "\"Nggak ada apa-apa kok Din, cuma agak pusing aja.\" (Menyimpan masalah sendiri)",
          consequence: "Kamu memilih memendam kekhawatiranmu sendiri.",
          nextSceneId: "step_4_self",
          reflectionKey: "avoid_conflict",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 4: Konsultasi & Menemukan Solusi Nyata
    // ═════════════════════════════════════════════════════════════════════════
    step_4_bk: {
      id: "step_4_bk",
      stepNumber: 4,
      situationContext: "Di ruang bimbingan konseling bersama Bu Sari.",
      messages: [
        {
          id: "s4bk_m1",
          sender: "other",
          senderName: "Bu Sari",
          characterId: "bu_sari",
          characterImage: "/assets/characters/bu_sari.jpg",
          text: "Ibu bangga sekali kamu mau datang ke sini dan bercerita jujur. Usiamu baru 15 tahun, hak utamamu sekarang adalah belajar dan menuntaskan sekolah.",
        },
        {
          id: "s4bk_m2",
          sender: "other",
          senderName: "Bu Sari",
          characterId: "bu_sari",
          characterImage: "/assets/characters/bu_sari.jpg",
          text: "Soal biaya, sekolah punya kuota Program Indonesia Pintar (PIP) dan beasiswa afirmasi yang bisa kita ajukan untuk jenjang SMA. Kamu punya prestasi akademik yang sangat cukup.",
        },
        {
          id: "s4bk_m3",
          sender: "other",
          senderName: "Bu Sari",
          characterId: "bu_sari",
          characterImage: "/assets/characters/bu_sari.jpg",
          text: "Kalau kamu mau, besok Ibu bersedia menelepon atau berkunjung ke rumah untuk menjelaskan opsi beasiswa ini langsung ke Ayah dan Ibu.",
        },
      ],
      choices: [
        {
          id: "c4_a",
          text: "\"Terima kasih banyak Bu Sari. Saya sangat berterima kasih jika Ibu bisa bantu jelaskan ke orang tua saya.\"",
          consequence: "Kamu menerima bantuan pendampingan dari pihak sekolah.",
          nextSceneId: "step_5",
          reflectionKey: "seek_support",
        },
        {
          id: "c4_b",
          text: "\"Saya akan bawa formulir beasiswa ini pulang dan coba bicarakan baik-baik sendiri dulu ke Ayah dan Ibu, Bu.\"",
          consequence: "Kamu ingin mandiri membuktikan keseriusanmu ke orang tua berbekal solusi konkret.",
          nextSceneId: "step_5",
          reflectionKey: "communicate_directly",
        },
      ],
    },

    step_4_dina: {
      id: "step_4_dina",
      stepNumber: 4,
      situationContext: "Dina mendengarkan ceritamu dengan mata membulat kaget.",
      messages: [
        {
          id: "s4d_m1",
          sender: "other",
          senderName: "Dina",
          characterId: "dina",
          characterImage: "/assets/characters/dina.jpg",
          text: "Astaga! Kamu kan juara kelas, masa berhenti sekolah di SMP? Undang-undang kita aja bilang batas usia minimal menikah itu 19 tahun!",
        },
        {
          id: "s4d_m2",
          sender: "other",
          senderName: "Dina",
          characterId: "dina",
          characterImage: "/assets/characters/dina.jpg",
          text: "Yuk sekarang kita ke ruang Bu Sari di BK. Kakak sepupuku dulu juga dapat beasiswa PIP lewat Bu Sari waktu kesulitan biaya masuk SMA.",
        },
        {
          id: "s4d_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Dukungan Dina memberimu dorongan moral yang besar. Kalian berdua melangkah bersama ke ruang BK untuk meminta formulir bantuan.",
        },
      ],
      choices: [
        {
          id: "c4_a",
          text: "\"Makasih banyak Din. Beneran, aku ngerasa nggak sendirian lagi sekarang.\"",
          consequence: "Kamu menghargai dukungan sahabat dan siap melangkah maju.",
          nextSceneId: "step_5",
          reflectionKey: "seek_support",
        },
        {
          id: "c4_b",
          text: "\"Ayo kita temui Bu Sari sekarang untuk konsultasi formulirnya.\"",
          consequence: "Kamu bertindak cepat mencari solusi pendidikan.",
          nextSceneId: "step_5",
          reflectionKey: "protect_boundary",
        },
      ],
    },

    step_4_self: {
      id: "step_4_self",
      stepNumber: 4,
      situationContext: "Kamu menyendiri di perpustakaan sekolah.",
      messages: [
        {
          id: "s4s_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu duduk sendirian membaca papan pengumuman beasiswa di mading perpustakaan. Ada kontak layanan beasiswa daerah.",
        },
        {
          id: "s4s_m2",
          sender: "narrator",
          characterId: "narrator",
          text: "Kamu mencatat syarat-syaratnya di buku catatan: surat keterangan tidak mampu, fotokopi rapor, dan rekomendasi sekolah.",
        },
        {
          id: "s4s_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Meskipun berjalan sendiri terasa berat, kamu memegang satu tekad: masa depan dan pendidikanmu pantas diperjuangkan.",
        },
      ],
      choices: [
        {
          id: "c4_a",
          text: "\"Aku akan bawa catatan ini pulang dan tunjukkan ke Ayah kalau ada jalan keluar biaya.\"",
          consequence: "Kamu menyiapkan data konkret sebelum berbicara kembali dengan keluarga.",
          nextSceneId: "step_5",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c4_b",
          text: "\"Sebelum pulang, ada baiknya aku tetap menyapa Bu Sari di BK untuk memastikan keabsahan beasiswa ini.\"",
          consequence: "Kamu memutuskan tidak menanggung semuanya sendirian.",
          nextSceneId: "step_5",
          reflectionKey: "seek_support",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // LANGKAH 5: Keputusan Akhir Bersama Keluarga
    // ═════════════════════════════════════════════════════════════════════════
    step_5: {
      id: "step_5",
      stepNumber: 5,
      situationContext:
        "Malam penentuan di ruang tamu rumah. Berkas informasi beasiswa dan surat rekomendasi sekolah telah kamu letakkan rapi di atas meja.",
      messages: [
        {
          id: "s5_m1",
          sender: "narrator",
          characterId: "narrator",
          text: "Lampu ruang tamu berpijar hangat. Ayah membaca lembar formulir bantuan pendidikan dengan saksama, sementara Ibu menatapmu dengan haru.",
        },
        {
          id: "s5_m2",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "{name}, Ibu ingin dengar langsung dari hatimu yang paling dalam. Apa keputusan yang benar-benar kamu inginkan untuk hidupmu?",
        },
        {
          id: "s5_m3",
          sender: "other",
          senderName: "Ayah",
          characterId: "ayah",
          characterImage: "/assets/characters/ayah.jpg",
          text: "Ayah tidak menyangka kamu sampai berjuang mencari informasi beasiswa ini ke sekolah. Bicaralah, Ayah dan Ibu siap mendengarkan.",
        },
      ],
      choices: [
        {
          id: "c5_a",
          text: "\"Ayah, Ibu... impianku adalah menyelesaikan sekolah SMA dan membanggakan kalian. Izinkan aku berjuang lewat beasiswa ini.\"",
          consequence: "Kamu menegaskan komitmen pendidikanmu dengan penuh rasa hormat dan tekad kuat.",
          nextSceneId: "ending_reflection",
          reflectionKey: "protect_boundary",
        },
        {
          id: "c5_b",
          text: "\"Aku ingin kita hadapi ini bersama sebagai keluarga. Tolong beri aku waktu 3 tahun untuk membuktikan aku bisa lulus SMA tanpa membebani Ayah.\"",
          consequence: "Kamu mengajak keluarga bermusyawarah dan saling mendukung untuk masa depan.",
          nextSceneId: "ending_reflection",
          reflectionKey: "communicate_directly",
        },
        {
          id: "c5_c",
          text: "\"Aku minta tolong Ayah dan Ibu menolak lamaran Pak Rudi dengan baik-baik, karena aku belum siap secara fisik dan mental.\"",
          consequence: "Kamu menyampaikan batasan kesiapan diri secara jujur dan transparan.",
          nextSceneId: "ending_reflection",
          reflectionKey: "seek_support",
        },
      ],
    },

    // ═════════════════════════════════════════════════════════════════════════
    // ENDING / RESOLUSI
    // ═════════════════════════════════════════════════════════════════════════
    ending_reflection: {
      id: "ending_reflection",
      stepNumber: 5,
      situationContext: "Musyawarah keluarga mencapai titik temu yang melegakan.",
      isEnding: true,
      messages: [
        {
          id: "end_m1",
          sender: "other",
          senderName: "Ayah",
          characterId: "ayah",
          characterImage: "/assets/characters/ayah.jpg",
          text: "Mendengar kesungguhanmu, Ayah merasa malu sempat meragukan impianmu. Besok Ayah akan sampaikan ke Pak Rudi bahwa kamu fokus melanjutkan sekolah.",
        },
        {
          id: "end_m2",
          sender: "other",
          senderName: "Ibu",
          characterId: "ibu",
          characterImage: "/assets/characters/ibu.jpg",
          text: "Terima kasih sudah mau bicara jujur ya, Nak. Ibu dan Ayah akan dukung perjuangan sekolahmu sekuat tenaga.",
        },
        {
          id: "end_m3",
          sender: "narrator",
          characterId: "narrator",
          text: "Sebuah beban besar terangkat dari pundakmu. Bukan karena jalan di depan pasti mudah, tapi karena kamu memilih untuk menyuarakan hak masa depanmu.",
        },
      ],
      // No choices -> Transitions directly to Cermin Keputusan
    },
  },

  reflections: {
    protect_boundary: {
      headline:
        "Dalam situasi tadi, kamu menunjukkan kegigihan kuat dalam memperjuangkan hak pendidikan dan masa depanmu.",
      whatWasGood:
        "Kamu tidak mudah menyerah pada rasa cemas orang lain, melainkan aktif mencari solusi nyata seperti beasiswa agar tetap bisa bersekolah.",
      whatToTry:
        "Pertahankan tekad belajarmu ini. Mengimbangi ketegasan prinsip dengan tetap menghormati orang tua membuat mereka semakin percaya padamu.",
      coreReminder:
        "Undang-Undang No. 16 Tahun 2019 menetapkan usia minimal perkawinan adalah 19 tahun. Pendidikan adalah hak dasar setiap remaja.",
      repropediaChapter: {
        title: "Pencegahan Perkawinan Anak & Hak Pendidikan",
        href: "/repropedia/perkawinan-anak",
      },
    },
    communicate_directly: {
      headline:
        "Dalam situasi tadi, kamu memilih jalur dialog terbuka, jujur, dan mencari musyawarah keluarga.",
      whatWasGood:
        "Bicara terus terang kepada orang tua soal isi hati dan kekhawatiranmu butuh keberanian tinggi. Kamu mengubah situasi tegang menjadi ruang diskusi.",
      whatToTry:
        "Komunikasi yang sehat memerlukan waktu. Jika di awal ada penolakan, jangan lekas putus asa—terus sediakan fakta dan penjelasan yang tenang.",
      coreReminder:
        "Suaramu sangat berharga. Membicarakan apa yang kamu rasakan kepada keluarga adalah langkah awal dari setiap keputusan yang matang.",
      repropediaChapter: {
        title: "Pencegahan Perkawinan Anak & Hak Pendidikan",
        href: "/repropedia/perkawinan-anak",
      },
    },
    seek_support: {
      headline:
        "Dalam situasi tadi, kamu bijak mencari dukungan pihak tepercaya seperti guru BK dan sahabat.",
      whatWasGood:
        "Kamu paham bahwa keputusan besar tidak harus dipikul seorang diri. Melibatkan sekolah untuk bantuan beasiswa adalah langkah cerdas.",
      whatToTry:
        "Ketika menghadapi dilema sosial atau keluarga, ingat bahwa ada banyak pihak yang siap mendampingi: guru konseling, psikolog anak, atau layanan perlindungan anak.",
      coreReminder:
        "Meminta pertolongan bukan tanda kelemahan, melainkan bukti kedewasaan dalam mengambil langkah terbaik bagi diri sendiri.",
      repropediaChapter: {
        title: "Pencegahan Perkawinan Anak & Hak Pendidikan",
        href: "/repropedia/perkawinan-anak",
      },
    },
    avoid_conflict: {
      headline:
        "Dalam situasi tadi, kamu sempat berhati-hati dan menahan diri untuk menghindari konflik dengan keluarga.",
      whatWasGood:
        "Sikap tenang dan tidak reaktif membantumu memproses rasa kaget dan memahami perasaan orang tua terlebih dahulu.",
      whatToTry:
        "Berhati-hati itu baik, namun hindari memendam masalah terlalu lama. Jika tidak disuarakan, orang lain bisa menganggap diam sebagai persetujuan.",
      coreReminder:
        "Masa depanmu adalah hidup yang akan kamu jalani sendiri. Kamu berhak untuk didengar sebelum sebuah keputusan besar diambil.",
      repropediaChapter: {
        title: "Pencegahan Perkawinan Anak & Hak Pendidikan",
        href: "/repropedia/perkawinan-anak",
      },
    },
    reconsider: {
      headline:
        "Dalam situasi tadi, kamu memilih untuk mengambil jeda dan memikirkan opsi dengan matang.",
      whatWasGood:
        "Meminta waktu untuk berpikir adalah strategi yang sangat dewasa agar tidak mengambil keputusan impulsif di bawah tekanan.",
      whatToTry:
        "Manfaatkan waktu jeda tersebut untuk berdiskusi dengan orang dewasa yang berpikiran terbuka agar kamu mendapat sudut pandang objektif.",
      coreReminder:
        "Tidak ada keputusan besar dalam hidup yang harus diambil secara terburu-buru. Waktumu untuk bertumbuh masih sangat panjang.",
      repropediaChapter: {
        title: "Pencegahan Perkawinan Anak & Hak Pendidikan",
        href: "/repropedia/perkawinan-anak",
      },
    },
  },
};