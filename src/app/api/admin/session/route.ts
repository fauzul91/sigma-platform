import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionCookie,
} from "@/lib/adminSession";

export async function GET(req: Request) {
  const cookieValue = req.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.slice(ADMIN_SESSION_COOKIE.length + 1);

  const session = await verifyAdminSessionCookie(cookieValue);

  if (!session) {
    return NextResponse.json(
      { ok: false, authenticated: false },
      { status: 401 },
    );
  }

  return NextResponse.json({
    ok: true,
    authenticated: true,
    username: session.username,
    expiresAt: session.expiresAt,
  });
}
