import { TicketPlusIcon } from "lucide-react";
import Link from "next/link";

import { getActivityBySlug } from "@/app/activities/actions";
import { getTicketsByUserUuid } from "@/app/services/tickets.service";
import { Ticket } from "@/app/tickets/types";

import { ActivitiesTicketsSummary } from "./activities-tickets-summary";
import { H2 } from "./h2";
import { Button } from "./ui/button";

interface AccuntTicketProps {
  ticket: Ticket;
}
async function AccountTicket({ ticket }: AccuntTicketProps) {
  const activity = await getActivityBySlug(ticket.slug);
  return (
    <ActivitiesTicketsSummary
      ticket={ticket}
      activity={activity}
      pXClassName="px-4"
      pYClassName="py-4"
      withLink
    />
  );
}

interface Props {
  userUuid: string;
}
export async function AccountTouristTickets({ userUuid }: Props) {
  const tickets = await getTicketsByUserUuid(userUuid);

  return (
    <>
      <div className="flex items-start justify-between">
        <H2 className="mb-8">Tus entradas</H2>
        <Button variant="outline" className="rounded-full" disabled>
          <TicketPlusIcon /> Agregar un ticket
        </Button>
      </div>
      <div className="mb-8 grid gap-8 md:grid-cols-2">
        {tickets.map((ticket) => (
          <AccountTicket key={ticket.uuid} ticket={ticket} />
        ))}
      </div>
    </>
  );
}
