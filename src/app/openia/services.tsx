export async function createImage(content: string) {
  const request = await fetch("/api/openia?service=image", {
    method: "POST",
    body: JSON.stringify({ content }),
  });
  const result = await request.json();

  return result.data as string;
}

export async function createContent(content: string) {
  const request = await fetch("/api/openia?service=chat", {
    method: "POST",
    body: JSON.stringify({ content }),
  });
  const result = await request.json();

  return result.data as string;
}
