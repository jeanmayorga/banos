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
    <CarouselItem key={photo.id} className="md:aspect-square aspect-video bg-muted">
      <Link href={`/activities/${activity.slug}`} passHref>
        <Image
          src={photo.path}
          width={270}
          height={270}
          quality={isLoaded ? 90 : 35}
          className="object-cover h-full w-full transition-opacity opacity-0"
          onLoad={(event) => {
            const image = event.target as HTMLElement;
            setTimeout(() => {
              image.classList.remove("opacity-0");
            }, idx * 30);
          }}
          alt={activity.title}
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
      <Carousel className="rounded-xl overflow-hidden md:aspect-square aspect-video">
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
