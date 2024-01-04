import { getPagination } from "#/utils/get-pagination";
import { supabase } from "#/utils/supabase";

import { Place } from "../places/types";

import { Activity, ActivityPhoto } from "./types";

export async function getActivity(options?: { slug?: string }) {
  if (!options || !options.slug) return null;

  let query = supabase.from("activities").select("*, place:places(*), photos:activities_photos(*)");

  if (options?.slug) query = query.eq("slug", options.slug);

  const { data, error } = await query.single();

  if (error) return null;

  return data as Activity;
}

export interface GetActivitiesOptions {
  placeId?: number;
  slug?: string;
  isActive?: boolean;
  sortBy?: "visits" | "name" | "price" | string;
  sortOrder?: "asc" | "desc" | string;
  search?: string;
  limit?: number;
  page?: number;
  activitySelect?: Array<keyof Activity>;
  placeSelect?: Array<keyof Place>;
}
export async function getActivities(options?: GetActivitiesOptions) {
  const sortOrderDefault = options?.sortOrder || "desc";
  const sortByDefault = options?.sortBy || "visits";
  const limitDefault = options?.limit || 12;
  const pageDefault = options?.page || 0;
  const activitySelectDefault = options?.activitySelect ? options?.activitySelect?.join(",") : "*";
  const activityPlaceDefault = options?.placeSelect ? options?.placeSelect?.join(",") : "*";

  const ascending = sortOrderDefault === "asc";
  const select = `${activitySelectDefault}, place:places(${activityPlaceDefault}), photos:activities_photos(*), photos_count:activities_photos(count)`;

  const { from, to } = getPagination(pageDefault, limitDefault);

  let query = supabase.from("activities").select(select).range(from, to);

  if (options?.placeId) query = query.eq("place_id", options?.placeId);
  if (options?.slug) query = query.eq("slug", options.slug);
  if (options?.isActive) query = query.eq("is_active", options.isActive);
  if (options?.search) query = query.ilike("title", `%${options.search}%`);
  if (sortByDefault === "visits") query = query.order("visits", { ascending });
  if (sortByDefault === "name") query = query.order("title", { ascending });
  if (sortByDefault === "price") query = query.order("price", { ascending });

  const { data, error } = await query;

  if (error) return [];

  return data as unknown as Activity[];
}

export async function updateActivity(options: Partial<Activity>) {
  let query = supabase
    .from("activities")
    .update(options)
    .eq("slug", options.slug)
    .select("*, place:places(*)");

  const { data, error } = await query;
  if (error) return [];

  return data as Activity[];
}

export async function createActivity(options: Partial<Activity>) {
  let query = supabase
    .from("activities")
    .insert(options)
    .eq("slug", options.slug)
    .select("*, place:places(*)");

  const { data, error } = await query;
  if (error) return [];

  return data as Activity[];
}

export async function getActivityPhotos(options: { activityId?: number; limit?: number }) {
  let query = supabase
    .from("activities_photos")
    .select("*")
    .eq("activity_id", options.activityId)
    .order("index", { ascending: true })
    .select("*");

  if (options.limit) query.limit(options.limit);

  const { data, error } = await query;

  if (error) return [];

  return data as ActivityPhoto[];
}

export async function createActivityPhoto(options: Omit<ActivityPhoto, "id">) {
  let query = supabase
    .from("activities_photos")
    .insert(options)
    .eq("activity_id", options.activity_id)
    .select("*")
    .single();

  const { data, error } = await query;
  if (error) return null;

  return data as ActivityPhoto;
}
export async function updateActivityPhoto(options: ActivityPhoto[]) {
  let query = supabase.from("activities_photos").upsert(options).select("*");

  const { data, error } = await query;
  if (error) return null;

  return data as ActivityPhoto[];
}

export async function deleteActivityPhoto(photoId: number) {
  let query = supabase.from("activities_photos").delete().eq("id", photoId);
  const { error } = await query;
  if (error) return false;

  return true;
}
