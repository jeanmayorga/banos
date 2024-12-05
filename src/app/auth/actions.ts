"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface SignInOptions {
  email: string;
  password: string;
}
export async function authSignIn({ email, password }: SignInOptions) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const hasError = Boolean(error);
  const hasSuccess = !hasError;

  if (hasSuccess) {
    redirect("/dashboard");
  }

  return hasError;
}

export async function authSignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
}
