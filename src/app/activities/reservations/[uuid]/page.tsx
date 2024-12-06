import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import ScrollUp from "@/components/ScrollUp";

import { getActivityReservation } from "../../actions";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function Page({ params }: Props) {
  const uuid = params.uuid;
  const reservation = await getActivityReservation(uuid);
  if (!reservation) return notFound();

  return (
    <>
      <ScrollUp />
      <Container className="md:my-24">{uuid}</Container>
    </>
  );
}
