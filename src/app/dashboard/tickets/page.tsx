import { Ticket } from "@/app/tickets/types";
import { Title } from "@/components/Title";
import { createClient } from "@/utils/supabase/server";

import { TicketsTable } from "./TicketsTable";

export default async function Page() {
  const supabase = await createClient();
  const results = await supabase.from("tickets").select("*");
  const tickets = (results.data || []) as unknown as Ticket[];

  return (
    <>
      <Title title="Tickets" subtitle="Aqui tienen todos las reservaciones" />
      <TicketsTable tickets={tickets} />
    </>
  );
}
