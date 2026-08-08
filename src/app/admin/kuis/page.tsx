import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchQuizzes } from "@/services/admin/adminService";
import AdminKuisClient from "@/components/admin/kuis/AdminKuisClient";

export default async function AdminKuisPage() {
  await requireAdminSession();
  const quizzes = await fetchQuizzes();
  return <AdminKuisClient initialQuizzes={quizzes} />;
}
