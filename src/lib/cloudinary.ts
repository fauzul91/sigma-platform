import { compressImage } from "./imageCompression";

export interface UploadOptions {
  folder?: string;
  skipCompression?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export async function uploadToCloudinary(
  file: File,
  options?: UploadOptions
): Promise<string> {
  // Kompresi otomatis di sisi browser (jika gambar) untuk memangkas ukuran 90%+
  const fileToUpload = options?.skipCompression
    ? file
    : await compressImage(file, {
        maxWidth: options?.maxWidth,
        maxHeight: options?.maxHeight,
        quality: options?.quality,
      });

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // 2. Jalur Cepat: Direct Upload ke Cloudinary (1-Hop via edge CDN, bebas beban server)
  if (cloudName && uploadPreset) {
    try {
      const directFd = new FormData();
      directFd.append("file", fileToUpload);
      directFd.append("upload_preset", uploadPreset);
      if (options?.folder) {
        directFd.append("folder", options.folder);
      }

      const directRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: directFd,
        }
      );

      if (directRes.ok) {
        const data = await directRes.json();
        let secureUrl = (data.secure_url || data.url) as string;
        if (secureUrl && secureUrl.includes("/upload/")) {
          secureUrl = secureUrl.replace("/upload/", "/upload/f_auto,q_auto/");
        }
        return secureUrl;
      }
    } catch (err) {
      console.warn("[Cloudinary] Direct upload gagal, beralih ke relay /api/upload:", err);
    }
  }

  // 3. Jalur Fallback: Server-side relay via /api/upload
  const fd = new FormData();
  fd.append("file", fileToUpload);
  if (options?.folder) {
    fd.append("folder", options.folder);
  }

  const res = await fetch("/api/upload", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Terjadi kesalahan upload." }));
    throw new Error(data.error || `Upload gagal dengan status: ${res.status}`);
  }

  const data = await res.json();
  return (data.url || data.secure_url) as string;
}

