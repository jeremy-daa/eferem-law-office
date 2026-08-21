import { NextRequest, NextResponse } from "next/server";
import { getPresignedUploadUrl, bucketName } from "@/lib/s3";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename") || "image.jpg";
    const contentType = searchParams.get("contentType") || "image/jpeg";

    const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const objectKey = `posts/${Date.now()}_${crypto.randomBytes(4).toString("hex")}_${cleanFilename}`;

    const { uploadUrl, key } = await getPresignedUploadUrl(objectKey, contentType);

    return NextResponse.json({
      success: true,
      uploadUrl,
      objectKey: key,
      bucket: bucketName,
      fileUrl: `${process.env.AWS_ENDPOINT_URL_S3 || "https://s3.neon.tech"}/${bucketName}/${key}`,
    });
  } catch (error: any) {
    console.error("Presigned Upload URL Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate upload URL" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const filename = body.filename || "media_file.png";
    const contentType = body.contentType || "image/png";

    const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const objectKey = `posts/${Date.now()}_${crypto.randomBytes(4).toString("hex")}_${cleanFilename}`;

    const { uploadUrl, key } = await getPresignedUploadUrl(objectKey, contentType);

    return NextResponse.json({
      success: true,
      uploadUrl,
      objectKey: key,
      fileUrl: `${process.env.AWS_ENDPOINT_URL_S3 || "https://s3.neon.tech"}/${bucketName}/${key}`,
    });
  } catch (error: any) {
    console.error("Presigned POST Upload Error:", error);
    return NextResponse.json({ error: "Failed to generate presigned upload link" }, { status: 500 });
  }
}
