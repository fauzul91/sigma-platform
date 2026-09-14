import { permanentRedirect } from "next/navigation";

// /kuis sekarang redirect permanente ke /permainan
// Backward compat: URL lama tetap berfungsi
export default function KuisPage() {
  permanentRedirect("/permainan");
}
