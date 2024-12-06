"use client";

import { Asset } from "contentful";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useDotButton, usePrevNextButtons } from "@/hooks/useCarousel";
import { getImageUrl } from "@/lib/get-image-url";
import { cn } from "@/utils/cn";

import { BlockTikTokVideo } from "./BlockTikTokVideo";

interface Props {
  images: (Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> | undefined)[];
  tiktokVideoId?: string;
}
export function BlockImages({ images, tiktokVideoId }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="relative mb-8 w-full overflow-hidden md:sticky md:top-32 md:mb-0">
      <Button
        size="icon"
        variant="secondary"
        className={cn(
          "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full transition-all",
          prevBtnDisabled ? "invisible" : "visible",
        )}
        disabled={prevBtnDisabled}
        onClick={onPrevButtonClick}
      >
        <ArrowLeftIcon className="h-4 w-4" strokeWidth={3} />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className={cn(
          "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full transition-all",
          nextBtnDisabled ? "invisible" : "visible",
        )}
        disabled={nextBtnDisabled}
        onClick={onNextButtonClick}
      >
        <ArrowRightIcon className="h-4 w-4" strokeWidth={3} />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="mb-4 overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex">
          {tiktokVideoId && (
            <div
              key={0}
              role="group"
              aria-roledescription="slide"
              className="relative mr-4 aspect-[9/16] min-w-0 shrink-0 grow-0 basis-3/4 overflow-hidden rounded-3xl bg-black"
            >
              <BlockTikTokVideo tiktokVideoId={tiktokVideoId} />
              {/* <iframe
                width="100%"
                height="100%"
                src={`https://www.tiktok.com/embed/v3/${tiktokVideoId}`}
                className="h-full"
              /> */}
            </div>
          )}
          {images.map((image, index) => {
            const currentIdx = tiktokVideoId ? index + 1 : index;
            return (
              <div
                key={image?.sys.id}
                role="group"
                aria-roledescription="slide"
                className="relative mr-4 aspect-[9/16] min-w-0 shrink-0 grow-0 basis-3/4 overflow-hidden rounded-3xl bg-black"
              >
                <div
                  className={cn(
                    "absolute left-0 top-0 h-full w-full bg-gray-600/50 transition-all",
                    currentIdx === selectedIndex && "bg-transparent",
                  )}
                />
                <Image
                  src={getImageUrl(image) || ""}
                  width={400}
                  height={200}
                  quality={80}
                  alt={image?.fields.title || ""}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-1">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              "hover:bg-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              index === selectedIndex ? "w-6 bg-gray-400" : "w-2 bg-gray-300",
            )}
          />
        ))}
      </div>
    </section>
  );
}
