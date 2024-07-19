import { NextRequest, NextResponse } from "next/server";
import Contact from "@/models/Contact";
import { getAuthSession } from "@/lib/authOptions";
import dbConnect from "@/utils/dbConnect";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id || "";
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  } else {
    try {
      await dbConnect();
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) {
        return NextResponse.json(
          { message: "Contact not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Contact deleted successfully" },
        { status: 200 }
      );
    } catch (e: any) {
      return NextResponse.json(
        { message: `Internal server error ${e.message}` },
        { status: 500 }
      );
    }
  }
}
