import { notFound } from "next/navigation";

import { getActivityBySlug } from "@/app/activities/actions";
import { Container } from "@/components/container";
import { Header } from "@/components/Header";
import ScrollUp from "@/components/ScrollUp";
import { Title } from "@/components/Title";

import { getTicket } from "../actions";
import { CustomerInformation } from "../components/CustomerInformation";
import { Summary } from "../components/Summary";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function Page({ params }: Props) {
  const uuid = params.uuid;
  const ticket = await getTicket(uuid);
  const activity = await getActivityBySlug(ticket?.slug);

  if (!ticket || !activity) return notFound();

  return (
    <>
      <Header />
      <ScrollUp />
      <Container className="my-4 md:my-24">
        <Title title="Ticket" subtitle={`Código #${uuid.split("-")[4]}`} />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="col-span-2">
            <CustomerInformation ticket={ticket} activity={activity} />
          </div>
          <div>
            <Summary ticket={ticket} activity={activity} />
          </div>
        </div>
      </Container>
    </>
  );
}
