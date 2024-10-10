// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Obtenemos la URL de la solicitud
  const { searchParams } = new URL(request.url);

  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ message: "Path is required" }, { status: 400 });
  }

  try {
    // Revalidamos el path (puedes combinarlo con los params si es necesario)
    revalidatePath(path);

    return NextResponse.json({
      message: `Revalidation triggered for ${path}`,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating", error }, { status: 500 });
  }
}
