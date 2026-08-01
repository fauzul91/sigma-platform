"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  ChevronLeft, 
  Sparkles, 
  Timer, 
  ShieldCheck,
  Heart,
  UserCheck,
  BookmarkCheck,
  Compass,
  XCircle,
  TrendingUp
} from "lucide-react";

interface LocalQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCategory {
  id: string;
  title: string;
  description: string;
  slug: string;
  xpReward: number;
  duration: string;
  badgeName: string;
  badgeDescription: string;
  badgeIcon: React.ReactNode;
  gradientClass: string;
  questions: LocalQuestion[];
}

export default function KuisView() {
  const [activeScreen, setActiveScreen] = useState<"topic" | "overview" | "play" | "results">("topic");
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [showXpFloat, setShowXpFloat] = useState(false);
  
  const quizCategories: QuizCategory[] = [
    {
      id: "cat_repro",
      title: "Kesehatan Reproduksi",
      slug: "pubertas",
      description: "Pahami masa pubertas, perubahan hormon fisik, dan cara menjaga kebersihan reproduksi harian.",
      xpReward: 45,
      duration: "3 Menit",
      badgeName: "Healthy Teen",
      badgeDescription: "Telah memahami perubahan pubertas secara sehat & positif.",
      badgeIcon: <Heart className="h-6 w-6 text-rose-500" />,
      gradientClass: "from-rose-500/10 to-rose-600/5 hover:border-rose-400",
      questions: [
        {
          id: "rep1",
          questionText: "Manakah hormon utama yang memicu perkembangan fisik sekunder pada remaja perempuan selama masa pubertas?",
          options: [
            "Testosteron",
            "Estrogen dan Progesteron",
            "Adrenalin",
            "Melatonin"
          ],
          correctAnswer: 1,
          explanation: "Hormon estrogen dan progesteron diproduksi oleh indung telur (ovarium) perempuan saat pubertas dan memicu pembentukan payudara, pinggul, serta siklus menstruasi."
        },
        {
          id: "rep2",
          questionText: "Apa istilah medis yang digunakan untuk menggambarkan menstruasi pertama pada anak perempuan?",
          options: [
            "Menarche",
            "Menopause",
            "Ovulasi",
            "Pubarke"
          ],
          correctAnswer: 0,
          explanation: "Menarche adalah tanda biologis pertama dari kedewasaan reproduksi perempuan, menandai dimulainya fungsi siklus rahim."
        },
        {
          id: "rep3",
          questionText: "Berapa kali minimal celana dalam sebaiknya diganti dalam sehari untuk menjaga kebersihan reproduksi?",
          options: [
            "1 kali sehari",
            "2 kali sehari",
            "3 kali sehari",
            "Hanya saat mandi saja"
          ],
          correctAnswer: 1,
          explanation: "Mengganti celana dalam minimal 2 kali sehari mencegah kelembapan berlebih yang dapat memicu pertumbuhan jamur dan bakteri berbahaya di area intim."
        }
      ]
    },
    {
      id: "cat_marriage",
      title: "Pencegahan Perkawinan Anak",
      slug: "pernikahan-anak",
      description: "Ketahui batasan usia legal pernikahan di Indonesia dan risiko kesehatan kehamilan terlalu muda.",
      xpReward: 45,
      duration: "3 Menit",
      badgeName: "Anti Child Marriage Advocate",
      badgeDescription: "Telah memahami risiko pernikahan dini & batas kedewasaan legal.",
      badgeIcon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
      gradientClass: "from-emerald-500/10 to-emerald-600/5 hover:border-emerald-400",
      questions: [
        {
          id: "mar1",
          questionText: "Berapakah batas usia minimal untuk melangsungkan pernikahan sesuai UU No. 16 Tahun 2019?",
          options: [
            "16 tahun",
            "17 tahun",
            "18 tahun",
            "19 tahun"
          ],
          correctAnswer: 3,
          explanation: "Undang-Undang No. 16 Tahun 2019 menetapkan bahwa perkawinan hanya diizinkan apabila pria dan wanita sudah mencapai umur 19 tahun demi meminimalkan bahaya perkawinan anak."
        },
        {
          id: "mar2",
          questionText: "Apa salah satu risiko medis paling berbahaya bagi remaja perempuan yang melahirkan di usia di bawah 19 tahun?",
          options: [
            "Meningkatnya berat badan bayi",
            "Risiko tinggi pendarahan hebat dan preeklamsia karena panggul belum tumbuh matang",
            "Kuku jari menjadi lebih panjang",
            "Nafsu makan bertambah drastis"
          ],
          correctAnswer: 1,
          explanation: "Secara biologis, tulang panggul dan organ kandungan remaja belum matang sempurna, sehingga meningkatkan risiko robekan jalan lahir, pendarahan, dan tekanan darah tinggi (preeklamsia)."
        },
        {
          id: "mar3",
          questionText: "Mengapa perkawinan usia anak dapat memperpanjang rantai kemiskinan antargenerasi?",
          options: [
            "Keuntungan finansial keluarga",
            "Karena memicu putus sekolah sehingga membatasi keterampilan untuk memperoleh pekerjaan layak",
            "Karena dilarang menabung oleh bank",
            "Karena keluarga baru wajib pindah dari desa"
          ],
          correctAnswer: 1,
          explanation: "Pernikahan dini sering memaksa remaja meninggalkan bangku sekolah. Minimnya pendidikan membuat mereka sulit bersaing mendapatkan pekerjaan dengan pendapatan yang layak untuk menghidupi keluarga."
        }
      ]
    },
    {
      id: "cat_rights",
      title: "Hak-Hak Anak",
      slug: "hak-anak",
      description: "Pahami empat hak dasar anak berdasarkan Konvensi Hak Anak PBB untuk melindungi diri dan teman sebaya.",
      xpReward: 30,
      duration: "2 Menit",
      badgeName: "Child Rights Guardian",
      badgeDescription: "Menguasai perlindungan hukum & hak tumbuh kembang anak.",
      badgeIcon: <UserCheck className="h-6 w-6 text-blue-500" />,
      gradientClass: "from-blue-500/10 to-blue-600/5 hover:border-blue-400",
      questions: [
        {
          id: "rig1",
          questionText: "Berikut ini adalah empat hak dasar anak berdasarkan Konvensi Hak Anak PBB, KECUALI...",
          options: [
            "Hak kelangsungan hidup",
            "Hak perlindungan",
            "Hak memiliki kekayaan pribadi",
            "Hak tumbuh kembang"
          ],
          correctAnswer: 2,
          explanation: "Empat hak dasar anak adalah hak kelangsungan hidup, hak tumbuh kembang, hak perlindungan, dan hak berpartisipasi. Hak memiliki harta pribadi bukan bagian dari hak dasar anak."
        },
        {
          id: "rig2",
          questionText: "Hak anak untuk didengar pendapatnya dalam pengambilan keputusan yang menyangkut dirinya sendiri disebut...",
          options: [
            "Hak kelangsungan hidup",
            "Hak perlindungan",
            "Hak partisipasi",
            "Hak tumbuh kembang"
          ],
          correctAnswer: 2,
          explanation: "Hak Partisipasi menjamin anak untuk menyuarakan aspirasi, didengarkan pandangannya, serta ikut berdiskusi pada masalah yang memengaruhi masa depannya."
        }
      ]
    },
    {
      id: "cat_mental",
      title: "Kesehatan Mental",
      slug: "kesehatan-mental",
      description: "Identifikasi tanda kecemasan berlebih, cyberbullying, dan cara mengelola stres belajar yang sehat.",
      xpReward: 30,
      duration: "2 Menit",
      badgeName: "Mental Care Explorer",
      badgeDescription: "Memahami manajemen stres & kepedulian kesehatan mental.",
      badgeIcon: <Compass className="h-6 w-6 text-violet-500" />,
      gradientClass: "from-violet-500/10 to-violet-600/5 hover:border-violet-400",
      questions: [
        {
          id: "men1",
          questionText: "Saat kamu merasa cemas berlebihan dan tertekan secara emosional karena cyberbullying, langkah awal self-care yang bijak adalah...",
          options: [
            "Membalas pelaku dengan kata-kata kasar",
            "Melakukan digital detox sementara, bercerita ke sahabat/keluarga, atau hubungi konselor tepercaya",
            "Mengurung diri tanpa bercerita kepada siapa pun",
            "Bermain game semalaman hingga begadang"
          ],
          correctAnswer: 1,
          explanation: "Menjauhi media sosial sementara (digital detox) menenangkan saraf tegang, sementara bercerita memberikan pelepasan emosional yang sehat dan dukungan nyata."
        },
        {
          id: "men2",
          questionText: "Menghadapi tumpukan tugas sekolah yang memicu stres, manajemen stres harian apa yang dianjurkan?",
          options: [
            "Menunda pengerjaan tugas selamanya",
            "Melakukan relaksasi napas dalam, membagi tugas ke bagian kecil, dan istirahat cukup",
            "Mengonsumsi kafein berlebihan agar terjaga semalaman",
            "Marah-marah di media sosial"
          ],
          correctAnswer: 1,
          explanation: "Melatih napas lambat menurunkan detak jantung cemas, sementara mencicil tugas kecil menjadikannya lebih mudah diselesaikan tanpa beban emosional berlebih."
        }
      ]
    },
    {
      id: "cat_violence",
      title: "Pencegahan Kekerasan Seksual",
      slug: "kekerasan-seksual",
      description: "Kenali batasan sentuhan aman, menolak tindakan mencurigakan, dan langkah pelaporan darurat.",
      xpReward: 30,
      duration: "2 Menit",
      badgeName: "GARUDA Champion",
      badgeDescription: "Memiliki keberanian menolak pelecehan & menjaga batasan pribadi.",
      badgeIcon: <BookmarkCheck className="h-6 w-6 text-amber-500" />,
      gradientClass: "from-amber-500/10 to-amber-600/5 hover:border-amber-400",
      questions: [
        {
          id: "vio1",
          questionText: "Jika ada seseorang yang kamu kenal mencoba menyentuh area tubuh sensitifmu secara tidak nyaman, tindakan terbaik apa yang harus dilakukan?",
          options: [
            "Diam saja karena takut dia marah",
            "Mematuhinya agar cepat selesai",
            "Menolak dengan tegas, lari menjauh, dan segera laporkan kepada orang tua atau guru",
            "Menyimpan rahasia tersebut sendirian"
          ],
          correctAnswer: 2,
          explanation: "Tubuhmu adalah otoritas pribadimu. Tolak segala bentuk sentuhan yang membuatmu tidak nyaman, jauhi pelaku, dan langsung laporkan kepada orang dewasa tepercaya."
        },
        {
          id: "vio2",
          questionText: "Apa definisi dari konsep 'Sentuhan Aman' (Safe Touch) dalam interaksi sehari-hari?",
          options: [
            "Sentuhan penuh rasa hormat yang membuatmu merasa aman, nyaman, dan dihargai (seperti salim guru atau pelukan hangat keluarga)",
            "Sentuhan rahasia yang dilarang diberitahukan ke orang tua",
            "Sentuhan paksa yang menyakitkan fisik",
            "Sentuhan di area sensitif tubuh"
          ],
          correctAnswer: 0,
          explanation: "Sentuhan aman adalah bentuk kontak sosial wajar yang penuh rasa hormat, menghargai batasan pribadi, dan tidak memicu ketakutan atau ketidaknyamanan batin."
        }
      ]
    }
  ];

  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    if (activeScreen === "results") {
      const generated = Array.from({ length: 40 }).map((_, idx) => ({
        id: idx,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: ["bg-emerald-500", "bg-teal-400", "bg-amber-400", "bg-sky-400", "bg-rose-400"][Math.floor(Math.random() * 5)]
      }));
      setParticles(generated);
    } else {
      setParticles([]);
    }
  }, [activeScreen]);

  const selectCategory = (category: QuizCategory) => {
    setSelectedCategory(category);
    setActiveScreen("overview");
  };

  const startChallenge = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setAccumulatedXp(0);
    setActiveScreen("play");
  };

  const selectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const submitAnswer = () => {
    if (selectedOptionIdx === null || isAnswerSubmitted || !selectedCategory) return;
    
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionIdx === selectedCategory.questions[currentQuestionIdx].correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
      setAccumulatedXp(prev => prev + 15);
      setShowXpFloat(true);
      setTimeout(() => setShowXpFloat(false), 1200);
    }
  };

  const nextQuestion = () => {
    if (!selectedCategory) return;
    
    if (currentQuestionIdx + 1 < selectedCategory.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswerSubmitted(false);
    } else {
      setActiveScreen("results");
    }
  };

  const backToTopics = () => {
    setSelectedCategory(null);
    setActiveScreen("topic");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center font-sans">
      
      {/* XP Float Animation */}
      {showXpFloat && (
        <div className="fixed top-1/4 right-1/2 transform translate-x-1/2 z-50 bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-full shadow-lg animate-bounce flex items-center space-x-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>+15 XP Berhasil Didapat!</span>
        </div>
      )}

      {/* 1. TOPIC SELECTION SCREEN */}
      {activeScreen === "topic" && (
        <div className="max-w-4xl w-full space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-3">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-primary text-xs font-black uppercase tracking-wider">
              Mulai Petualangan Belajar
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark tracking-tight">
              Tantangan Kuis SIGMA
            </h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              Halo Teman SIGMA! Uji pemahamanmu secara menyenangkan. Raih XP dan kumpulkan lencana prestasi belajar di setiap topik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {quizCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => selectCategory(category)}
                className={`group p-6 rounded-3xl bg-white border border-slate-200/60 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-md cursor-pointer flex flex-col justify-between space-y-6 ${category.gradientClass}`}
              >
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100">
                    {category.badgeIcon}
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-lg text-neutral-dark group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100/60 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center space-x-1">
                    <Timer className="h-3.5 w-3.5" />
                    <span>{category.duration}</span>
                  </span>
                  <span className="text-primary font-bold">
                    +{category.xpReward} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. CHALLENGE OVERVIEW */}
      {activeScreen === "overview" && selectedCategory && (
        <div className="max-w-md w-full animate-in zoom-in-95 duration-200 space-y-6">
          <button
            onClick={backToTopics}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200/60 shadow-sm"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Topik</span>
          </button>

          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden p-6 space-y-6">
            <div className="text-center space-y-4 pb-4 border-b border-slate-100">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-primary border border-emerald-100 shadow-sm">
                {selectedCategory.badgeIcon}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Siap Memulai?</span>
                <h2 className="text-2xl font-extrabold text-neutral-dark tracking-tight">{selectedCategory.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Durasi</p>
                <p className="text-xs font-black text-neutral-dark mt-1">{selectedCategory.duration}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Jumlah Soal</p>
                <p className="text-xs font-black text-neutral-dark mt-1">{selectedCategory.questions.length} Soal</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Reward</p>
                <p className="text-xs font-black text-primary mt-1">+{selectedCategory.xpReward} XP</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center space-x-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm shrink-0">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-[9px] font-black text-emerald-800 uppercase tracking-wider">Lencana yang didapat</p>
                <p className="text-xs font-extrabold text-neutral-dark mt-0.5">{selectedCategory.badgeName}</p>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-0.5">{selectedCategory.badgeDescription}</p>
              </div>
            </div>

            <button
              onClick={startChallenge}
              className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center space-x-2"
            >
              <span>Mulai Tantangan</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. PLAY SCREEN */}
      {activeScreen === "play" && selectedCategory && (
        <div className="max-w-xl w-full space-y-6 animate-in fade-in duration-300 relative">
          <div className="flex items-center justify-between text-xs font-black tracking-widest text-slate-400">
            <span className="uppercase">SOAL {currentQuestionIdx + 1} DARI {selectedCategory.questions.length}</span>
            <span className="text-primary">XP TERKUMPUL: +{accumulatedXp} XP</span>
          </div>

          <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden border border-slate-200/30">
            <div 
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentQuestionIdx) / selectedCategory.questions.length) * 100}%` }}
            />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-xl space-y-6">
            <h2 className="text-lg md:text-xl font-extrabold text-neutral-dark leading-relaxed">
              {selectedCategory.questions[currentQuestionIdx].questionText}
            </h2>

            <div className="space-y-3 pt-2">
              {selectedCategory.questions[currentQuestionIdx].options.map((option, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const isCorrect = idx === selectedCategory.questions[currentQuestionIdx].correctAnswer;
                
                let optionStyle = "border-slate-200 hover:border-primary/50 hover:bg-slate-50/40 text-neutral-dark";
                
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-800";
                  } else if (isSelected) {
                    optionStyle = "bg-amber-50 border-amber-500 text-amber-800";
                  } else {
                    optionStyle = "opacity-50 border-slate-100 text-slate-400";
                  }
                } else if (isSelected) {
                  optionStyle = "border-primary bg-emerald-50/10 text-primary ring-2 ring-primary/10";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => selectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4.5 rounded-2xl border-2 text-xs font-bold transition-all duration-155 flex items-center justify-between gap-3 ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && isCorrect && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />}
                    {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="h-4.5 w-4.5 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {isAnswerSubmitted && (
              <div className={`p-5 rounded-2xl border text-xs font-semibold leading-relaxed space-y-2 animate-in slide-in-from-bottom duration-250 ${
                selectedOptionIdx === selectedCategory.questions[currentQuestionIdx].correctAnswer
                  ? "bg-emerald-50/50 border-emerald-100 text-emerald-950"
                  : "bg-amber-50/50 border-amber-100 text-amber-950"
              }`}>
                <div className="flex items-center space-x-1.5 font-black text-[10px] uppercase tracking-wider">
                  {selectedOptionIdx === selectedCategory.questions[currentQuestionIdx].correctAnswer ? (
                    <>
                      <Sparkles className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-700">Luar Biasa! Jawabanmu Tepat (+15 XP)</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-amber-700">Pelajari Ulang Penjelasan ini</span>
                    </>
                  )}
                </div>
                <p>{selectedCategory.questions[currentQuestionIdx].explanation}</p>
              </div>
            )}

            <div className="pt-2">
              {!isAnswerSubmitted ? (
                <button
                  onClick={submitAnswer}
                  disabled={selectedOptionIdx === null}
                  className="w-full py-4 rounded-2xl bg-neutral-dark text-white text-xs font-black uppercase tracking-wider shadow-sm hover:bg-slate-800 transition-all active:scale-98 disabled:opacity-30 disabled:pointer-events-none"
                >
                  Periksa Jawaban
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="w-full py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-wider shadow-md hover:bg-primary-hover transition-all active:scale-98"
                >
                  Lanjutkan
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. RESULTS VIEW */}
      {activeScreen === "results" && selectedCategory && (
        <div className="max-w-xl w-full space-y-6 animate-in zoom-in-95 duration-200 relative overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`absolute top-0 h-2 w-2 rounded-full opacity-60 z-50 ${p.color}`}
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: "3s",
                animationIterationCount: "infinite",
                animationName: "fall",
                animationTimingFunction: "linear"
              }}
            />
          ))}

          <style>{`
            @keyframes fall {
              0% { transform: translateY(-50px) rotate(0deg); }
              100% { transform: translateY(800px) rotate(360deg); }
            }
          `}</style>

          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-xl text-center space-y-6 relative">
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-primary text-xs font-black uppercase tracking-wider inline-block">
                Tantangan Terselesaikan!
              </span>
              <h1 className="text-3xl font-extrabold text-neutral-dark tracking-tight">Selamat, Kamu Hebat! 🎉</h1>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Kamu telah menyelesaikan petualangan kuis ini. Setiap langkah kecil membantu meningkatkan perlindungan diri tepercaya!
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white space-y-3 relative shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md text-neutral-dark">
                {selectedCategory.badgeIcon}
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-emerald-100 uppercase tracking-widest">Lencana Terbuka!</span>
                <h3 className="font-extrabold text-base">{selectedCategory.badgeName}</h3>
                <p className="text-[10px] text-emerald-100 max-w-xs mx-auto leading-relaxed">{selectedCategory.badgeDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Akurasi Jawaban</p>
                <h2 className="text-3xl font-extrabold text-neutral-dark mt-1">
                  {correctAnswersCount} <span className="text-slate-400 text-sm font-bold">/ {selectedCategory.questions.length}</span>
                </h2>
                <p className="text-[10px] text-slate-500 font-bold mt-1">
                  {correctAnswersCount === selectedCategory.questions.length ? "Sempurna!" : "Terus Berlatih!"}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">XP yang Diperoleh</p>
                <h2 className="text-3xl font-extrabold text-primary mt-1">+{accumulatedXp} XP</h2>
                <p className="text-[10px] text-slate-500 font-bold mt-1">Lencana Level Naik</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-4">
              <h3 className="text-xs font-black text-neutral-dark uppercase tracking-widest flex items-center space-x-1.5 pb-2 border-b border-slate-200/50">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Analisis Hasil Belajarmu</span>
              </h3>
              
              <div className="space-y-3 text-xs">
                {correctAnswersCount === selectedCategory.questions.length ? (
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Sudah Dikuasai
                    </span>
                    <p className="font-semibold text-slate-600 leading-relaxed mt-1">
                      Keren! Kamu menguasai semua materi <strong>{selectedCategory.title}</strong> secara mendalam. Teruskan kontribusimu menyebarkan pemahaman ini!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {correctAnswersCount > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Sudah Dikuasai
                        </span>
                        <p className="font-semibold text-slate-600 leading-relaxed mt-1">
                          Sebagian besar materi <strong>{selectedCategory.title}</strong> sudah dipahami dengan baik.
                        </p>
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Perlu Latihan Lagi
                      </span>
                      <p className="font-semibold text-slate-600 leading-relaxed mt-1">
                        Kamu masih keliru menjawab beberapa soal. Rekomendasi bacaan untuk memperdalam pemahaman:
                      </p>
                      <Link
                        href={`/repropedia?module=${selectedCategory.slug}`}
                        className="inline-flex items-center space-x-1 text-[11px] font-black text-primary hover:text-primary-hover uppercase tracking-wider"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Baca Materi Repropedia {selectedCategory.title}</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={startChallenge}
                className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-neutral-dark font-extrabold text-xs hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <RefreshCw className="h-4 w-4 text-slate-400" />
                <span>Ulangi Kuis ini</span>
              </button>

              <button
                onClick={backToTopics}
                className="flex-1 py-3.5 rounded-2xl bg-primary text-white font-extrabold text-xs hover:bg-primary-hover transition-all flex items-center justify-center space-x-2 active:scale-98 shadow-md shadow-emerald-600/10"
              >
                <span>Coba Kuis Lain</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
