/**
 * Utility kompresi gambar di sisi klien (browser) & pool antrean unggah asinkron.
 *
 * Masalah:
 * Foto kamera HP / DSLR modern berukuran 5MB - 10MB (resolusi 4000x3000px+).
 * Mengunggah 8 foto sekaligus mentah memakan bandwidth 40MB - 80MB dan waktu 30-60+ detik.
 *
 * Solusi:
 * 1. Kompresi gambar client-side via HTML Canvas: dibatasi max 1920x1920px dan JPEG/WebP quality 0.82.
 *    Ukuran file menyusut 90-95% (dari ~6MB menjadi ~300KB-450KB) tanpa penurunan kualitas yang terlihat mata.
 * 2. Concurrency Pool: antrean paralel non-blocking sehingga slot upload selalu penuh tanpa menunggu batch kaku.
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

/**
 * Mengompresi file gambar di browser sebelum dikirim ke server.
 * Aman dan memiliki fallback otomatis ke file asli jika terjadi kendala format/codec.
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<File> {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.82 } = options;

  // SSR check
  if (typeof window === "undefined" || typeof document === "undefined") {
    return file;
  }

  // Lewati file yang bukan gambar raster standar (misal SVG atau GIF animasi)
  const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name);
  if (!isImage || file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  // Jika file sudah sangat ringan (di bawah 250 KB), tidak perlu kompresi ulang
  if (file.size <= 250 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const fallback = () => resolve(file);

    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        try {
          let { naturalWidth: width, naturalHeight: height } = img;
          if (!width || !height) {
            fallback();
            return;
          }

          // Hitung dimensi target proporsional
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          } else if (file.size <= 500 * 1024) {
            // Ukuran < 500KB dan dimensi sudah pas, biarkan apa adanya
            resolve(file);
            return;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            fallback();
            return;
          }

          // Image smoothing tinggi untuk hasil tajam
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Format ekspor: pertahankan WebP jika aslinya WebP atau PNG (menjaga kualitas & transparansi)
          const isWebpOrPng =
            file.type === "image/webp" ||
            file.type === "image/png" ||
            /\.(webp|png)$/i.test(file.name);
          const exportType = isWebpOrPng ? "image/webp" : "image/jpeg";

          if (exportType === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob || blob.size >= file.size) {
                // Jika kompresi gagal atau ukuran malah membesar, pakai file asli
                resolve(file);
                return;
              }

              const ext = exportType === "image/webp" ? ".webp" : ".jpg";
              const newName = file.name.replace(/\.[^/.]+$/, "") + ext;
              const compressedFile = new File([blob], newName, {
                type: exportType,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            exportType,
            quality
          );
        } catch {
          fallback();
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        fallback();
      };

      img.src = objectUrl;
    } catch {
      fallback();
    }
  });
}

/**
 * Worker Pool asinkron untuk menjalankan tugas secara konkuren dengan batasan slot.
 * Setiap kali satu tugas selesai, slot berikutnya langsung terisi tanpa idle waiting.
 */
export async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  workerFn: (item: T, index: number) => Promise<R>,
  onProgress?: (
    completed: number,
    total: number,
    result?: R,
    error?: any,
    index?: number
  ) => void
): Promise<{ results: R[]; errors: { index: number; item: T; error: any }[] }> {
  const results: R[] = [];
  const errors: { index: number; item: T; error: any }[] = [];
  let currentIndex = 0;
  let completed = 0;

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (currentIndex < items.length) {
        const idx = currentIndex++;
        const item = items[idx];
        try {
          const res = await workerFn(item, idx);
          results.push(res);
          completed++;
          onProgress?.(completed, items.length, res, undefined, idx);
        } catch (err) {
          errors.push({ index: idx, item, error: err });
          completed++;
          onProgress?.(completed, items.length, undefined, err, idx);
        }
      }
    }
  );

  await Promise.all(workers);
  return { results, errors };
}
