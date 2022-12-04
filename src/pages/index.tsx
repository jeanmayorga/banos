import { supabase } from "api";
import Head from "next/head";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  slug: string;
  name: string;
  live_url: string;
  created_at: string;
}

export default function Page({ serverEvent }: { serverEvent: Event }) {
  console.log({ serverEvent });
  const [event, setEvent] = useState<Event>(serverEvent);

  useEffect(() => {
    const listener = supabase
      .channel("public:local_events")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "local_events" },
        (payload: { new: Event }) => {
          setEvent(payload.new);
        }
      );

    listener.subscribe();

    return () => {
      supabase.removeChannel(listener);
    };
  }, []);

  if (!event) return;

  return (
    <div>
      <Head>
        <title>Elección de la reina de Baños de Agua Santa</title>
        <meta
          name="title"
          content="Elección de la reina de Baños de Agua Santa"
        />
        <meta
          name="description"
          content="Elección y Coronación de la Belleza y la Mujer Baneña - 2022"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://banos.app/" />
        <meta
          property="og:title"
          content="Elección de la reina de Baños de Agua Santa"
        />
        <meta
          property="og:description"
          content="Elección y Coronación de la Belleza y la Mujer Baneña - 2022"
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />
      </Head>
      <div className="bg-fuchsia-900 text-white p-4 py-3 text-ellipsis whitespace-nowrap w-full text-center">
        {event.name}
      </div>
      <div className="container m-auto">
        <div>
          <iframe
            src={event.live_url}
            style={{
              border: "none",
              overflow: "hidden",
            }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            className="border-none w-full h-[220px] lg:h-[865px]"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data: serverEvent } = await supabase
    .from("local_events")
    .select("*")
    .eq("slug", "eleccion_reina")
    .single();

  return {
    props: {
      serverEvent,
    },
  };
}
