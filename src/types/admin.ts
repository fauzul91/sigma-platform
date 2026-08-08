export type AdminTab =
  | "overview"
  | "repropedia"
  | "media"
  | "ugc"
  | "quiz"
  | "stats"
  | "counselors"
  | "settings";

export interface AdminToastState {
  message: string;
  type: "success" | "info" | "danger";
}

export interface AdminDeleteTarget {
  type:
    | "module"
    | "media"
    | "quiz"
    | "stat"
    | "counselor"
    | "ugc"
    | "event"
    | "org";
  id: string | number;
  title: string;
}

export interface AdminGeneralSettings {
  vision: string;
  mission: string;
  ketuaName: string;
}

export interface AdminRecentItem {
  label: string;
  title: string;
  createdAt: string;
}

export interface AdminDashboardStats {
  totalModules: number;
  totalMedia: number;
  totalUgc: number;
  totalEvents: number;
  totalCounselors: number;
  totalQuizzes: number;
  recentItems: AdminRecentItem[];
}
