"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { cn, getCurrentDate } from "#/utils";

import { EventsNavCalendarItem } from "./EventsNavCalendarItem";

const calendar = [
  "2023-12-01",
  "2023-12-02",
  "2023-12-03",
  "2023-12-04",
  "2023-12-05",
  "2023-12-06",
  "2023-12-07",
  "2023-12-08",
  "2023-12-09",
  "2023-12-10",
  "2023-12-11",
  "2023-12-12",
  "2023-12-13",
  "2023-12-14",
  "2023-12-15",
  "2023-12-16",
];

export function EventsNavCalendarList() {
  const params = useParams<{ date: string }>();
  const dateInUrl = params.date;

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
      // className={cn(
      // "flex w-full overflow-y-hidden whitespace-nowrap bg-fuchsia-900 px-4 scrollbar-hide md:justify-center",
      // )}
    >
      {calendar.map((date) => {
        const isActive = dateInUrl ? date === dateInUrl : date === getCurrentDate();

        return <EventsNavCalendarItem date={date} isActive={isActive} key={date} />;
      })}
    </div>
  );
}
