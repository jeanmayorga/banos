import { EventsCard } from "#/components/EventsCard";
import { Event } from "#/modules";
import { supabase } from "#/utils/supabase";

export const revalidate = 3600;

interface Props {
  params: {
    date: string;
  };
}
export default async function Page({ params }: Props) {
  const date = params.date;
  const request = await supabase
    .from("events")
    .select("*, places:places(*)")
    .order("time")
    .eq("date", date);

  const events = request.data as Event[];

  return (
    <div>
      <div className="container m-auto my-8 max-w-3xl">
        {events.length === 0 && (
          <div className="mt-[100px] px-4 text-center text-lg leading-none">No hay eventos.</div>
        )}
        {events.map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
