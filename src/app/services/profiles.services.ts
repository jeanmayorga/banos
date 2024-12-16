import { createClient } from "@/utils/supabase/server";

export interface ProfileDTO {
  firstName: string;
  lastName: string;
}
export async function updateProfile(id: string, dto: ProfileDTO) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: dto.firstName,
      last_name: dto.lastName,
    })
    .eq("id", id);

  if (error) {
    console.log(`Error updateProfile`, { error });
    throw new Error(`Error updateProfile id ${id}`);
  }

  return data;
}
