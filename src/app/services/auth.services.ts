"use server";

import { redirect } from "next/navigation";

import { isProduction } from "@/api/contentful";
import { createClient } from "@/utils/supabase/server";

const redirectTo = isProduction
  ? "https://banos.app/api/auth/callback"
  : "http://localhost:3000/api/auth/callback";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });
  if (error) console.log({ error });

  if (data.url) redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.log({ error });

  return { error };
}
