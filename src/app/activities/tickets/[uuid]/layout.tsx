import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { getActivityBySlug } from "@/app/activities/actions";
import { getTicket } from "@/app/tickets/actions";
import { ActivitiesTicketsSummary } from "@/components/activities-tickets-summary";
import { Container } from "@/components/container";
import ScrollUp from "@/components/ScrollUp";
import { Title } from "@/components/Title";

interface Props {
  params: {
    uuid: string;
  };
  children: ReactNode;
}

export default async function Layout({ params, children }: Props) {
  const uuid = params.uuid;
  const ticket = await getTicket(uuid);

  const slug = ticket?.slug;
  const activity = await getActivityBySlug(slug);

  if (!ticket || !activity) return notFound();

  return (
    <>
      <ScrollUp />
      <Container className="my-4 md:my-24">
        <Title
          title={`Entrada - ${activity.fields.title}`}
          subtitle={`Código #${uuid.split("-")[4]}`}
        />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="col-span-2">{children}</div>
          <ActivitiesTicketsSummary ticket={ticket} activity={activity} />
        </div>
      </Container>
    </>
  );
}
