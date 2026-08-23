/**
 * Media URL Formatting & Validation Utilities
 */

/**
 * Extracts Video ID from various YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * Formats any YouTube URL to clean embed URL:
 * Returns: https://www.youtube.com/embed/{videoId}
 */
export function formatYouTubeEmbedUrl(inputUrl: string): string {
  if (!inputUrl || typeof inputUrl !== "string") return "";
  const trimmed = inputUrl.trim();
  const videoId = getYouTubeVideoId(trimmed);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return trimmed;
}

/**
 * Returns high-quality YouTube thumbnail image URL if YouTube link,
 * otherwise returns null or fallback.
 */
export function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

/**
 * Validates and formats image URLs, converting Google Drive sharing links
 * into direct access image URLs.
 */
export function formatImageUrl(inputUrl: string): {
  url: string;
  isValid: boolean;
  error?: string;
} {
  if (!inputUrl || typeof inputUrl !== "string") {
    return { url: "", isValid: false, error: "URL gambar tidak boleh kosong." };
  }

  const trimmed = inputUrl.trim();

  // Basic HTTP/HTTPS URL validation
  if (!/^https?:\/\//i.test(trimmed)) {
    return {
      url: trimmed,
      isValid: false,
      error: "URL harus diawali dengan http:// atau https://",
    };
  }

  // Google Drive URL format handling
  // Matches: drive.google.com/file/d/FILE_ID/view, drive.google.com/open?id=FILE_ID, drive.google.com/uc?id=FILE_ID
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]{25,})/;
  const driveMatch = trimmed.match(driveRegex);

  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    // Direct Google User Content image URL
    return {
      url: `https://lh3.googleusercontent.com/d/${fileId}`,
      isValid: true,
    };
  }

  return { url: trimmed, isValid: true };
}
