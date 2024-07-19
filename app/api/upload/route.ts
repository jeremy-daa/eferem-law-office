import { getAuthSession } from "@/lib/authOptions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  } else
    try {
      return NextResponse.json(
        {
          secret: process.env.UPLOADER_SECRET || "No secret",
          url: process.env.UPLOADER_URL || "No url",
        },

        { status: 200 }
      );
    } catch (e: any) {
      return NextResponse.json(
        { message: `Internal Server Err ${e.message}` },
        { status: 500 }
      );
    }
}
