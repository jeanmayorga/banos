import Link from "next/link";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import clsx from "clsx";

interface Props {
  day: Date;
  isActive: boolean;
}
export function ItemCalendar({ day, isActive }: Props) {
  return (
    <Link href={`/day/${day.toISOString().split("T")[0]}`} passHref>
      <div
        className={clsx(
          isActive && "bg-white text-fuchsia-800",
          "my-2 px-4 py-1 text-gray-100 text-center hover:bg-fuchsia-700 active:bg-white active:text-fuchsia-800 rounded-lg transition-all"
        )}
      >
        <div className="text-2xl">{format(day, "dd")}</div>
        <div>{format(day, "E", { locale: es }).toUpperCase()}</div>
      </div>
    </Link>
  );
}
