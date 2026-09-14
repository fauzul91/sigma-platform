// ─────────────────────────────────────────────────────────────────────────────
// Pilih Langkahmu — Interactive Story TypeScript Types
// ─────────────────────────────────────────────────────────────────────────────

export type ReflectionKey =
  | "protect_boundary"      // Mempertahankan batasan & prinsip diri
  | "avoid_conflict"        // Menghindari konfrontasi / memendam
  | "seek_support"          // Mencari bantuan pihak tepercaya (Guru BK, keluarga)
  | "communicate_directly"   // Bicara jujur, asertif, dan mencari jalan keluar
  | "reconsider";           // Berpikir matang sebelum bertindak

/** Karakter dalam cerita */
export type CharacterId =
  | "player"
  | "ibu"
  | "ayah"
  | "bu_sari"
  | "dina"
  | "kak_rani"
  | "bagas"
  | "fajar"
  | "narrator";

/** Satu baris pesan atau dialog */
export interface ChatMessage {
  id: string;
  sender: "user" | "other" | "narrator";
  senderName?: string;
  characterId?: CharacterId;
  characterImage?: string; // e.g. "/assets/characters/ibu.jpg"
  text: string;
}

/** Pilihan tindakan pemain */
export interface ScenarioChoice {
  id: string;
  text: string;
  consequence?: string;
  nextSceneId: string;
  reflectionKey: ReflectionKey;
  isRecommended?: boolean;
}

/** Satu adegan dalam babak (Langkah 1 s.d. 5) */
export interface ScenarioScene {
  id: string;
  stepNumber: number; // 1 to 5
  situationContext?: string;
  messages: ChatMessage[];
  choices?: ScenarioChoice[];
  isEnding?: boolean;
}

/** Data Cermin Keputusan akhir */
export interface DecisionMirror {
  headline: string;
  whatWasGood: string;
  whatToTry: string;
  coreReminder: string;
  repropediaChapter: {
    title: string;
    href: string;
  };
}

/** Metadata & alur cerita skenario */
export interface Scenario {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  topic: string;
  duration: string;
  coverImage: string;
  icon: string;
  accentColor: string;
  startSceneId: string;
  scenes: Record<string, ScenarioScene>;
  reflections: Record<string, DecisionMirror>;
  isReady?: boolean;
}

/** Rekam jejak langkah pemain */
export interface DecisionHistoryEntry {
  stepNumber: number;
  sceneId: string;
  choiceId: string;
  choiceText: string;
  reflectionKey: ReflectionKey;
}