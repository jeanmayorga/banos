import { supabase } from "#/api";
import { Steps } from "#/components/Steps";
import { getCurrentDate } from "#/utils";
import { Calendar } from "lucide-react";
import Head from "next/head";
import { Event } from "#/modules/events";


export default function Page({ events }: { events: Event[] }) {
  return (
    <div>
      <Head>
        <title>Baños de Agua Santa</title>
      </Head>
      <Calendar />
      <div className="container m-auto">
        <div className="mt-4">
          <div className="text-lg px-4 leading-none">Eventos para hoy</div>
          <Steps events={events} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const currentDate = getCurrentDate();
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('time')
    .eq('date', encodeURI(currentDate));

  return {
    props: {
      events,
    },
  };
}
