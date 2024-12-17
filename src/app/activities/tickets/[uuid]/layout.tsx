import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { MailIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { getActivityBySlug } from "@/app/activities/actions";
import { getTicket } from "@/app/tickets/actions";
import { ActivitiesTicketsSummary } from "@/components/activities-tickets-summary";
import { Container } from "@/components/container";
import { WhatsappIcon } from "@/components/icon-whatsapp";
import ScrollUp from "@/components/ScrollUp";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
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

  if (ticket.payment_status === "paid") {
    return (
      <>
        <ScrollUp />
        <Container className="my-8 max-w-xl">
          <ActivitiesTicketsSummary
            ticket={ticket}
            activity={activity}
            showShareButtons
            showQrCode
            showCustomer
            pYClassName="py-4"
            pXClassName="px-8"
            pYContainerClassName="py-4"
          />
        </Container>
      </>
    );
  }

  return (
    <>
      <ScrollUp />
      <Container className="my-4 md:my-8">
        <Title
          subtitle={capitalize(
            formatDate(new Date(ticket.date), "EEEE, d 'de' MMMM 'del' yyyy", { locale: es }),
          )}
          title={activity.fields.title}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="mb-4 md:col-span-2 md:mb-0">{children}</div>
          <div>
            <ActivitiesTicketsSummary
              ticket={ticket}
              activity={activity}
              pYContainerClassName="py-2"
              pYClassName="py-4"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
