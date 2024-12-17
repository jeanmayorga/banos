"use server";
import { createClient } from "@/utils/supabase/server";

import { Ticket } from "../tickets/types";

export async function getTicketsByUserUuid(uuid: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tickets").select("*").eq("user_uuid", uuid);

  if (error) {
    console.error("getTickets error:", error);
    return [];
  }

  return data as unknown as Ticket[];
}
