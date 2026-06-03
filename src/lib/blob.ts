const BLOB_API_URL = "https://blob.vercel-storage.com";
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

async function blobHeaders(contentType?: string) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${TOKEN}`,
    "x-vercel-blob-access": "public",
  };
  if (contentType) {
    headers["x-vercel-blob-content-type"] = contentType;
  }
  return headers;
}

function encodePathname(pathname: string): string {
  return pathname
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export async function uploadToBlob(
  pathname: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  if (!TOKEN) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set. Go to Vercel Dashboard → Storage → Blob → Connect Store → copy the token into your environment variables."
    );
  }

  const url = `${BLOB_API_URL}/${encodePathname(pathname)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: await blobHeaders(contentType),
    body: new Uint8Array(buffer),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Blob upload failed: ${res.status} ${text}`);
  }

  const contentTypeHeader = res.headers.get("content-type") || "";
  if (!contentTypeHeader.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Blob upload returned unexpected response: ${text}`);
  }

  const data = await res.json();
  if (!data.url) {
    throw new Error("Blob upload response missing URL");
  }
  return data.url as string;
}

export async function deleteFromBlob(blobUrl: string): Promise<void> {
  if (!TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set");
  }

  const res = await fetch(`${BLOB_API_URL}?url=${encodeURIComponent(blobUrl)}`, {
    method: "DELETE",
    headers: await blobHeaders(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Blob delete failed: ${res.status} ${text}`);
  }
}
