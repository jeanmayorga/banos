// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Obtenemos la URL de la solicitud
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get("tag");

  if (!tag) {
    return NextResponse.json({ message: "tag is required" }, { status: 400 });
  }

  try {
    // Revalidamos el path (puedes combinarlo con los params si es necesario)
    revalidateTag(tag);

    return NextResponse.json({
      message: `Revalidation triggered for ${tag}`,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating", error }, { status: 500 });
  }
}
