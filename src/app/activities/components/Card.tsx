"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Entry } from "contentful";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeftIcon,
  CircleDollarSignIcon,
  Clock3Icon,
  DollarSignIcon,
  HeartIcon,
  MapPinIcon,
} from "lucide-react";
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
  const { selectedIndex, scrollSnaps } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const images = activity.fields.images;

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md dark:border-gray-800 dark:bg-black dark:shadow-black"
      onMouseOver={() => setIsLoaded(true)}
    >
      <div className="relative w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <Link
              href={`/activities/${activity.fields.slug}`}
              key={image?.sys.id}
              role="group"
              aria-roledescription="slide"
              className="relative h-[280px] w-full shrink-0 grow-0 lg:h-[200px]"
            >
              <Image
                src={getImageUrl(image) || ""}
                width={300}
                height={200}
                quality={isLoaded ? 100 : 50}
                className="h-full w-full rounded-2xl object-cover opacity-0 transition-opacity"
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

        <div className="absolute bottom-1 right-1 rounded-full bg-gray-900/80 px-3 py-1 text-[10px] font-light text-gray-200">
          {selectedIndex + 1} / {scrollSnaps.length}
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
              className={cn(
                "gray-300 ml-1 flex h-1 w-1 items-center justify-center rounded-full bg-white/60 transition-all",
                index === selectedIndex && "border-white bg-white",
              )}
            />
          ))}
        </div>
      </div>

      <Link
        href={`/activities/${activity.fields.slug}`}
        className="flex flex-grow flex-col justify-between p-4"
      >
        <span className="mb-4">
          <Typography variant="large" className="font-medium leading-tight">
            {activity.fields.title}
          </Typography>
          <p className="truncate text-sm text-muted-foreground">
            {activity.fields.place?.fields.title}
          </p>
        </span>

        <span className="border-t border-dashed border-t-gray-200 pt-4 dark:border-t-gray-800">
          {activity.fields.openAt && activity.fields.closeAt && (
            <Typography
              variant="muted"
              className="mb-1 flex items-center truncate font-normal leading-tight"
            >
              <Clock3Icon className="mr-1 h-4 w-4 text-gray-400" />
              {activity.fields.openAt} hasta {activity.fields.closeAt}
            </Typography>
          )}

          {activity.fields.adultPrice && (
            <Typography
              variant="muted"
              className="flex items-center truncate font-normal leading-tight"
            >
              <CircleDollarSignIcon className="h-4 w-4 text-gray-400" />
              <span className="mx-1 font-semibold">
                {activity.fields.adultPrice?.toFixed(2)} USD
              </span>
              <span>por persona</span>
            </Typography>
          )}
        </span>
      </Link>
    </div>
  );
}
