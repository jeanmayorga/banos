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
  idx: number;
}
function CarouselImage({ photo, activity, isLoaded, idx }: CarouselImageProps) {
  return (
    <CarouselItem key={photo.id} className="aspect-video bg-muted md:aspect-square">
      <Link href={`/activities/${activity.slug}`}>
        <Image
          src={photo.path}
          width={270}
          height={270}
          quality={isLoaded ? 90 : 35}
          className="h-full w-full object-cover opacity-0 transition-opacity"
          onLoad={(event) => {
            const image = event.target as HTMLElement;
            setTimeout(() => {
              image.classList.remove("opacity-0");
            }, idx * 60);
          }}
          alt={activity.title}
          loading="lazy"
        />
      </Link>
    </CarouselItem>
  );
}

interface Props {
  activity: Activity;
  idx: number;
}
export function ActivityCard({ activity, idx }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const photos = activity.photos || [];

  return (
    <div className="group" onMouseOver={() => setIsLoaded(true)}>
      <Carousel className="aspect-video overflow-hidden rounded-xl md:aspect-square">
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselImage
              key={photo.id}
              idx={idx}
              photo={photo}
              activity={activity}
              isLoaded={isLoaded}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 opacity-0 transition-all group-hover:opacity-100" />
        <CarouselNext className="right-4 opacity-0 transition-all group-hover:opacity-100" />
        <CarouselDots count={activity.photos_count[0].count} />
      </Carousel>

      <Link href={`/activities/${activity.slug}`}>
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
