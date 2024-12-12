"use server";
import { createClient } from "@/utils/supabase/server";

import { Ticket, TicketDTO } from "./types";

export const createTicket = async (ticket: TicketDTO) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tickets").insert(ticket).select("*").single();

  if (error) {
    console.error("createTicket error:", error);
    return null;
  }

  return data as unknown as Ticket;
};

export const updateTicket = async (uuid: string, ticket: TicketDTO) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .update(ticket)
    .eq("uuid", uuid)
    .select("*")
    .single();

  if (error) {
    console.error("updateTicket error:", error);
    return null;
  }

  return data as unknown as Ticket;
};

export const getTickets = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tickets").select("*");

  if (error) {
    console.error("getTickets error:", error);
    return null;
  }

  return data as unknown as Ticket[];
};

export const getTicket = async (uuid: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tickets").select("*").eq("uuid", uuid).single();
  if (error) {
    console.error("getTickets error:", error);
    return null;
  }

  return data as unknown as Ticket;
};
