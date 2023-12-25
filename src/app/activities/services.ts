import { supabase } from "#/api";

import { Activity, ActivityPhoto } from "./types";

export async function getActivity(options?: { slug?: string }) {
  if (!options || !options.slug) return null;

  let query = supabase.from("activities").select("*, place:places(*)");

  if (options?.slug) query = query.eq("slug", options.slug);

  const { data, error } = await query.single();

  if (error) return null;

  return data as Activity;
}

export async function getActivities(options?: { slug?: string; is_active?: boolean }) {
  let query = supabase
    .from("activities")
    .select(
      "*, place:places(*), photos:activities_photos(*), photos_count:activities_photos(count)",
    );

  if (options?.slug) query = query.eq("slug", options.slug);
  if (options?.is_active) query = query.eq("is_active", options.is_active);

  query.limit(1, { referencedTable: "activities_photos" });

  const { data, error } = await query;

  if (error) return [];
  // await new Promise((r) => setTimeout(r, 5000));

  return data as Activity[];
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

export async function deleteActivityPhoto(photoId: number) {
  let query = supabase.from("activities_photos").delete().eq("id", photoId);
  const { error } = await query;
  if (error) return false;

  return true;
}
