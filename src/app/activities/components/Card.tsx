"use client";

import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  // CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import { TypeActivitySkeleton } from "@/contentful";
import { getImageUrl } from "@/lib/get-image-url";

interface Props {
  activity: Entry<TypeActivitySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  idx: number;
}
export function Card({ activity, idx }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const images = activity.fields.images;

  return (
    <div className="group" onMouseOver={() => setIsLoaded(true)}>
      <Carousel className="aspect-video overflow-hidden rounded-xl md:aspect-square">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image?.sys.id} className="aspect-video bg-muted md:aspect-square">
              <Link href={`/activities/${activity.fields.slug}`}>
                <Image
                  src={getImageUrl(image) || ""}
                  width={160}
                  height={160}
                  quality={isLoaded ? 90 : 35}
                  className="h-full w-full object-cover opacity-0 transition-opacity"
                  onLoad={(event) => {
                    const image = event.target as HTMLElement;
                    setTimeout(() => {
                      image.classList.remove("opacity-0");
                    }, idx * 60);
                  }}
                  alt={image?.fields.title || ""}
                  loading="lazy"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 opacity-0 transition-all group-hover:opacity-100" />
        <CarouselNext className="right-4 opacity-0 transition-all group-hover:opacity-100" />
        {/* <CarouselDots count={activity.fields.images.length} /> */}
      </Carousel>

      <Link href={`/activities/${activity.fields.slug}`}>
        <Typography variant="large" className="pt-2 font-medium">
          {activity.fields.title}
        </Typography>
        <Typography variant="muted">{activity.fields.place?.fields.title}</Typography>
        <Typography variant="muted" className="font-semibold">
          ${activity.fields.price?.toFixed(2)} USD
        </Typography>
      </Link>
    </div>
  );
}
