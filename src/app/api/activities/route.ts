import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const path = `/activities/${body.slug}`;

    revalidatePath(path);

    return Response.json({ path });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
