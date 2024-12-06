"use server";

import { Entry } from "contentful";

import { contentfulClient, contentfulManagementClient } from "@/api/contentful";
import { TypeActivitySkeleton } from "@/contentful";
import { createClient } from "@/utils/supabase/server";

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

export async function getTikTokImage(id: string) {
  interface Response {
    thumbnail_url: string;
  }
  const url = `https://www.tiktok.com/@username/video/${id}`;
  const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
  const request = await fetch(oembedUrl);
  const response = await request.json();
  const typedResponse = response as Response;
  return typedResponse.thumbnail_url || "";
}

export interface CreateActivityReservationDTO {
  date: string;
  slug: string;
  adults: number;
  children: number;
  total: number;
}
export async function createActivityReservation(options: CreateActivityReservationDTO) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("a-reservations").insert(options).select().single();

  return data as unknown as ActivityReservation;
}

export interface ActivityReservation {
  id: string;
  uuid: string;
  date: string;
  adults: number;
  childern: number;
  total: number;
  status: "pending" | "paid" | "cancel";
  email: string | null;
  phone: string | null;
  phone_country_code: string | null;
  created_at: string;
}
export async function getActivityReservation(uuid: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("a-reservations").select("*").eq("uuid", uuid);

  return data as unknown as ActivityReservation;
}
