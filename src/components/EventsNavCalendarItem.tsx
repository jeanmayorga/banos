import clsx from "clsx";
import { add, format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

interface Props {
  date: string;
  isActive: boolean;
}
export function EventsNavCalendarItem({ date, isActive }: Props) {
  const currentDate = add(new Date(date), {
    hours: 5,
  });

  return (
    <Link href={`/events/${date}`} passHref id={isActive ? "link-active" : undefined}>
      <div
        className={clsx(
          isActive
            ? "bg-white text-fuchsia-800"
            : "text-gray-100 active:text-fuchsia-800 hover:bg-fuchsia-700",
          "my-2 px-4 py-1 text-center active:bg-white rounded-lg transition-all",
        )}
      >
        <div className="text-xs font-light">{format(currentDate, "MMM", { locale: es })}</div>
        <div className="text-2xl">{format(currentDate, "dd")}</div>
        <div>{format(currentDate, "E", { locale: es }).toUpperCase()}</div>
      </div>
    </Link>
  );
}
