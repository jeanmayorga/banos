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

  return <ActivitiesTicketsFormCustomer uuid={uuid} ticket={ticket} />;
}
