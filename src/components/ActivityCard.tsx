"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

interface CarouselImageProps {
  photo: ActivityPhoto;
  activity: Activity;
  isLoaded: boolean;
}
function CarouselImage({ photo, activity, isLoaded }: CarouselImageProps) {
  return (
    <CarouselItem key={photo.id} className="md:aspect-square aspect-video">
      <Link href={`/activities/${activity.slug}`} passHref>
        <Image
          src={photo.path}
          width={270}
          height={270}
          quality={isLoaded ? 90 : 15}
          className="object-cover h-full w-full"
          alt={activity.title}
        />
      </Link>
    </CarouselItem>
  );
}

interface Props {
  activity: Activity;
}
export function ActivityCard({ activity }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const photos = activity.photos || [];

  return (
    <div className="group" onMouseOver={() => setIsLoaded(true)}>
      <Carousel className="rounded-xl overflow-hidden md:aspect-square aspect-video">
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselImage key={photo.id} photo={photo} activity={activity} isLoaded={isLoaded} />
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
