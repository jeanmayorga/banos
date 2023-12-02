import { supabase } from "#/api";
import { EventsCard } from "#/components/EventsCard";
import { Event } from "#/modules";

interface Props {
  params: {
    date: string;
  };
}
export default async function Page({ params }: Props) {
  const date = params.date;
  const request = await supabase.from("events").select("*").order("time").eq("date", date);

  console.log({ request });

  const events = request.data as Event[];

  return (
    <div>
      <div className="container m-auto my-8 max-w-3xl">
        {events.length === 0 && (
          <div className="text-lg px-4 mt-[100px] text-center leading-none">No hay eventos.</div>
        )}
        {events.map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
