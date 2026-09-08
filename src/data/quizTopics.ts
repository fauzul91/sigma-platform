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
      "Pahami masa pubertas, perubahan hormon fisik tubuh, serta panduan praktis merawat kebersihan organ reproduksi harian tanpa rasa canggung.",
    duration: "3 Menit",
    image: "/assets/quiz/reproduksi_pubertas.svg",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "rep1",
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
          "Hormon estrogen dan progesteron diproduksi oleh ovarium (indung telur) perempuan saat pubertas dan memicu pembentukan payudara, pelebaran panggul, serta siklus menstruasi.",
      },
      {
        id: "rep2",
        questionText:
          "Apa istilah medis yang digunakan untuk menggambarkan menstruasi pertama pada anak perempuan?",
        options: ["Menarche", "Menopause", "Ovulasi", "Pubarke"],
        correctAnswer: 0,
        explanation:
          "Menarche adalah tanda biologis pertama dari kedewasaan organ reproduksi perempuan, menandai dimulainya fungsi siklus rahim dan kesiapan sel telur.",
      },
      {
        id: "rep3",
        questionText:
          "Berapa kali minimal celana dalam sebaiknya diganti dalam sehari untuk menjaga kebersihan reproduksi?",
        options: [
          "1 kali sehari",
          "2 kali sehari",
          "3 kali sehari",
          "Hanya saat mandi saja",
        ],
        correctAnswer: 1,
        explanation:
          "Mengganti celana dalam minimal 2 kali sehari mencegah kelembapan berlebih yang dapat memicu pertumbuhan jamur Candida dan bakteri berbahaya di area intim.",
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
      "Ketahui batasan usia legal perkawinan 19 tahun sesuai UU No. 16/2019, risiko medis kehamilan terlalu muda, dan dampak sosial ekonomi.",
    duration: "3 Menit",
    image: "/assets/quiz/perkawinan_anak.svg",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "mar1",
        questionText:
          "Berapakah batas usia minimal untuk melangsungkan pernikahan sesuai UU No. 16 Tahun 2019 di Indonesia?",
        options: ["16 tahun", "17 tahun", "18 tahun", "19 tahun"],
        correctAnswer: 3,
        explanation:
          "Undang-Undang No. 16 Tahun 2019 menetapkan bahwa perkawinan hanya diizinkan apabila pria dan wanita sudah mencapai umur minimal 19 tahun untuk melindungi hak tumbuh kembang anak.",
      },
      {
        id: "mar2",
        questionText:
          "Apa salah satu risiko medis paling berbahaya bagi remaja perempuan yang melahirkan di usia di bawah 19 tahun?",
        options: [
          "Meningkatnya berat badan bayi",
          "Risiko tinggi pendarahan hebat dan preeklamsia karena panggul belum tumbuh matang",
          "Kuku jari menjadi lebih panjang",
          "Nafsu makan bertambah drastis",
        ],
        correctAnswer: 1,
        explanation:
          "Secara anatomis, tulang panggul dan jalan lahir remaja belum matang sempurna, sehingga sangat rentan mengalami persalinan macet, robekan serviks, pendarahan hebat, hingga preeklamsia.",
      },
      {
        id: "mar3",
        questionText:
          "Mengapa perkawinan usia anak dapat memperpanjang rantai kemiskinan antargenerasi?",
        options: [
          "Keuntungan finansial keluarga",
          "Karena memicu putus sekolah sehingga membatasi keterampilan untuk memperoleh pekerjaan layak",
          "Karena dilarang menabung oleh bank",
          "Karena keluarga baru wajib pindah dari desa",
        ],
        correctAnswer: 1,
        explanation:
          "Pernikahan dini sering memaksa remaja meninggalkan bangku sekolah. Rendahnya tingkat pendidikan membatasi akses keterampilan untuk memperoleh pekerjaan dengan pendapatan yang layak.",
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
    duration: "2 Menit",
    image: "/assets/quiz/hak_anak.svg",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "rig1",
        questionText:
          "Berikut ini adalah empat pilar hak dasar anak berdasarkan Konvensi Hak Anak PBB, KECUALI...",
        options: [
          "Hak kelangsungan hidup",
          "Hak perlindungan",
          "Hak memiliki kekayaan pribadi",
          "Hak tumbuh kembang",
        ],
        correctAnswer: 2,
        explanation:
          "Empat pilar hak dasar anak adalah: hak kelangsungan hidup, hak tumbuh kembang, hak perlindungan, dan hak partisipasi. Hak memiliki kekayaan pribadi bukan merupakan bagian dari hak dasar anak.",
      },
      {
        id: "rig2",
        questionText:
          "Hak anak untuk didengar pendapatnya dalam pengambilan keputusan yang menyangkut masa depannya disebut...",
        options: [
          "Hak kelangsungan hidup",
          "Hak perlindungan",
          "Hak partisipasi",
          "Hak tumbuh kembang",
        ],
        correctAnswer: 2,
        explanation:
          "Hak Partisipasi menjamin kebebasan anak untuk menyuarakan aspirasi, didengarkan pandangannya, serta diikutsertakan dalam dialog hal-hal yang berkaitan dengan kehidupannya.",
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
    duration: "2 Menit",
    image: "/assets/quiz/batasan_diri.svg",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "vio1",
        questionText:
          "Jika ada seseorang yang mencoba menyentuh area tubuh sensitifmu secara tidak nyaman, tindakan terbaik apa yang harus dilakukan?",
        options: [
          "Diam saja karena takut dia marah",
          "Mematuhinya agar cepat selesai",
          "Menolak dengan tegas, lari menjauh, dan segera melapor kepada orang tua, guru, atau konselor",
          "Menyimpan rahasia tersebut sendirian",
        ],
        correctAnswer: 2,
        explanation:
          "Tubuhmu adalah otoritas pribadimu sepenuhnya (bodily autonomy). Tolak segala bentuk sentuhan yang membuatmu tidak nyaman, jauhi orang tersebut, dan langsung ceritakan kepada orang dewasa yang kamu percaya.",
      },
      {
        id: "vio2",
        questionText:
          "Apa definisi dari konsep 'Sentuhan Aman' (Safe Touch) dalam interaksi sosial sehari-hari?",
        options: [
          "Sentuhan penuh rasa hormat yang membuatmu merasa aman, nyaman, dan dihargai (seperti salim guru atau pelukan hangat keluarga)",
          "Sentuhan rahasia yang dilarang diberitahukan ke orang tua",
          "Sentuhan paksa yang menyakitkan fisik",
          "Sentuhan di area sensitif tubuh",
        ],
        correctAnswer: 0,
        explanation:
          "Sentuhan aman adalah bentuk kontak sosial yang penuh rasa hormat, menghargai batasan pribadi, transparan, dan tidak memicu ketakutan, kebingungan, maupun rasa tidak nyaman.",
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
    duration: "2 Menit",
    image: "/assets/quiz/kesehatan_mental.svg",
    accentColor: "emerald",
    fallbackQuestions: [
      {
        id: "men1",
        questionText:
          "Saat kamu merasa cemas berlebihan dan tertekan secara emosional karena cyberbullying di media sosial, langkah awal self-care yang bijak adalah...",
        options: [
          "Membalas pelaku dengan kata-kata kasar",
          "Melakukan digital detox sementara, bercerita ke keluarga/sahabat, atau hubungi konselor sebaya",
          "Mengurung diri tanpa bercerita kepada siapa pun",
          "Bermain game semalaman hingga begadang",
        ],
        correctAnswer: 1,
        explanation:
          "Menjauh sejenak dari layar (digital detox) membantu meredakan rangsangan stres emosional, sementara berbagi cerita dengan orang tepercaya memberikan dukungan mental yang sehat.",
      },
      {
        id: "men2",
        questionText:
          "Menghadapi tumpukan tugas sekolah yang memicu stres berlebih, manajemen stres harian apa yang dianjurkan?",
        options: [
          "Menunda pengerjaan tugas selamanya",
          "Melakukan relaksasi napas dalam, mencicil tugas ke bagian-bagian kecil, dan istirahat yang cukup",
          "Mengonsumsi kafein berlebihan agar terjaga semalaman",
          "Melampiaskan kemarahan di media sosial",
        ],
        correctAnswer: 1,
        explanation:
          "Latihan pernapasan dalam menenangkan sistem saraf simpatik, sedangkan mencicil tugas menjadi target-target kecil membuatnya jauh lebih realistis untuk diselesaikan tanpa beban stres berlebihan.",
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
