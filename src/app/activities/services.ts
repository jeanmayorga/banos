import { supabase } from "#/api";

import { Activity } from "./types";

export async function getActivity(options: { slug?: string }) {
  let query = supabase.from("activities").select("*, place:places(*)");

  if (options.slug) {
    query = query.eq("slug", options.slug);
  }

  const { data, error } = await query.single();

  if (error) return null;

  return data as Activity;
}

export async function getActivities(options: { slug?: string }) {
  let query = supabase.from("activities").select("*, place:places(*)");

  if (options.slug) {
    query = query.eq("slug", options.slug);
  }

  const { data, error } = await query;

  if (error) return [];

  return data as Activity[];
}
