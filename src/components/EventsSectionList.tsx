"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { Event } from "#/modules";

import { EventsSectionItem } from "./EventsSectionItem";
import { Button } from "./ui/button";

interface Props {
  events: Event[];
}
export function EventsSectionList({ events }: Props) {
  useEffect(() => {
    const container = document.getElementById("events-list");
    const scrollLeft = document.getElementById("scrollLeft");
    const scrollRight = document.getElementById("scrollRight");
    const scrollAmount = 296;

    if (container) {
      if (scrollLeft) {
        scrollLeft.addEventListener("click", function () {
          container.scrollLeft -= scrollAmount;
        });
      }
      if (scrollRight) {
        scrollRight.addEventListener("click", function () {
          container.scrollLeft += scrollAmount;
        });
      }
    }
  }, []);

  return (
    <>
      <div
        // className="mb-4 flex w-full space-x-4 overflow-y-hidden scroll-smooth whitespace-nowrap px-4 scrollbar-hide"
        id="events-list"
      >
        {events.map((event) => (
          <EventsSectionItem event={event} key={event.id} />
        ))}
      </div>
      <div className="mx-4 flex justify-end space-x-2">
        <Button variant="outline" size="icon" id="scrollLeft">
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" id="scrollRight">
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
