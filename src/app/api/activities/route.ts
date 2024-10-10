import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();

    if (!path) {
      return NextResponse.json({ message: "Path is required" }, { status: 400 });
    }

    revalidatePath(path);

    return NextResponse.json({ message: "Revalidation triggered" });
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating", error }, { status: 500 });
  }
}
