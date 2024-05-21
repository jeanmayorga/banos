export async function deletePhoto(path: string) {
  const request = await fetch("/api/cloudinary", {
    method: "DELETE",
    body: JSON.stringify({ path }),
  });
  const result = await request.json();

  return result.data as string;
}
