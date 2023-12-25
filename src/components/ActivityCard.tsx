"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { getActivityPhotos } from "#/app/activities/services";
import { Activity, ActivityPhoto } from "#/app/activities/types";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Typography } from "./ui/typography";

interface Props {
  activity: Activity;
}
export function ActivityCard({ activity }: Props) {
  const [photos, setPhotos] = useState<ActivityPhoto[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleLoadPhotos = async () => {
    if (isLoaded) return;

    const activityPhotos = await getActivityPhotos({ activityId: activity.id });
    activityPhotos.shift();
    setPhotos(activityPhotos);
    setIsLoaded(true);
  };

  return (
    <div className="group" onMouseOver={handleLoadPhotos}>
      <Carousel className="rounded-xl overflow-hidden aspect-square">
        <CarouselContent>
          <CarouselItem className="aspect-square">
            <Link href={`/activities/${activity.slug}`} passHref>
              <Image
                src={activity.photos?.[0]?.path || ""}
                width={isLoaded ? 480 : 280}
                height={isLoaded ? 480 : 280}
                quality={isLoaded ? 100 : 95}
                className="object-cover h-full w-full"
                alt={activity.title}
              />
            </Link>
          </CarouselItem>
          {photos.map((photo) => (
            <CarouselItem key={photo.id} className="aspect-square">
              <Link href={`/activities/${activity.slug}`} passHref>
                <Image
                  src={photo.path}
                  width={480}
                  height={480}
                  alt={activity.title}
                  className="object-cover h-full w-full"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 group-hover:opacity-100 opacity-0 transition-all" />
        <CarouselNext className="right-4 group-hover:opacity-100 opacity-0 transition-all" />
        <CarouselDots count={activity.photos_count[0].count} />
      </Carousel>

      <Link href={`/activities/${activity.slug}`} passHref>
        <Typography variant="p" className="pt-2 font-medium">
          {activity.title}
        </Typography>
        <Typography variant="muted">{activity.place?.name}</Typography>
        <Typography variant="muted" className="font-semibold">
          ${activity.price?.toFixed(2)} USD
        </Typography>
      </Link>
    </div>
  );
}
