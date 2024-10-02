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
      <div className="relative h-[180px] w-[280px] rounded-lg bg-black dark:bg-slate-900">
        <div className="absolute left-2 top-2 rounded-lg bg-white px-4 py-1 text-center transition-all dark:bg-slate-600">
          <div>{format(new Date(date), "MMM", { locale: es }).toUpperCase()}</div>
          <div className="text-2xl">{format(new Date(date), "dd")}</div>
        </div>
        <Badge variant="secondary" className="absolute bottom-2 left-2">
          <MapPinnedIcon className="mr-1 h-4 w-4" />
          {place}
        </Badge>
      </div>
      <div className="w-full">
        <Typography variant="large" className="pt-2">
          {title.substring(0, 20)}
        </Typography>
      </div>
      <Typography variant="muted" className="m-0 flex items-center p-0">
        <CalendarClockIcon className="mr-1 h-4 w-4" /> {time}
      </Typography>
    </Link>
  );
}
