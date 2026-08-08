import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionCookie } from "@/lib/adminSession";

// Configure Cloudinary with server-side secrets
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // 1. Session verification
    const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = await verifyAdminSessionCookie(sessionCookie);
    if (!session) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ ok: false, error: "File tidak ditemukan." }, { status: 400 });
    }

    // 3. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Stream upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "sigma-assets",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const data = uploadResult as any;

    // Apply auto-format and auto-quality transformation parameters for optimization
    let secureUrl = data.secure_url;
    if (secureUrl && secureUrl.includes("/upload/")) {
      secureUrl = secureUrl.replace("/upload/", "/upload/f_auto,q_auto/");
    }

    return NextResponse.json({
      ok: true,
      secure_url: secureUrl,
    });
  } catch (error: any) {
    console.error("[Upload API] Error:", error);
    return NextResponse.json({ ok: false, error: "Gagal mengunggah file." }, { status: 500 });
  }
}
