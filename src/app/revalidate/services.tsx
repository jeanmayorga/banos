export async function revalidate(path: string) {
  const request = await fetch("/api/revalidate", {
    method: "POST",
    body: JSON.stringify({ path }),
  });
  const result = await request.json();

  return result.data as string;
}
