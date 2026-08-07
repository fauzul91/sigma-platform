export async function uploadToCloudinary(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(data.error || `Upload failed: ${res.status}`);
  }

  const data = await res.json();
  return data.secure_url as string;
}
