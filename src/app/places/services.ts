import { supabase } from "#/utils/supabase";

import { Place } from "./types";

export async function getPlaces() {
  let query = supabase.from("places").select("*");

  const { data, error } = await query;

  if (error) return [];

  return data as Place[];
}

export async function getPlace(options?: { slug?: string }) {
  if (!options || !options.slug) return null;

  let query = supabase.from("places").select("*");

  if (options?.slug) query = query.eq("slug", options.slug);

  const { data, error } = await query.single();

  if (error) return null;

  return data as Place;
}
