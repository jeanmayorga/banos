export async function getTikTokVideos() {
  const url = new URL("https://open.tiktokapis.com/v2/research/video/query/");
  url.searchParams.set("fields", "id,like_count");

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer zMNtXWR9FHcVR2FBtBCdqViYA5M6Oaa9",
    },
  });
}
