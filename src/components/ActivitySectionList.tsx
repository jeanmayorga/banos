"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect } from "react";

import { Activity } from "#/app/activities/types";

import { ActivityCard } from "./ActivityCard";
import { Button } from "./ui/button";

interface Props {
  activities: Activity[];
}
export function ActivitiesSectionList({ activities }: Props) {
  useEffect(() => {
    const container = document.getElementById("activity-list");
    const scrollLeft = document.getElementById("activity-scroll-left");
    const scrollRight = document.getElementById("activity-scroll-right");
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
        id="activity-list"
      >
        {activities.map((activity, idx) => (
          <ActivityCard idx={idx} activity={activity} key={activity.id} />
        ))}
      </div>
      <div className="mx-4 flex justify-end space-x-2">
        <Button variant="outline" size="icon" id="activity-scroll-left">
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" id="activity-scroll-right">
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
