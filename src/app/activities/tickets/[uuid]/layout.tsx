import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { getActivityBySlug } from "@/app/activities/actions";
import { getTicket } from "@/app/tickets/actions";
import { ActivitiesTicketsSummary } from "@/components/activities-tickets-summary";
import { Container } from "@/components/container";
import ScrollUp from "@/components/ScrollUp";
import { Title } from "@/components/Title";
import { capitalize } from "@/utils/capitalize";

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
          subtitle={capitalize(
            formatDate(new Date(ticket.date), "EEEE, d 'de' MMMM 'del' yyyy", { locale: es }),
          )}
          title={activity.fields.title}
        />
        {/* <Title
          title={`Entrada para ${activity.fields.title}`}
          subtitle={`Código único #${uuid.split("-")[4]}`}
        /> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="mb-4 md:col-span-2 md:mb-0">{children}</div>
          <ActivitiesTicketsSummary ticket={ticket} activity={activity} />
        </div>
      </Container>
    </>
  );
}
