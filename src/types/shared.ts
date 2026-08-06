export interface Counselor {
  id: string;
  name: string;
  role: "Kader GARUDA" | "Guru BK" | "Puskesmas" | "Psikolog";
  whatsappNumber: string;
  operationalHours: string;
  locationName?: string;
  locationMapUrl?: string;
}

export interface StatRecord {
  year: number;
  "Desa Sukamaju": number;
  "Desa Harapan": number;
  "Desa Mekarjaya": number;
  "Desa Kertajaya": number;
}

export interface OrgMember {
  id: string;
  key: string;
  role: string;
  name: string;
  description: string;
  sortOrder: number;
}
