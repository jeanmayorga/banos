"use server";

import { Entry } from "contentful";

import { contentfulClient, contentfulManagementClient } from "@/api/contentful";
import { TypeActivitySkeleton } from "@/contentful";

export type Activity = Entry<TypeActivitySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
export type GetActivityOptionsTab = "most-visited" | "cheaper" | "most-expensive";
interface GetActivitiesOptions {
  page?: number;
  limit?: number;
  query?: string;
  byTab?: GetActivityOptionsTab;
  byIds?: string[];
  byPlaceSlug?: string;
}
export const getActivities = async ({
  page = 0,
  limit = 1000,
  query = undefined,
  byTab = "most-visited",
  byIds = [],
  byPlaceSlug = undefined,
}: GetActivitiesOptions): Promise<Activity[]> => {
  console.time("getActivities");
  function getQueryObj() {
    if (query) return { "fields.title[match]": query };
    return undefined;
  }
  function getByTabObj() {
    if (byTab === "most-visited") {
      return { order: ["-fields.visits"] };
    }
    if (byTab === "cheaper") {
      return { order: ["fields.adultPrice"] };
    }
    if (byTab === "most-expensive") {
      return { order: ["-fields.adultPrice"] };
    }
    return undefined;
  }
  function getByIdsObj() {
    if (byIds.length > 0) return { "sys.id[in]": byIds };
    return undefined;
  }
  function getByPlaceSlugObj() {
    if (byPlaceSlug) {
      return {
        "fields.place.sys.contentType.sys.id": "places",
        "fields.place.fields.slug": byPlaceSlug,
      };
    }
    return undefined;
  }

  const entries = await contentfulClient.getEntries<TypeActivitySkeleton>({
    content_type: "activity",
    skip: page * limit,
    limit,
    ...getQueryObj(),
    ...getByTabObj(),
    ...getByIdsObj(),
    ...getByPlaceSlugObj(),
  });
  console.log("getActivities ->", {
    content_type: "activity",
    skip: page * limit,
    limit,
    ...getQueryObj(),
    ...getByTabObj(),
    ...getByIdsObj(),
    ...getByPlaceSlugObj(),
  });
  console.timeEnd("getActivities");

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

export async function addVisit(entryId: string) {
  try {
    const client = await contentfulManagementClient();
    let entry = await client.getEntry(entryId);
    const newCount = Number(entry.fields?.visits?.["en-US"] || 0) + 1;
    entry.fields.visits = {
      "en-US": newCount,
    };
    entry = await entry.update();
    await entry.publish();
    console.log(`add visit -> ${entry.fields.slug["en-US"]} -> ${newCount}`);
  } catch (error) {
    console.error(`cannot add visit ${entryId}`, error);
  }
}
