import { CalendarClockIcon, MapPinnedIcon } from "lucide-react";

import { Event } from "#/modules/events";

import { Button } from "./ui/button";

interface Props {
  event: Event;
}
export function EventsCard({ event }: Props) {
  const { title, time, cover, place, placeUrl, description } = event;

  return (
    <div className="p-4 flex relative group">
      <div>
        <div className="bg-fuchsia-800 text-white font-semibold text-xs rounded-lg px-2 py-2 flex items-center justify-center">
          <CalendarClockIcon className="w-5 h-5 mr-1" />
          {time}
        </div>
        <div className="w-1 h-full bg-fuchsia-800 absolute left-[55px] group-last:hidden" />
      </div>

      <div className="ml-4 border-gray-200 border shadow px-4 py-8 rounded-lg group-last:border-0 pb-8 w-full">
        <h2 className="text-fuchsia-800 text-xl leading-none mb-4">{title}</h2>
        <a href={placeUrl || ""} target="_blank" rel="noreferrer" className="mb-4 block">
          <Button variant="secondary" size="sm">
            <MapPinnedIcon className="w-4 h-4 mr-1" />
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
