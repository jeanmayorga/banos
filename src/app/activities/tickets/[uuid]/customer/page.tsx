import { getSession } from "@/app/services/session.service";
import { getTicket } from "@/app/tickets/actions";
import { ActivitiesTicketsFormCustomer } from "@/components/activities-tickets-form-customer";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function Page({ params }: Props) {
  const uuid = params.uuid;
  const ticket = await getTicket(uuid);
  const session = await getSession();

  return <ActivitiesTicketsFormCustomer uuid={uuid} session={session} ticket={ticket} />;
}
