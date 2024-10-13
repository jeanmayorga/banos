"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Entry } from "contentful";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftIcon, HeartIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { TypeActivitySkeleton } from "@/contentful";
import { useDotButton, usePrevNextButtons } from "@/hooks/useCarousel";
import { getImageUrl } from "@/lib/get-image-url";
import { cn } from "@/utils/cn";

import { useActivitySave } from "../hooks/useActivitySave";

interface Props {
  activity: Entry<TypeActivitySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  idx: number;
}
export function Card({ activity, idx }: Props) {
  const { isSaved, toggleSave } = useActivitySave(activity.sys.id);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const images = activity.fields.images;

  return (
    <div className="group" onMouseOver={() => setIsLoaded(true)}>
      <div className="relative">
        <div className="relative mb-3 overflow-hidden rounded-xl md:aspect-square" ref={emblaRef}>
          <div className="flex">
            {images.map((image) => (
              <Link
                href={`/activities/${activity.fields.slug}`}
                key={image?.sys.id}
                role="group"
                aria-roledescription="slide"
                className="relative mr-4 h-48 min-w-0 shrink-0 grow-0 basis-2/3 overflow-hidden rounded-xl lg:aspect-square lg:h-auto lg:basis-full"
              >
                <Image
                  src={getImageUrl(image) || ""}
                  width={300}
                  height={300}
                  quality={isLoaded ? 100 : 50}
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
            ))}
          </div>
        </div>

        <Button
          onClick={toggleSave}
          size="icon-sm"
          variant="secondary"
          className={cn(
            "absolute right-2 top-2 rounded-full",
            isSaved && "bg-rose-400 text-white hover:bg-rose-500 hover:text-white",
          )}
        >
          <HeartIcon className={cn("h-3 w-3", isSaved ? "fill-white" : "text-muted-foreground")} />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-0 transition-all disabled:hidden group-hover:opacity-100"
          disabled={prevBtnDisabled}
          onClick={onPrevButtonClick}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-0 transition-all disabled:hidden group-hover:opacity-100"
          disabled={nextBtnDisabled}
          onClick={onNextButtonClick}
        >
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-wrap items-center">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "gray-300 ml-1 flex h-1 w-1 items-center justify-center rounded-full bg-gray-300/50 transition-all",
                index === selectedIndex && "border-white bg-white",
              )}
            />
          ))}
        </div>
      </div>

      <Link href={`/activities/${activity.fields.slug}`} className="block">
        <Typography variant="large" className="truncate font-medium leading-tight">
          {activity.fields.title}
        </Typography>
      </Link>
      <div className="mb-2 flex items-center lg:mb-0">
        <MapPinIcon className="mr-1 h-4 w-4 flex-none text-muted-foreground" />
        <p className="truncate text-sm text-muted-foreground">
          {activity.fields.place?.fields.title}, Banos de agua santa
        </p>
      </div>
      {/* <Typography variant="muted">{activity.fields.place?.fields.title}</Typography> */}
      {/* <Typography variant="muted" className="font-semibold">
        ${activity.fields.price?.toFixed(2)} USD
      </Typography> */}
    </div>
  );
}
