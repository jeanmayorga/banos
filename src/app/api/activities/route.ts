import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const path = `/activities/${body.slug["en-US"]}`;

    revalidatePath(path);
    revalidateTag("activities");

    return Response.json({ path });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
