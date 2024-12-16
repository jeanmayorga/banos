import { redirect } from "next/navigation";

import { getActivityBySlug } from "@/app/activities/actions";
import { getTicket } from "@/app/tickets/actions";
import { ActivitiesTicketsSummary } from "@/components/activities-tickets-summary";
import { Container } from "@/components/container";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function Page({ params }: Props) {
  const uuid = params.uuid;
  const ticket = await getTicket(uuid);
  const activity = await getActivityBySlug(ticket?.slug);

  if (!ticket || !activity) {
    return redirect("/dashboard/activities");
  }

  return (
    <>
      <Container>
        <ActivitiesTicketsSummary ticket={ticket} activity={activity} />
      </Container>
    </>
  );
}
