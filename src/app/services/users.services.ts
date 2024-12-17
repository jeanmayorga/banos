"use server";
import { createClient } from "@/utils/supabase/server";

export interface User {
  uuid: string;
  picture: string;
  full_name: string;
  email: string;
  role: string;
  phone_country_code: string;
  phone: string;
}

export async function getUserByUuid(uuid: string): Promise<User | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("users").select("*").eq("uuid", uuid).single();

  if (error) {
    console.error(`getUserByUuid(${uuid})`, { error });
    return null;
  }

  console.log(`getUserByUuid() ->`, data);
  return data;
}

export interface UserDto {
  uuid: string;
  phone_country_code?: string;
  phone?: string;
  document?: string;
  document_id?: string;
}
export async function updateUser(dto: UserDto) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .update({
      phone: dto.phone,
      phone_country_code: dto.phone_country_code,
      document: dto.document,
      document_id: dto.document_id,
    })
    .eq("uuid", dto.uuid)
    .select("*")
    .single();

  if (error) {
    console.log(`Error updateUser`, { error });
    return null;
  }

  console.log(`updateUser() ->`, data);
  return data;
}
