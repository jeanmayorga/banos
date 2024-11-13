"use server";

import { unstable_cache as cache } from "next/cache";

import { contentfulClient } from "@/api/contentful";
import { TypeActivitySkeleton } from "@/contentful";

const getAllContentfulActivities = async () => {
  const entries = await contentfulClient.getEntries<TypeActivitySkeleton>({
    content_type: "activity",
  });

  return entries.items;
};

export const getAllActivities = async () => {
  // const cached = cache(getAllContentfulActivities, ["activitie2s"], { revalidate: 3600 });
  // return cached();
  return getAllContentfulActivities();
};

export async function getActivityBySlug(slug: string) {
  const entries = await contentfulClient.getEntries<TypeActivitySkeleton>({
    content_type: "activity",
    "fields.slug[in]": [slug],
  });

  if (entries.items.length === 0) return null;
  const activity = entries.items[0];
  return activity;
}
