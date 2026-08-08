import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionCookie,
} from "@/lib/adminSession";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = await verifyAdminSessionCookie(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}