"use server";

// import { unstable_cache as cache } from "next/cache";

import { contentfulManagementClient, contentfulClient } from "@/api/contentful";
import { TypeActivitySkeleton } from "@/contentful";

export const getAllActivities = async () => {
  const entries = await contentfulClient.getEntries<TypeActivitySkeleton>({
    content_type: "activity",
  });

  return entries.items;
};

export async function getActivityBySlug(slug: string) {
  // const getCache = cache(async () => {
  const entries = await contentfulClient.getEntries<TypeActivitySkeleton>({
    content_type: "activity",
    "fields.slug[in]": [slug],
  });

  if (entries.items.length === 0) return null;
  const activity = entries.items[0];

  return activity;
  // }, ["activities", slug]);

  // const results = getCache();

  return entries;
}

export async function increaseActivityVisitsById(entryId: string) {
  const client = await contentfulManagementClient();
  const entry = await client.getEntry(entryId);
  const currentVisits = entry.fields.visits["en-US"] || 0;

  entry.fields.visits = {
    "en-US": Number(currentVisits) + 1,
  };

  await entry.update();
  await entry.publish();
}
