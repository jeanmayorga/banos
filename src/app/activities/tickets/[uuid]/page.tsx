import { redirect } from "next/navigation";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function Page({ params }: Props) {
  const uuid = params.uuid;

  redirect(`/activities/tickets/${uuid}/customer`);
  return <></>;
}
