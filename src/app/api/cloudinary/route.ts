// import { v2 as cloudinary } from "cloudinary";

export const runtime = "edge";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const path = body.path as string;

    const file = path.split("/")[1];
    const public_id = file.split(".")[0];

    // const data = await cloudinary.uploader.destroy(public_id);

    return Response.json({ data: "" });
  } catch (e: any) {
    console.log(`${e.message}`);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
