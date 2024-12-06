"use server";

import { createClient } from "@/utils/supabase/server";

export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  role: "admin" | "business" | "visitor";
}
export async function getCurrentUser(): Promise<CurrentUser | null> {
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

export interface CurrentUserDTO {
  firstName: string;
  lastName: string;
  businessName: string;
}
export async function updateCurrentUser(dto: CurrentUserDTO) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (authData) {
    await supabase
      .from("profiles")
      .update({
        first_name: dto.firstName,
        last_name: dto.lastName,
        business_name: dto.businessName,
      })
      .eq("id", authData.user?.id);
  }
}
