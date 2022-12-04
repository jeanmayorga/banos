import { supabase } from "api";
import { Calendar } from "components";
import { Steps } from "components/Steps";
import { Event } from "modules";
import Head from "next/head";
import { getCurrentDate } from "utils";

export default function Page({ events }: { events: Event[] }) {
  return (
    <div>
      <Head>
        <title>Baños de Agua Santa</title>
      </Head>
      <Calendar />
      <div className="container m-auto">
        <div className="my-8">
          <Steps events={events} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const currentDate = getCurrentDate();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("date", encodeURI(currentDate));

  return {
    props: {
      events,
    },
  };
}
