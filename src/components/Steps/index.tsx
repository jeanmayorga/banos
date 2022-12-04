import { Event } from "modules";
import { Step } from "./Step";

interface Props {
  events: Event[];
}
export function Steps({ events }: Props) {
  return (
    <>
      {events.map((event) => (
        <Step key={event.id} event={event} />
      ))}
    </>
  );
}
