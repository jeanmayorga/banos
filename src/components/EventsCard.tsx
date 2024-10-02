import { CalendarClockIcon, MapPinnedIcon } from "lucide-react";

import { Event } from "#/modules/events";

import { Button } from "./ui/button";

interface Props {
  event: Event;
}
export function EventsCard({ event }: Props) {
  const { title, time, cover, place, placeUrl, description } = event;

  return (
    <div className="group relative flex p-4">
      <div>
        <div className="flex items-center justify-center rounded-lg bg-fuchsia-800 px-2 py-2 text-xs font-semibold text-white">
          <CalendarClockIcon className="mr-1 h-5 w-5" />
          {time}
        </div>
        <div className="absolute left-[55px] h-full w-1 bg-fuchsia-800 group-last:hidden" />
      </div>

      <div className="ml-4 w-full rounded-lg border border-gray-200 px-4 py-8 pb-8 shadow group-last:border-0">
        <h2 className="mb-4 text-xl leading-none text-fuchsia-800">{title}</h2>
        <a href={placeUrl || ""} target="_blank" rel="noreferrer" className="mb-4 block">
          <Button variant="secondary" size="sm">
            <MapPinnedIcon className="mr-1 h-4 w-4" />
            {place}
          </Button>
        </a>
        {description && <div className="text-base text-gray-400">{description}</div>}
        {/* {cover && (
          <div className="relative rounded-lg w-full overflow-hidden h-[200px]">
            <div className="absolute z-10 bg-[rgba(0,0,0,.3)] w-full h-full" />
            <Image src={cover} alt={title} fill className=" object-cover" />
          </div>
        )} */}
      </div>
    </div>
  );
}
