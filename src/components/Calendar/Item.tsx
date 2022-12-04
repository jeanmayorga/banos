import Link from "next/link";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import clsx from "clsx";

interface Props {
  date: string;
  isActive: boolean;
}
export function ItemCalendar({ date, isActive }: Props) {
  const currentDate = new Date(date);
  return (
    <Link href={`/events/${date.split(":")[0]}`} passHref>
      <div
        className={clsx(
          isActive
            ? "bg-white text-fuchsia-800"
            : "text-gray-100 active:text-fuchsia-800 hover:bg-fuchsia-700",
          "my-2 px-4 py-1 text-center active:bg-white rounded-lg transition-all"
        )}
      >
        <div className="text-2xl">{format(currentDate, "dd")}</div>
        <div>{format(currentDate, "E", { locale: es }).toUpperCase()}</div>
      </div>
    </Link>
  );
}
