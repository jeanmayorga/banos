import { supabase } from "#/api";

import { Place } from "./types";

export async function getPlaces() {
  let query = supabase.from("places").select("*");

  const { data, error } = await query;

  if (error) return [];

  return data as Place[];
}
