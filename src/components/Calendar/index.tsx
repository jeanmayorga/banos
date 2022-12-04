import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { getCurrentDate } from "utils";
import { ItemCalendar } from "./Item";

const calendar = [
  "2022-11-30",
  "2022-12-01",
  "2022-12-02",
  "2022-12-03",
  "2022-12-04",
  "2022-12-05",
  "2022-12-06",
  "2022-12-07",
  "2022-12-08",
  "2022-12-09",
  "2022-12-10",
  "2022-12-11",
  "2022-12-12",
  "2022-12-13",
  "2022-12-14",
  "2022-12-15",
  "2022-12-16",
];

interface Props {
  withBorder?: boolean;
}
export function Calendar({ withBorder }: Props) {
  const { query } = useRouter();
  const dateInUrl = query.date as string;

  useEffect(() => {
    const calendar = document.getElementById("calendar-parent");
    const linkActive = document.getElementById("link-active");
    const linkOffset = Number(linkActive?.offsetLeft);
    const linkWidth = Number(linkActive?.offsetWidth) / 2;
    const windowWidth = Number(window.innerWidth) / 2;

    calendar?.scrollTo({
      left: linkOffset - windowWidth + linkWidth,
      behavior: "smooth",
    });
  });

  return (
    <div
      id="calendar-parent"
      className={clsx(
        withBorder && "border-b border-[rgba(255,255,255,.15)]",
        "bg-fuchsia-900 w-full px-4 flex md:justify-center overflow-y-hidden whitespace-nowrap"
      )}
    >
      {calendar.map((date) => {
        const isActive = dateInUrl
          ? date === dateInUrl
          : date === getCurrentDate();

        return <ItemCalendar date={date} isActive={isActive} key={date} />;
      })}
    </div>
  );
}
