import { TypeActivitySkeleton } from "@/contentful";
import { client } from "@/contentful/client";

export async function getAllActivities() {
  const entries = await client.getEntries<TypeActivitySkeleton>({
    content_type: "activity",
  });

  return entries.items;
}

export async function getActivityBySlug(slug: string) {
  const entries = await client.getEntries<TypeActivitySkeleton>({
    content_type: "activity",
    "fields.slug[in]": [slug],
  });

  if (entries.items.length === 0) return null;
  const activity = entries.items[0];

  return activity;
}
