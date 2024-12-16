"use server";

import { createClient } from "@/utils/supabase/server";

export interface Session {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  role: "admin" | "business" | "visitor";
}
export async function getSession(): Promise<Session | null> {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user?.id)
    .single();

  if (userError || profileError) {
    console.log(`Error getSession`, { userError, profileError });
    return null;
  }

  if (profileData && userData.user && userData.user.email) {
    return {
      id: userData.user.id,
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      businessName: profileData.business_name,
      email: userData.user.email,
      role: profileData.role,
    };
  }

  return null;
}
