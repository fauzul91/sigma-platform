import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionCookie } from "@/lib/adminSession";

// Inisialisasi konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Batasan ukuran file: 10MB
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export async function POST(req: NextRequest) {
  try {
    // 1. Verifikasi Sesi Admin
    const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = await verifyAdminSessionCookie(sessionCookie);
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Akses ditolak. Sesi admin tidak valid atau telah kedaluwarsa." },
        { status: 401 }
      );
    }

    // 2. Ambil Payload Form Data
    const formData = await req.formData();
    const file = (formData.get("file") || formData.get("image")) as File | null;
    const requestedFolder = formData.get("folder") as string | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "Berkas gambar tidak ditemukan pada permintaan." },
        { status: 400 }
      );
    }

    // 3. Validasi Tipe Berkas (Hanya Gambar)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Format berkas (${file.type}) tidak didukung. Harap unggah berkas gambar (JPG, PNG, WebP, GIF, SVG).`,
        },
        { status: 400 }
      );
    }

    // 4. Validasi Ukuran Berkas
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: `Ukuran gambar terlalu besar (${(file.size / (1024 * 1024)).toFixed(1)} MB). Batas maksimum adalah 10 MB.`,
        },
        { status: 400 }
      );
    }

    // 5. Konversi File ke Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Tentukan folder Cloudinary (sanitize folder path)
    let targetFolder = "sigma-assets/articles";
    if (requestedFolder && typeof requestedFolder === "string") {
      const sanitized = requestedFolder.trim().replace(/[^a-zA-Z0-9_\-\/]/g, "");
      if (sanitized) {
        targetFolder = sanitized.startsWith("sigma-assets")
          ? sanitized
          : `sigma-assets/${sanitized}`;
      }
    }

    // 6. Unggah ke Cloudinary via Upload Stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: targetFolder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const data = uploadResult as any;

    // Optimasi URL dengan transformasi Cloudinary f_auto,q_auto
    let secureUrl = data.secure_url;
    if (secureUrl && secureUrl.includes("/upload/")) {
      secureUrl = secureUrl.replace("/upload/", "/upload/f_auto,q_auto/");
    }

    return NextResponse.json({
      ok: true,
      url: secureUrl,
      secure_url: secureUrl,
      public_id: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    });
  } catch (error: any) {
    console.error("[Upload API /api/upload] Terjadi kesalahan:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Gagal mengunggah berkas ke Cloudinary." },
      { status: 500 }
    );
  }
}
