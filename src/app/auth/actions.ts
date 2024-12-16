"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface SignInOptions {
  email: string;
  password: string;
  redirectTo?: string;
}
export async function authSignIn({ email, password, redirectTo }: SignInOptions) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const hasError = Boolean(error);
  const hasSuccess = !hasError;

  if (hasSuccess) {
    redirect(redirectTo || "/");
  }

  return hasError;
}

export async function authSignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  return redirect("/");
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  role: "admin" | "business" | "visitor";
}
export async function getAuthUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const { data: profileData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user?.id)
    .single();

  if (profileData && authData.user && authData.user.email) {
    return {
      id: authData.user.id,
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      businessName: profileData.business_name,
      email: authData.user.email,
      role: profileData.role,
    };
  }

  return null;
}

export interface AuthUserDTO {
  firstName: string;
  lastName: string;
}
export async function updateAuthUser(dto: AuthUserDTO) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (authData) {
    await supabase
      .from("profiles")
      .update({
        first_name: dto.firstName,
        last_name: dto.lastName,
      })
      .eq("id", authData.user?.id);
  }
}
