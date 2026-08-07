import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionCookie,
  getAdminAuthSecret,
} from "@/lib/adminSession";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcrypt";

type AdminRow = {
  password: string;
};

type LoginThrottleEntry = {
  attempts: number;
  windowStartsAt: number;
  blockedUntil?: number;
};

const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_BLOCK_MS = 15 * 60 * 1000;
const loginThrottleStore = new Map<string, LoginThrottleEntry>();

function getClientIp(req: Request) {
  const forwardedFor = req.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

function getThrottleKey(req: Request, username: string) {
  return `${getClientIp(req)}::${username.toLowerCase()}`;
}

function isThrottled(req: Request, username: string) {
  const key = getThrottleKey(req, username);
  const entry = loginThrottleStore.get(key);
  if (!entry) return null;
  if (entry.blockedUntil && entry.blockedUntil > Date.now()) {
    return entry.blockedUntil - Date.now();
  }
  if (entry.windowStartsAt + LOGIN_WINDOW_MS < Date.now()) {
    loginThrottleStore.delete(key);
    return null;
  }
  return null;
}

function recordFailedAttempt(req: Request, username: string) {
  const key = getThrottleKey(req, username);
  const now = Date.now();
  const existing = loginThrottleStore.get(key);
  if (!existing || existing.windowStartsAt + LOGIN_WINDOW_MS < now) {
    loginThrottleStore.set(key, { attempts: 1, windowStartsAt: now });
    return;
  }
  const attempts = existing.attempts + 1;
  const nextEntry: LoginThrottleEntry = {
    attempts,
    windowStartsAt: existing.windowStartsAt,
  };
  if (attempts >= LOGIN_MAX_ATTEMPTS) {
    nextEntry.blockedUntil = now + LOGIN_BLOCK_MS;
  }
  loginThrottleStore.set(key, nextEntry);
}

function clearThrottle(req: Request, username: string) {
  loginThrottleStore.delete(getThrottleKey(req, username));
}

export async function POST(req: Request) {
  console.log("[Login] NODE_ENV:", process.env.NODE_ENV);
  console.log("[Login] Has ADMIN_AUTH_SECRET:", !!getAdminAuthSecret());
  
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ ok: false, error: "Supabase belum dikonfigurasi." }, { status: 500 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ ok: false, error: "Koneksi admin belum tersedia." }, { status: 500 });
    }

    const body = await req.json();
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json({ ok: false, error: "Username dan kata sandi wajib diisi." }, { status: 400 });
    }

    const secret = getAdminAuthSecret();
    if (!secret) {
      return NextResponse.json({ ok: false, error: "ADMIN_AUTH_SECRET belum dikonfigurasi." }, { status: 500 });
    }

    const throttleDelayMs = isThrottled(req, username);
    if (throttleDelayMs) {
      return NextResponse.json({ ok: false, error: "Terlalu banyak percobaan login." }, { status: 429 });
    }

    const { data, error } = await supabaseAdmin
      .from("admins")
      .select("password")
      .eq("username", username)
      .limit(1)
      .single();

    if (error || !data) {
      recordFailedAttempt(req, username);
      return NextResponse.json({ ok: false, error: "Username atau kata sandi salah." }, { status: 401 });
    }

    const hash = (data as AdminRow).password;
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      recordFailedAttempt(req, username);
      return NextResponse.json({ ok: false, error: "Username atau kata sandi salah." }, { status: 401 });
    }

    clearThrottle(req, username);
    console.log("[Login] Success, creating cookie...");
    const sessionCookie = await createAdminSessionCookie(username);

    const response = NextResponse.json({ ok: true, username });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_TTL_SECONDS,
    });

    return response;
  } catch (e) {
    console.error("[Login] Error:", e);
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}