import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const path = body.path;

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
