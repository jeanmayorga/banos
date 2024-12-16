"use server";

import { createClient } from "@/utils/supabase/server";

export async function signInWithPassword(options: { email: string; password: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(options);
  if (error) console.log({ error });

  return { data, error };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.log({ error });

  return { error };
}
