"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";

import { Activity } from "#/app/activities/types";
import { Typography } from "#/components/ui/typography";

import { JumboHomeForm } from "./JumboHomeForm";

interface Props {
  activities: Activity[];
}
export function JumboHome({ activities }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const [activity, setActivity] = useState(activities[0]);
  const currentIndex = activities.findIndex((currentPlace) => currentPlace?.id === activity?.id);

  useEffect(() => {
    setTimeout(() => {
      setShowVideo(true);
    }, 3000);
  }, []);

  const handlePrevButton = () => {
    const newIndex = currentIndex - 1;
    const newPlace = activities[newIndex];
    const lastPlace = activities[activities.length - 1];

    if (currentIndex === 0) {
      setActivity(lastPlace);
      return;
    }

    setActivity(newPlace);
  };

  const handleNextButton = () => {
    const newIndex = currentIndex + 1;
    const newPlace = activities[newIndex];
    const initialPlace = activities[0];

    if (!newPlace || newIndex === activities.length) {
      setActivity(initialPlace);
      return;
    }

    setActivity(newPlace);
  };

  return (
    <div className={clsx("relative mb-8 h-[500px] overflow-hidden rounded-[40px] bg-black")}>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50" />
      <div className="relative z-20 mx-8 flex h-full w-full items-center">
        <div className="container mx-auto py-16">
          <div className="max-w-xl">
            <Typography variant="h1" component="h1" className="text-white">
              {activity.title}
            </Typography>
            <div className="mb-4 h-2 w-16 bg-white" />
            <p className="mb-8 text-lg leading-tight text-gray-200">{activity?.description}</p>
          </div>
          <JumboHomeForm />

          <div className="mt-8 flex space-x-2">
            <div
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/30 active:scale-95"
              onClick={handlePrevButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
            <div
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/30 active:scale-95"
              onClick={handleNextButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="z-0">
        <Image
          alt={activity.photos?.[0].alt || ""}
          src={activity.photos?.[0].path || ""}
          width={1000}
          height={500}
          className="absolute top-0 h-full w-full object-cover"
        />
      </div>
      {isBrowser && showVideo && activity.youtube_video_id && (
        <iframe
          className="absolute left-1/2 top-1/2 h-[180%] w-[150%] -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${activity.youtube_video_id}?&autoplay=1&mute=1&playlist=${activity.youtube_video_id}&loop=1`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
