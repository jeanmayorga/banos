import clsx from "clsx";
import { useRouter } from "next/router";
import { getCurrentDate } from "utils";
import { ItemCalendar } from "./Item";

const calendar = [
  "2022-11-30:UTC-5",
  "2022-12-01:UTC-5",
  "2022-12-02:UTC-5",
  "2022-12-03:UTC-5",
  "2022-12-04:UTC-5",
  "2022-12-05:UTC-5",
  "2022-12-06:UTC-5",
  "2022-12-07:UTC-5",
  "2022-12-08:UTC-5",
  "2022-12-09:UTC-5",
  "2022-12-10:UTC-5",
  "2022-12-11:UTC-5",
  "2022-12-12:UTC-5",
  "2022-12-13:UTC-5",
  "2022-12-14:UTC-5",
  "2022-12-15:UTC-5",
  "2022-12-16:UTC-5",
];

interface Props {
  withBorder?: boolean;
}
export function Calendar({ withBorder }: Props) {
  const { query } = useRouter();
  const dateInUrl = query.date as string;

  return (
    <div
      className={clsx(
        withBorder && "border-b border-[rgba(255,255,255,.15)]",
        "bg-fuchsia-900 w-full px-4 flex md:justify-center overflow-y-hidden whitespace-nowrap"
      )}
    >
      {calendar.map((dateWithUtc) => {
        const date = dateWithUtc.split(":")[0];
        const isActive = dateInUrl
          ? date === dateInUrl
          : date === getCurrentDate();

        return (
          <ItemCalendar
            date={dateWithUtc}
            isActive={isActive}
            key={dateWithUtc}
          />
        );
      })}
    </div>
  );
}
