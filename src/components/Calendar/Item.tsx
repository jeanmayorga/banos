import Link from "next/link";
import { es } from "date-fns/locale";
import { add, format } from "date-fns";
import clsx from "clsx";

interface Props {
  date: string;
  isActive: boolean;
}
export function ItemCalendar({ date, isActive }: Props) {
  const currentDate = add(new Date(date), {
    hours: 5,
  });

  return (
    <Link href={`/events/${date}`} passHref>
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
