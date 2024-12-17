"use server";

import { User as SessionUser } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/server";

import { getUserByUuid, User } from "./users.services";

export interface Session {
  session: SessionUser;
  user: User;
}
export async function getSession(): Promise<Session | null> {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  if (!session.data || session.error) return null;

  const user = await getUserByUuid(session.data.user.id);
  if (!user) return null;

  console.log(`getSession()`);
  return {
    session: session.data.user,
    user,
  };
}
