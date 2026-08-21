import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.AWS_ENDPOINT_URL_S3 || "https://s3.neon.tech";
const region = process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "neon_access_key";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "neon_secret_key";
export const bucketName = process.env.S3_BUCKET_NAME || "post-items";

export const s3Client = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
});

/**
 * Generate a presigned PUT URL for direct client uploads to the Neon post-items bucket.
 */
export async function getPresignedUploadUrl(key: string, contentType: string = "image/jpeg") {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  // URL valid for 15 minutes (900 seconds)
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });
  return { uploadUrl, key };
}

/**
 * Generate a clean direct public URL for retrieving media objects from the bucket.
 */
export async function getPresignedReadUrl(key: string) {
  if (!key) return "";
  
  // If key is already a full URL, strip any signed query parameters (e.g. ?X-Amz-Algorithm=...)
  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key.split("?")[0];
  }
  
  const cleanEndpoint = endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint;
  const cleanKey = key.startsWith("/") ? key.slice(1) : key;
  return `${cleanEndpoint}/${bucketName}/${cleanKey}`;
}

/**
 * Delete an object from the S3 bucket.
 */
export async function deleteS3Object(key: string) {
  if (!key || key.startsWith("http")) return;
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    await s3Client.send(command);
  } catch (error) {
    console.error("Failed to delete S3 object:", error);
  }
}
