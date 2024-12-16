import { getTicket } from "@/app/tickets/actions";
import { ActivitiesFormTicketPayment } from "@/components/activities-tickets-form-payment";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function Page({ params }: Props) {
  const uuid = params.uuid;
  const ticket = await getTicket(uuid);

  return <ActivitiesFormTicketPayment uuid={uuid} ticket={ticket} />;
}
