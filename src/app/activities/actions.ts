"use server";

import { contentfulClient } from "@/api/contentful";
import { TypeActivitySkeleton } from "@/contentful";

interface GetActivitiesOptions {
  page?: number;
  limit?: number;
  tab?: string;
  order?: string[];
  ids?: string[];
  query?: string;
}
export const getAllActivities = async ({
  limit = 1000,
  page = 0,
  ids = [],
  order = [],
  query,
}: GetActivitiesOptions) => {
  "use cache";
  const containsIdsObj = ids.length > 0 ? { "sys.id[in]": ids } : {};
  const orderObj = order.length > 0 ? { order } : {};
  const queryObj = query ? { "fields.title[match]": query } : {};

  const entries = await contentfulClient.getEntries<TypeActivitySkeleton>({
    content_type: "activity",
    limit,
    skip: page * limit,
    ...containsIdsObj,
    ...orderObj,
    ...queryObj,
  });

  return entries.items;
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
