export interface LocalQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizTopic {
  id: string;
  slug: string;
  aliases: string[];
  title: string;
  shortTitle: string;
  categoryName: string;
  description: string;
  duration: string;
  image: string;
  accentColor: string;
  fallbackQuestions: LocalQuestion[];
}

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: "cat_repro",
    slug: "pubertas",
    aliases: ["kesehatan-reproduksi", "reproduksi"],
    title: "Kesehatan Reproduksi & Pubertas",
    shortTitle: "Pubertas & Higienitas",
    categoryName: "Pubertas",
    description:
      "Pahami masa pubertas, perubahan fisik dan hormon tubuh, serta panduan praktis merawat kebersihan organ reproduksi harian tanpa rasa canggung.",
    duration: "5 Menit",
    image: "/assets/quiz/reproduksi_pubertas.webp",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "rep1",
        questionText:
          "Hormon utama yang memicu perkembangan fisik dan kematangan reproduksi pada remaja perempuan saat pubertas adalah...",
        options: [
          "Testosteron",
          "Estrogen dan Progesteron",
          "Adrenalin",
          "Melatonin",
        ],
        correctAnswer: 1,
        explanation:
          "Hormon estrogen dan progesteron diproduksi oleh ovarium (indung telur) saat pubertas dan memicu perkembangan payudara, pinggul, serta siklus menstruasi.",
      },
      {
        id: "rep2",
        questionText:
          "Apa istilah medis untuk menstruasi pertama yang dialami oleh remaja perempuan?",
        options: ["Menarche", "Menopause", "Ovulasi", "Pubarke"],
        correctAnswer: 0,
        explanation:
          "Menarche adalah peristiwa menstruasi pertama pada perempuan, menandakan organ reproduksi mulai aktif memproduksi sel telur secara alami.",
      },
      {
        id: "rep3",
        questionText:
          "Berapa kali minimal kita sebaiknya mengganti pakaian dalam setiap hari agar area intim tetap sehat?",
        options: [
          "1 kali sehari",
          "Minimal 2 kali sehari",
          "Tiga hari sekali",
          "Hanya saat pakaian kotor saja",
        ],
        correctAnswer: 1,
        explanation:
          "Mengganti pakaian dalam minimal 2 kali sehari (terutama setelah beraktivitas atau berkeringat) mencegah kelembapan berlebih yang memicu jamur dan bakteri.",
      },
      {
        id: "rep4",
        questionText:
          "Saat remaja perempuan sedang mengalami menstruasi, berapa jam sekali pembalut sebaiknya diganti secara teratur?",
        options: [
          "1 kali sehari saat malam hari",
          "Setiap 3 sampai 4 jam sekali atau saat sudah terasa penuh",
          "Dua hari sekali",
          "Hanya saat mandi pagi saja",
        ],
        correctAnswer: 1,
        explanation:
          "Mengganti pembalut tiap 3-4 jam menjaga kebersihan area kewanitaan, mencegah penumpukan kuman, dan menjaga rasa nyaman selama beraktivitas di sekolah.",
      },
      {
        id: "rep5",
        questionText:
          "Peristiwa alami keluarnya cairan sperma saat tidur pada remaja laki-laki yang sedang pubertas biasa disebut...",
        options: [
          "Mengigau",
          "Mimpi basah",
          "Sleepwalking",
          "Insomnia",
        ],
        correctAnswer: 1,
        explanation:
          "Mimpi basah adalah hal yang wajar, normal, dan sehat bagi remaja laki-laki, menandakan testis sudah mulai aktif memproduksi cairan sperma.",
      },
      {
        id: "rep6",
        questionText:
          "Perubahan fisik yang umumnya terjadi pada remaja laki-laki saat memasuki masa pubertas adalah...",
        options: [
          "Suara menjadi lebih berat dan jakun mulai terlihat",
          "Mengalami siklus menstruasi",
          "Pinggul melebar secara drastis",
          "Tinggi badan berhenti bertambah",
        ],
        correctAnswer: 0,
        explanation:
          "Saat pubertas, hormon testosteron pada laki-laki memicu penebalan pita suara (suara memberat), tumbuhnya jakun di leher, serta pelebaran bahu dada.",
      },
      {
        id: "rep7",
        questionText:
          "Cara yang benar membersihkan area kemaluan bagi perempuan setelah buang air kecil adalah...",
        options: [
          "Dari arah belakang ke depan",
          "Dari arah depan ke belakang menuju anus",
          "Menggunakan sabun mandi berbusa tebal",
          "Cukup diusap tanpa dibilas air bersih",
        ],
        correctAnswer: 1,
        explanation:
          "Membasuh dari arah depan ke belakang mencegah kuman dan bakteri dari anus berpindah ke saluran kencing yang dapat menyebabkan infeksi kandung kemih.",
      },
      {
        id: "rep8",
        questionText:
          "Saat pubertas, kelenjar keringat dan minyak bekerja lebih aktif. Cara terbaik agar tidak bau badan dan tidak mudah berjerawat adalah...",
        options: [
          "Memakai parfum sebanyak-banyaknya tanpa mandi",
          "Mandi teratur 2 kali sehari dan mencuci wajah dengan sabun yang lembut",
          "Memencet jerawat yang baru tumbuh",
          "Menghindari minum air putih",
        ],
        correctAnswer: 1,
        explanation:
          "Mandi teratur dan mencuci muka dengan lembut membersihkan debu serta minyak berlebih di pori-pori kulit secara sehat tanpa memicu iritasi.",
      },
      {
        id: "rep9",
        questionText:
          "Setelah buang air atau mandi, apa yang harus dilakukan sebelum memakai celana dalam kembali?",
        options: [
          "Membiarkannya basah dan langsung memakai celana tebal",
          "Mengeringkan area kemaluan dengan handuk atau tisu bersih",
          "Mengoleskan bedak tabur tebal",
          "Memakai pakaian yang masih lembap",
        ],
        correctAnswer: 1,
        explanation:
          "Mengeringkan area intim dengan handuk atau tisu bersih memastikan pakaian dalam tidak basah atau lembap, sehingga bebas dari rasa gatal dan iritasi.",
      },
      {
        id: "rep10",
        questionText:
          "Jika kamu memiliki pertanyaan atau kebingungan seputar perubahan tubuhmu saat puber, kepada siapa sebaiknya kamu bertanya?",
        options: [
          "Orang tua, guru BK, atau tenaga kesehatan/konselor sebaya tepercaya",
          "Orang asing yang baru dikenal di media sosial",
          "Membaca forum gosip acak di internet",
          "Memendamnya sendirian karena merasa malu",
        ],
        correctAnswer: 0,
        explanation:
          "Orang tua, guru BK, dan konselor kesehatan sebaya adalah sumber informasi yang tepat, aman, ilmiah, dan tepercaya untuk diajak berdiskusi tentang pubertas.",
      },
    ],
  },
  {
    id: "cat_marriage",
    slug: "pernikahan-anak",
    aliases: ["pencegahan-perkawinan-anak", "perkawinan-anak"],
    title: "Pencegahan Perkawinan Anak",
    shortTitle: "Stop Nikah Dini",
    categoryName: "Pencegahan Pernikahan Dini",
    description:
      "Ketahui batasan usia legal perkawinan 19 tahun sesuai UU No. 16/2019, risiko medis kehamilan terlalu muda, dan pentingnya menuntaskan pendidikan.",
    duration: "5 Menit",
    image: "/assets/quiz/perkawinan_anak.webp",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "mar1",
        questionText:
          "Berapakah batas usia minimal untuk melangsungkan pernikahan baik bagi laki-laki maupun perempuan sesuai UU No. 16 Tahun 2019 di Indonesia?",
        options: ["16 tahun", "17 tahun", "18 tahun", "19 tahun"],
        correctAnswer: 3,
        explanation:
          "Undang-Undang No. 16 Tahun 2019 menetapkan bahwa perkawinan hanya diizinkan apabila pria dan wanita sudah mencapai umur minimal 19 tahun demi melindungi masa depan anak.",
      },
      {
        id: "mar2",
        questionText:
          "Mengapa perempuan berusia di bawah 19 tahun sangat berisiko jika hamil dan melahirkan?",
        options: [
          "Panggul dan organ reproduksi belum berkembang matang sempurna",
          "Nafsu makan berkurang drastis",
          "Kuku jari tumbuh lebih cepat",
          "Tinggi badan akan bertambah dua kali lipat",
        ],
        correctAnswer: 0,
        explanation:
          "Tulang panggul perempuan baru matang sempurna di atas usia 19 tahun. Hamil di usia terlalu muda berisiko tinggi persalinan macet, pendarahan hebat, hingga preeklamsia.",
      },
      {
        id: "mar3",
        questionText:
          "Mengapa perkawinan usia anak dapat memperpanjang rantai kemiskinan antargenerasi?",
        options: [
          "Karena dilarang menabung oleh bank",
          "Memicu putus sekolah sehingga membatasi keterampilan untuk memperoleh pekerjaan layak",
          "Karena biaya pernikahan terlalu murah",
          "Karena pasangan baru wajib pindah dari desa",
        ],
        correctAnswer: 1,
        explanation:
          "Pernikahan dini sering memaksa remaja meninggalkan bangku sekolah. Rendahnya tingkat pendidikan membatasi akses keterampilan untuk memperoleh pekerjaan dengan pendapatan yang layak.",
      },
      {
        id: "mar4",
        questionText:
          "Bayi yang dilahirkan oleh ibu yang masih berusia anak-anak memiliki risiko kesehatan lebih tinggi mengalami...",
        options: [
          "Gigi tumbuh sejak hari pertama lahir",
          "Stunting (gagal tumbuh) dan berat badan lahir rendah (BBLR)",
          "Kelebihan sel darah putih alami",
          "Penglihatan super di malam hari",
        ],
        correctAnswer: 1,
        explanation:
          "Karena rahim dan asupan nutrisi ibu remaja belum matang optimal, janin berisiko lahir sebelum waktunya (prematur), berbobot rendah, dan rentan stunting.",
      },
      {
        id: "mar5",
        questionText:
          "Mengapa kesiapan mental dan emosional sangat penting sebelum seseorang memutuskan berumah tangga di masa dewasa?",
        options: [
          "Supaya bisa pamer di media sosial",
          "Membina keluarga butuh kematangan emosi, tanggung jawab nafkah, dan saling menghargai",
          "Agar tidak perlu belajar dan sekolah lagi",
          "Supaya bebas bermain game sepanjang hari",
        ],
        correctAnswer: 1,
        explanation:
          "Menikah bukan sekadar hidup bersama, melainkan membutuhkan kedewasaan dalam memecahkan masalah, mengasuh anak, serta stabilitas emosi yang matang.",
      },
      {
        id: "mar6",
        questionText:
          "Apa faktor yang sering menjadi pemicu terjadinya perkawinan usia anak di lingkungan masyarakat?",
        options: [
          "Terlalu rajin membaca buku pelajaran",
          "Tekanan ekonomi keluarga, pergaulan bebas tanpa batas, dan kurangnya pemahaman kesehatan",
          "Gemar berolahraga bersama teman sekolah",
          "Aktif mengikuti ekstrakurikuler kepramukaan",
        ],
        correctAnswer: 1,
        explanation:
          "Himpitan ekonomi, informasi kesehatan reproduksi yang minim, serta pengaruh pergaulan bebas sering kali menjadi pemicu utama pernikahan dini.",
      },
      {
        id: "mar7",
        questionText:
          "Apa yang sebaiknya kamu lakukan jika ada teman sekelas yang bercerita bahwa ia terancam dinikahkan paksa oleh keluarganya?",
        options: [
          "Menertawakan dan menyebarkan gosip ke teman lain",
          "Mendengarkan dengan peduli dan menyarankan untuk lapor ke guru BK atau dinas perlindungan anak",
          "Menyuruh teman tersebut kabur sendirian tanpa tujuan",
          "Pura-pura tidak mendengar dan menjauhinya",
        ],
        correctAnswer: 1,
        explanation:
          "Guru BK dan lembaga perlindungan anak memiliki wewenang untuk memberikan mediasi keluarga dan bantuan advokasi agar hak bersekolah anak tetap terlindungi.",
      },
      {
        id: "mar8",
        questionText:
          "Menikah di usia yang cukup dan matang (di atas 19 tahun) memberikan banyak manfaat, KECUALI...",
        options: [
          "Organ reproduksi sudah siap untuk menjalani kehamilan yang sehat",
          "Pendidikan dasar dan menengah sudah selesai ditempuh",
          "Menghilangkan seluruh kewajiban untuk bekerja keras dan bertanggung jawab",
          "Kematangan berpikir dan kestabilan emosi jauh lebih baik",
        ],
        correctAnswer: 2,
        explanation:
          "Menikah di usia dewasa tetap menuntut tanggung jawab dan kerja keras, namun dijalani dengan kesiapan fisik, mental, dan ekonomi yang jauh lebih matang.",
      },
      {
        id: "mar9",
        questionText:
          "Program pemerintah mengenai 'Pendewasaan Usia Perkawinan (PUP)' bertujuan untuk...",
        options: [
          "Melarang semua orang untuk menikah seumur hidup",
          "Mendorong remaja merencanakan masa depan dan matang sebelum membina rumah tangga",
          "Memaksa anak SMP untuk bekerja mencari nafkah",
          "Mengurangi jumlah sekolah di setiap kecamatan",
        ],
        correctAnswer: 1,
        explanation:
          "Program PUP mengedukasi masyarakat agar merencanakan pernikahan pada usia ideal demi melahirkan generasi yang sehat, cerdas, dan sejahtera lahir batin.",
      },
      {
        id: "mar10",
        questionText:
          "Peran terbaik yang bisa dilakukan oleh siswa SMP seperti kamu dalam mencegah pernikahan anak adalah...",
        options: [
          "Fokus belajar, aktif mengejar cita-cita, dan saling mengingatkan teman tentang bahaya nikah dini",
          "Mencoba pacaran bebas tanpa batas",
          "Memutuskan berhenti sekolah demi mencari uang jajan",
          "Menolak berteman dengan orang yang pintar",
        ],
        correctAnswer: 0,
        explanation:
          "Remaja yang berpendidikan dan saling mendukung dapat menjadi agen perubahan positif di lingkungannya untuk menolak perkawinan anak.",
      },
    ],
  },
  {
    id: "cat_rights",
    slug: "hak-anak",
    aliases: ["hak-hak-anak"],
    title: "Hak-Hak Anak & Perlindungan",
    shortTitle: "Hak Asasi Anak",
    categoryName: "Hak Anak",
    description:
      "Pahami empat pilar hak fundamental anak berdasarkan Konvensi Hak Anak PBB untuk melindungi diri sendiri dan membela sesama rekan sebaya.",
    duration: "5 Menit",
    image: "/assets/quiz/hak_anak.webp",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "rig1",
        questionText:
          "Menurut undang-undang perlindungan anak dan konvensi resmi PBB, batasan seseorang disebut sebagai 'anak' adalah...",
        options: [
          "Setiap orang yang berusia di bawah 18 tahun",
          "Hanya mereka yang masih balita",
          "Hanya mereka yang belum masuk sekolah",
          "Siapa saja yang belum memiliki pekerjaan tetap",
        ],
        correctAnswer: 0,
        explanation:
          "Berdasarkan UU Perlindungan Anak dan Konvensi PBB, anak adalah siapa saja yang belum berusia 18 tahun, termasuk anak yang masih dalam kandungan.",
      },
      {
        id: "rig2",
        questionText:
          "Berikut ini adalah empat pilar hak dasar anak berdasarkan Konvensi Hak Anak PBB, KECUALI...",
        options: [
          "Hak kelangsungan hidup",
          "Hak tumbuh kembang",
          "Hak memiliki kekayaan pribadi melimpah",
          "Hak perlindungan dan partisipasi",
        ],
        correctAnswer: 2,
        explanation:
          "Empat pilar hak dasar anak adalah: hak kelangsungan hidup, hak tumbuh kembang, hak perlindungan, dan hak partisipasi. Memiliki kekayaan pribadi bukan hak dasar anak.",
      },
      {
        id: "rig3",
        questionText:
          "Contoh pemenuhan hak tumbuh kembang anak dalam kehidupan sehari-hari adalah...",
        options: [
          "Memperoleh pendidikan yang layak, gizi seimbang, dan ruang bermain yang aman",
          "Dibiarkan bekerja kasar di jalanan dari pagi hingga malam",
          "Dilarang membaca buku pelajaran sekolah",
          "Dipaksa mencari nafkah untuk orang dewasa",
        ],
        correctAnswer: 0,
        explanation:
          "Hak tumbuh kembang menjamin anak mendapatkan pendidikan bermutu, gizi sehat, kasih sayang keluarga, serta kesempatan bermain untuk masa depan terbaiknya.",
      },
      {
        id: "rig4",
        questionText:
          "Hak anak untuk menyuarakan pendapat dan didengarkan pandangannya dalam forum atau keluarga termasuk ke dalam pilar...",
        options: [
          "Hak kelangsungan hidup",
          "Hak partisipasi",
          "Hak monopoli",
          "Hak kepemilikan barang",
        ],
        correctAnswer: 1,
        explanation:
          "Hak partisipasi menjamin kebebasan anak untuk menyampaikan aspirasi, didengarkan pandangannya, serta diikutsertakan dalam dialog hal yang berkaitan dengannya.",
      },
      {
        id: "rig5",
        questionText:
          "Jika ada anak yang dipaksa bekerja kasar seharian sehingga putus sekolah, hak apa yang paling dilanggar?",
        options: [
          "Hak mendapatkan waktu santai di pusat perbelanjaan",
          "Hak perlindungan dari eksploitasi ekonomi dan hak atas pendidikan",
          "Hak mengendarai mobil pribadi",
          "Hak membeli barang elektronik mahal",
        ],
        correctAnswer: 1,
        explanation:
          "Memaksa anak bekerja keras dan merampas hak belajarnya adalah bentuk eksploitasi anak yang melanggar hak perlindungan dan hak pendidikan dasar.",
      },
      {
        id: "rig6",
        questionText:
          "Dokumen resmi negara yang menjadi bukti identitas sah seorang anak sejak lahir di Indonesia adalah...",
        options: [
          "Akta Kelahiran dan Kartu Identitas Anak (KIA)",
          "Surat Izin Mengemudi (SIM)",
          "Buku tabungan rekening saham",
          "Kartu langganan bioskop",
        ],
        correctAnswer: 0,
        explanation:
          "Akta kelahiran dan KIA adalah dokumen identitas resmi yang menjamin status kewarganegaraan, akses pendaftaran sekolah, dan jaminan layanan kesehatan anak.",
      },
      {
        id: "rig7",
        questionText:
          "Apa yang dimaksud dengan prinsip 'Non-Diskriminasi' dalam pemenuhan hak anak?",
        options: [
          "Semua anak berhak dilindungi tanpa membedakan suku, agama, jenis kelamin, atau kondisi fisik",
          "Hanya anak yang kaya yang berhak mendapatkan pendidikan",
          "Anak perempuan dilarang ikut berpendapat di kelas",
          "Hanya anak yang berprestasi yang dilindungi hukum",
        ],
        correctAnswer: 0,
        explanation:
          "Prinsip non-diskriminasi menegaskan bahwa setiap anak berhak atas perlindungan dan kesempatan yang setara tanpa dibeda-bedakan latar belakangnya.",
      },
      {
        id: "rig8",
        questionText:
          "Hak perlindungan anak memastikan bahwa setiap anak wajib dilindungi dari hal-hal berikut, KECUALI...",
        options: [
          "Kekerasan fisik dan pelecehan",
          "Perundungan (bullying) di sekolah",
          "Bimbingan belajar dan nasihat penuh kasih dari orang tua",
          "Penelantaran dan eksploitasi",
        ],
        correctAnswer: 2,
        explanation:
          "Nasihat dan bimbingan belajar positif dari orang tua adalah wujud kasih sayang dan pengasuhan keluarga yang baik, bukan bentuk kekerasan.",
      },
      {
        id: "rig9",
        questionText:
          "Siapakah pihak yang paling bertanggung jawab dalam memenuhi dan melindungi hak-hak anak?",
        options: [
          "Keluarga, orang tua, sekolah, masyarakat sekitar, dan pemerintah",
          "Hanya anak itu sendiri",
          "Teman bermain game saja",
          "Akun media sosial di internet",
        ],
        correctAnswer: 0,
        explanation:
          "Perlindungan anak adalah tanggung jawab bersama yang melibatkan orang tua, keluarga besar, guru di sekolah, lingkungan masyarakat, dan negara.",
      },
      {
        id: "rig10",
        questionText:
          "Wadah organisasi resmi di Indonesia yang dibentuk agar anak dan remaja dapat menyuarakan aspirasi kepada pemerintah disebut...",
        options: [
          "Forum Anak",
          "Klub Balap Liar",
          "Komite Karyawan",
          "Arisan Remaja",
        ],
        correctAnswer: 0,
        explanation:
          "Forum Anak adalah wadah partisipasi resmi binaan KemenPPPA agar anak dan remaja dapat menyalurkan pandangan serta aspirasinya bagi pembangunan daerah.",
      },
    ],
  },
  {
    id: "cat_violence",
    slug: "kekerasan-seksual",
    aliases: ["batasan-diri", "pencegahan-kekerasan"],
    title: "Batasan Diri & Pencegahan Kekerasan Seksual",
    shortTitle: "Batasan & Konsen",
    categoryName: "Pencegahan Kekerasan",
    description:
      "Kenali aturan sentuhan aman (safe touch), konsep persetujuan (consent), keberanian berkata tidak, dan alur rujukan bantuan yang aman.",
    duration: "5 Menit",
    image: "/assets/quiz/batasan_diri.webp",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "vio1",
        questionText:
          "Area tubuh mana sajakah yang merupakan area pribadi dan TIDAK BOLEH disentuh atau dilihat oleh orang lain sembarangan?",
        options: [
          "Area yang tertutup baju renang (dada, bibir, kemaluan, dan pantat)",
          "Kuku jari tangan dan kaki",
          "Rambut kepala saja",
          "Siku dan telapak tangan",
        ],
        correctAnswer: 0,
        explanation:
          "Bagian pribadi tubuh kita meliputi area yang tertutup pakaian renang (dada, kemaluan, pantat, dan bibir). Tidak ada yang boleh menyentuh, melihat, atau memotretnya sembarangan!",
      },
      {
        id: "vio2",
        questionText:
          "Apa contoh dari 'Sentuhan Aman' (Safe Touch) dalam pergaulan sehari-hari?",
        options: [
          "Sentuhan rahasia yang tidak boleh diceritakan ke orang tua",
          "Berjabat tangan dengan teman atau mencium tangan guru/orang tua saat berpamitan",
          "Sentuhan paksa yang membuatmu merasa takut dan malu",
          "Sentuhan di area dada oleh orang yang baru dikenal",
        ],
        correctAnswer: 1,
        explanation:
          "Sentuhan aman adalah sentuhan hangat penuh rasa hormat, membuatmu merasa nyaman, wajar, dan tidak disembunyikan sebagai rahasia yang mencurigakan.",
      },
      {
        id: "vio3",
        questionText:
          "Apa yang harus kamu lakukan jika ada orang (bahkan yang kamu kenal) berusaha menyentuh area pribadimu atau mengajak melakukan hal tak senonoh?",
        options: [
          "Diam saja karena takut dia marah",
          "Katakan TIDAK dengan tegas, lari ke tempat aman, dan segera lapor ke orang tua atau guru",
          "Menuruti permintaannya agar diberi uang saku",
          "Menyimpan rahasia tersebut sendirian di buku harian",
        ],
        correctAnswer: 1,
        explanation:
          "Ingat aturan emas: TOLAK, LARI, LAPORKAN! Tegaskan penolakanmu, jauhi orang tersebut, dan langsung ceritakan kepada orang dewasa yang kamu percaya.",
      },
      {
        id: "vio4",
        questionText:
          "Seseorang di media sosial meminta kamu mengirimkan foto tanpa busana atau pakaian dalam dengan janji akan diberi hadiah. Apa tindakanmu?",
        options: [
          "Mengirimkannya karena dia berjanji tidak akan menyebarkannya",
          "Tolak tegas, jangan kirimkan foto apa pun, blokir akunnya, dan beri tahu orang tua/guru",
          "Mengirimkan foto teman lain",
          "Membalas dengan mengirimkan nomor rekening bank",
        ],
        correctAnswer: 1,
        explanation:
          "Ini adalah modus Kekerasan Berbasis Gender Online (KBGO). Jangan pernah membagikan foto pribadi kepada siapa pun di internet karena berisiko disalahgunakan untuk pemerasan.",
      },
      {
        id: "vio5",
        questionText:
          "Mengapa pelaku kekerasan atau pelecehan seksual sering menyuruh korbannya untuk 'merahasiakan kejadian ini'?",
        options: [
          "Karena pelaku ingin memberi pesta kejutan",
          "Untuk menakut-nakuti korban agar kejahatan pelaku tidak terbongkar",
          "Karena itu adalah permainan rahasia yang menyenangkan",
          "Agar korban disayang oleh keluarga di rumah",
        ],
        correctAnswer: 1,
        explanation:
          "Pelaku mengancam agar korban merasa takut dan bersalah. Ingat: korban sama sekali tidak bersalah, kesalahan 100% ada pada pihak pelaku!",
      },
      {
        id: "vio6",
        questionText:
          "Apakah menggoda dengan siulan nakal (catcalling), komentar berbau porno, atau memegang tubuh tanpa izin termasuk bentuk pelecehan seksual?",
        options: [
          "Ya, itu adalah pelecehan verbal dan fisik yang melanggar kenyamanan orang lain",
          "Tidak, itu hanya lelucon biasa yang tidak perlu dipikirkan",
          "Hanya pelecehan jika dilakukan di malam hari",
          "Hal yang wajar dilakukan antar sesama remaja",
        ],
        correctAnswer: 0,
        explanation:
          "Segala bentuk ucapan, siulan bernada cabul, maupun sentuhan tubuh tanpa persetujuan adalah bentuk pelecehan yang merendahkan martabat orang lain.",
      },
      {
        id: "vio7",
        questionText:
          "Apa yang dimaksud dengan konsep 'Konsen' (Consent) atau persetujuan dalam interaksi antarteman?",
        options: [
          "Memaksa teman menuruti apa pun keinginan kita",
          "Kesepakatan sukarela yang diberikan dengan sadar tanpa paksaan atau ancaman",
          "Mengambil barang teman tanpa izin terlebih dahulu",
          "Berpura-pura setuju karena takut dijauhi teman sekelompok",
        ],
        correctAnswer: 1,
        explanation:
          "Konsen berarti kedua belah pihak benar-benar setuju dan merasa nyaman secara sukarela tanpa ada rasa takut, terpaksa, ataupun intimidasi.",
      },
      {
        id: "vio8",
        questionText:
          "Kapan seorang dokter atau tenaga medis boleh memeriksa area pribadi tubuhmu?",
        options: [
          "Kapan saja tanpa izin",
          "Hanya saat pemeriksaan kesehatan resmi dan wajib didampingi oleh orang tua atau perawat",
          "Di ruangan tertutup sepi tanpa memberi tahu orang tua",
          "Saat tidak ada keluhan sakit sama sekali",
        ],
        correctAnswer: 1,
        explanation:
          "Pemeriksaan medis di area sensitif hanya boleh dilakukan untuk alasan kesehatan profesional dan wajib selalu didampingi oleh orang tua atau tenaga medis pendamping.",
      },
      {
        id: "vio9",
        questionText:
          "Jika seorang sahabat menceritakan bahwa dia mengalami pelecehan seksual, sikap terbaik apa yang harus kamu tunjukkan?",
        options: [
          "Menyalahkan pakaiannya atau menuduhnya berbohong",
          "Percayai ceritanya, beri dukungan moral, dan temani dia melapor ke guru BK/orang tua",
          "Menyebarkan ceritanya di grup chat sekolah agar viral",
          "Menyuruhnya melupakan kejadian itu begitu saja",
        ],
        correctAnswer: 1,
        explanation:
          "Jangan pernah menyalahkan korban (victim blaming). Dengarkan ceritanya dengan empati, jaga privasinya, dan bantu dia mendapatkan pertolongan aman dari pihak berwenang.",
      },
      {
        id: "vio10",
        questionText:
          "Layanan pengaduan resmi dari Kementerian Pemberdayaan Perempuan dan Perlindungan Anak (KemenPPPA) untuk pelaporan kekerasan adalah...",
        options: [
          "Sahabat Perempuan dan Anak (Hotline SAPA 129)",
          "Call Center Pulsa Darurat",
          "Hotline Game Online Nusantara",
          "Layanan Cuaca Nasional",
        ],
        correctAnswer: 0,
        explanation:
          "SAPA 129 adalah layanan hotline resmi bebas pulsa untuk melaporkan kekerasan terhadap perempuan dan anak di seluruh wilayah Indonesia.",
      },
    ],
  },
  {
    id: "cat_mental",
    slug: "kesehatan-mental",
    aliases: ["mental-remaja"],
    title: "Kesehatan Mental & Relasi Sehat",
    shortTitle: "Kesehatan Mental",
    categoryName: "Kesehatan Mental",
    description:
      "Identifikasi tanda kecemasan berlebih, cara merespons cyberbullying, pentingnya digital detox, serta cara membangun persahabatan yang saling mendukung.",
    duration: "5 Menit",
    image: "/assets/quiz/kesehatan_mental.webp",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "men1",
        questionText:
          "Apa yang dimaksud dengan 'kesehatan mental' yang baik pada diri seorang remaja?",
        options: [
          "Selalu tertawa bahagia setiap saat tanpa pernah merasa sedih",
          "Kondisi emosi, pikiran, dan perilaku yang sehat sehingga mampu mengatasi stres dan belajar dengan baik",
          "Tidak pernah memiliki masalah sama sekali di rumah maupun sekolah",
          "Memiliki banyak barang mewah dan pengikut media sosial",
        ],
        correctAnswer: 1,
        explanation:
          "Kesehatan mental yang baik membuat kita mampu berpikir jernih, mengelola emosi (baik rasa senang maupun sedih), dan beradaptasi menghadapi tantangan belajar.",
      },
      {
        id: "men2",
        questionText:
          "Menghadapi pekan ujian sekolah yang membuatmu cemas dan tegang, cara mengelola stres yang paling sehat adalah...",
        options: [
          "Begadang semalaman sambil terus meminum kopi berlebihan",
          "Mencicil belajar secara teratur, latihan pernapasan santai, dan tidur yang cukup",
          "Menyerah dan memutuskan tidak ikut ujian sama sekali",
          "Melampiaskan kemarahan dengan membentak teman dan adik",
        ],
        correctAnswer: 1,
        explanation:
          "Mencicil belajar membuat otak tidak kelelahan, sementara tidur cukup dan latihan napas dalam membantu menenangkan detak jantung serta meredakan kecemasan.",
      },
      {
        id: "men3",
        questionText:
          "Ciri-ciri hubungan pertemanan yang sehat (healthy friendship) adalah...",
        options: [
          "Saling mendukung dalam hal positif, saling menghargai, dan tidak menjatuhkan teman",
          "Hanya mau berteman jika kita mentraktir makanan setiap hari",
          "Suka mengajak kita melanggar aturan sekolah demi terlihat keren",
          "Sering mengejek kekurangan fisik kita di depan orang banyak",
        ],
        correctAnswer: 0,
        explanation:
          "Pertemanan yang sehat dibangun atas rasa saling percaya, kejujuran, saling menghargai batasan pribadi, dan saling menyemangati untuk berkembang bersama.",
      },
      {
        id: "men4",
        questionText:
          "Ciri pertemanan yang tidak sehat (toxic friendship) yang perlu kamu waspadai adalah...",
        options: [
          "Teman yang mengajak belajar kelompok bersama di perpustakaan",
          "Teman yang suka memanipulasi, sering mengejek, dan memaksa kita melakukan hal buruk",
          "Teman yang meminjamkan catatan pelajaran saat kita sakit",
          "Teman yang mengucapkan selamat saat kita meraih prestasi",
        ],
        correctAnswer: 1,
        explanation:
          "Hubungan pertemanan toxic membuat kita merasa tertekan, rendah diri, dan merasa bersalah tanpa alasan. Penting untuk menetapkan batasan yang tegas.",
      },
      {
        id: "men5",
        questionText:
          "Jika kamu merasa sangat sedih, cemas, atau hampa selama berminggu-minggu, tindakan terbaik yang harus dilakukan adalah...",
        options: [
          "Mengurung diri di kamar dan menolak berbicara dengan siapa pun",
          "Berani bercerita kepada orang tua, guru BK, atau konselor sebaya tepercaya",
          "Melakukan hal berbahaya yang merugikan tubuh sendiri",
          "Berpura-pura bahagia dan memendam semua beban sendirian",
        ],
        correctAnswer: 1,
        explanation:
          "Meminta pertolongan bukan tanda kelemahan, melainkan bukti keberanian untuk pulih. Berbagi cerita dengan orang tepercaya meringankan beban emosi kita.",
      },
      {
        id: "men6",
        questionText:
          "Tindakan sengaja menghina, mempermalukan, atau menyebarkan gosip jahat tentang teman di media sosial disebut...",
        options: [
          "Cyberbullying (Perundungan Siber)",
          "Diskusi Ilmiah Online",
          "Kerja Kelompok Digital",
          "Literasi Budaya Siber",
        ],
        correctAnswer: 0,
        explanation:
          "Cyberbullying adalah bentuk perundungan di dunia maya yang dapat melukai kesehatan mental korban secara mendalam. Jangan pernah melakukannya!",
      },
      {
        id: "men7",
        questionText:
          "Mengapa mengambil jeda sejenak dari media sosial (Digital Detox) bermanfaat bagi kesehatan pikiran remaja?",
        options: [
          "Supaya kuota internet habis terbuang sia-sia",
          "Memberi pikiran waktu istirahat agar tidak terus-menerus membandingkan diri dengan kehidupan orang lain",
          "Agar kita tidak memiliki teman lagi di sekolah",
          "Karena layar handphone akan rusak jika sering dinyalakan",
        ],
        correctAnswer: 1,
        explanation:
          "Terlalu lama di media sosial sering memicu rasa rendah diri dan cemas. Jeda layar membantu kita lebih fokus pada dunia nyata, hobi, dan kualitas tidur.",
      },
      {
        id: "men8",
        questionText:
          "Apa yang sebaiknya kamu lakukan jika melihat ada teman sekelas yang sedang diejek atau dikucilkan oleh kelompok lain?",
        options: [
          "Ikut menertawakannya agar dianggap gaul dan punya banyak teman",
          "Menemani teman tersebut, menolak ikut mengejek, dan melapor ke guru jika terus berlanjut",
          "Merekam kejadian itu dan menyebarkannya di status media sosial",
          "Menjauhi teman tersebut agar kita tidak ikut dijadikan sasaran",
        ],
        correctAnswer: 1,
        explanation:
          "Menjadi pembela (upstander) dengan menunjukkan kepedulian dapat menyelamatkan rasa percaya diri dan kesehatan mental teman yang sedang dirundung.",
      },
      {
        id: "men9",
        questionText:
          "Mengapa tidur malam yang cukup (sekitar 8-9 jam bagi remaja) sangat penting bagi kesehatan mental?",
        options: [
          "Supaya tidak perlu bangun pagi untuk sarapan",
          "Membantu otak memulihkan energi, menstabilkan emosi, dan meningkatkan konsentrasi belajar",
          "Karena mimpi malam hari otomatis meningkatkan nilai rapor",
          "Supaya waktu berolahraga di siang hari berkurang",
        ],
        correctAnswer: 1,
        explanation:
          "Kurang tidur membuat remaja mudah lelah, cemas, sensitif, dan sulit fokus di kelas. Istirahat yang cukup adalah fondasi kesehatan mental dan fisik yang prima.",
      },
      {
        id: "men10",
        questionText:
          "Kalimat afirmasi positif terbaik yang bisa kamu katakan pada dirimu sendiri saat merasa gagal atau berbuat kesalahan adalah...",
        options: [
          "'Aku memang bodoh dan tidak akan pernah berhasil.'",
          "'Wajar jika aku berbuat salah, aku bisa belajar dari pengalaman ini dan mencoba lagi dengan lebih baik.'",
          "'Pasti semua orang di sekolah sekarang membenciku.'",
          "'Lebih baik aku tidak usah mencoba apa pun lagi seumur hidup.'",
        ],
        correctAnswer: 1,
        explanation:
          "Menyayangi diri sendiri (self-compassion) dan berpikir positif membantu kita bangkit dari kegagalan dengan semangat baru untuk terus bertumbuh.",
      },
    ],
  },
];

export function getQuizTopicBySlug(slug: string): QuizTopic | null {
  const normalized = slug.toLowerCase().trim();
  const found = QUIZ_TOPICS.find(
    (t) => t.slug === normalized || t.aliases.includes(normalized),
  );
  return found || null;
}
