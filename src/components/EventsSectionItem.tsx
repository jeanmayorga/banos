import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarClockIcon, MapPinnedIcon } from "lucide-react";
import Link from "next/link";

import { Event } from "#/modules/events";

import { Badge } from "./ui/badge";
import { Typography } from "./ui/typography";

interface Props {
  event: Event;
}
export function EventsSectionItem({ event }: Props) {
  const { title, time, date, cover, place, placeUrl } = event;

  return (
    <Link href={`/events/${date}`} passHref>
      <div className="w-[280px] h-[180px] bg-black dark:bg-slate-900 rounded-lg relative">
        <div className="top-2 left-2 absolute px-4 py-1 text-center bg-white dark:bg-slate-600 rounded-lg transition-all">
          <div>{format(new Date(date), "MMM", { locale: es }).toUpperCase()}</div>
          <div className="text-2xl">{format(new Date(date), "dd")}</div>
        </div>
        <Badge variant="secondary" className="absolute bottom-2 left-2">
          <MapPinnedIcon className="w-4 h-4 mr-1" />
          {place}
        </Badge>
      </div>
      <div className="w-full">
        <Typography variant="large" className="pt-2">
          {title.substring(0, 20)}
        </Typography>
      </div>
      <Typography variant="muted" className="m-0 p-0 flex items-center">
        <CalendarClockIcon className="w-4 h-4 mr-1" /> {time}
      </Typography>
    </Link>
  );
}
