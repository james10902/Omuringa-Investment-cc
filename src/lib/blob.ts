const BLOB_API_URL = "https://blob.vercel-storage.com";
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

async function blobHeaders(contentType?: string) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${TOKEN}`,
  };
  if (contentType) {
    headers["x-vercel-blob-content-type"] = contentType;
  }
  return headers;
}

export async function uploadToBlob(
  pathname: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  if (!TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set");
  }

  const url = `${BLOB_API_URL}/${pathname}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: await blobHeaders(contentType),
    body: new Uint8Array(buffer),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Blob upload failed: ${res.status} ${text}`);
  }

  const data = await res.json();
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
