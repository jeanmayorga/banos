import Head from "next/head";
import { Calendar, NavBar, Steps } from "components";
import { useRouter } from "next/router";
import { add, format } from "date-fns";
import { es } from "date-fns/locale";
import { supabase } from "api";
import { Event } from "modules/events";

export default function Page({ events }: { events: Event[] }) {
  const router = useRouter();
  const { date } = router.query;

  return (
    <div>
      <Head>
        <title>{date} | Baños de Agua Santa</title>
      </Head>
      <Calendar withBorder />
      <NavBar
        title={format(
          add(new Date(date as string), {
            hours: 5,
          }),
          "EEEE, d 'de' LLLL 'del' yyyy",
          {
            locale: es,
          }
        )}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        }
      />
      <div className="container m-auto">
        {events.length === 0 && (
          <div className="text-lg px-4 mt-[100px] text-center leading-none">
            No hay eventos.
          </div>
        )}
        <Steps events={events} />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }: any) {
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("time")
    .eq("date", encodeURI(params.date));

  return {
    props: {
      events,
    },
  };
}

export async function getStaticPaths() {
  const calendar = [
    "2022-11-30",
    "2022-12-01",
    "2022-12-02",
    "2022-12-03",
    "2022-12-04",
    "2022-12-05",
    "2022-12-06",
    "2022-12-07",
    "2022-12-08",
    "2022-12-09",
    "2022-12-10",
    "2022-12-11",
    "2022-12-12",
    "2022-12-13",
    "2022-12-14",
    "2022-12-15",
    "2022-12-16",
  ];

  const paths = calendar?.map((event) => {
    return {
      params: {
        date: event,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
