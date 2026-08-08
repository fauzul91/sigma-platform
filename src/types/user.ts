export interface RepropediaItem {
  id: string;
  title: string;
  slug: string;
  category: "pubertas" | "pernikahan-anak" | "hak-anak" | "kekerasan-seksual" | "kesehatan-mental";
  synopsis: string;
  content: string;
  pdfUrl?: string;
  readTime: string;
  author: string;
  date: string;
}

export interface MediaItem {
  id: string;
  title: string;
  slug: string;
  type: "article" | "video";
  category: "umum" | "berita" | "edukasi";
  tags: string[];
  content: string;
  mediaUrl: string;
  readTime?: string;
  duration?: string;
  author: string;
  date: string;
}

export interface UgcItem {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  creatorName: string;
  school: string;
  type: "poster" | "infografis" | "video";
  likes: number;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  images: string[];
  attendees: number;
}

export interface QuizQuestion {
  id: string;
  category: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
