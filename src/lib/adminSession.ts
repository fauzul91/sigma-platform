export const ADMIN_SESSION_COOKIE = "sigma_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

type AdminSessionPayload = {
  username: string;
  expiresAt: number;
};

export function getAdminAuthSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET;
  if (secret && secret.length > 0) {
    return secret;
  }

  return null;
}

async function importSecret(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function encodeBase64Url(bytes: ArrayBuffer | ArrayBufferView) {
  const byteArray =
    bytes instanceof ArrayBuffer
      ? new Uint8Array(bytes)
      : new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let binary = "";

  for (const byte of byteArray) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(base64 + padding);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

async function sign(value: string) {
  const secret = getAdminAuthSecret();
  if (!secret) {
    throw new Error("ADMIN_AUTH_SECRET is not configured.");
  }

  const key = await importSecret(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );

  return encodeBase64Url(signature);
}

export async function createAdminSessionCookie(username: string) {
  const payload: AdminSessionPayload = {
    username,
    expiresAt: Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000,
  };
  const encodedPayload = encodeBase64Url(
    new TextEncoder().encode(JSON.stringify(payload)),
  );
  const signature = await sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionCookie(
  cookieValue: string | undefined,
) {
  if (!cookieValue) {
    return null;
  }

  const secret = getAdminAuthSecret();
  if (!secret) {
    return null;
  }

  const separatorIndex = cookieValue.lastIndexOf(".");
  if (separatorIndex <= 0) {
    return null;
  }

  const encodedPayload = cookieValue.slice(0, separatorIndex);
  const signature = cookieValue.slice(separatorIndex + 1);
  const key = await importSecret(secret);
  const expectedSignature = encodeBase64Url(
    await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(encodedPayload),
    ),
  );

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const decodedPayload = decodeBase64Url(encodedPayload);
    const payload = JSON.parse(decodedPayload) as AdminSessionPayload;

    if (
      !payload.username ||
      !payload.expiresAt ||
      payload.expiresAt < Date.now()
    ) {
      return null;
    }

    return payload;
  } catch (e) {
    return null;
  }
}