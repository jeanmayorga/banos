"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Asset } from "contentful";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { useDotButton, usePrevNextButtons } from "@/hooks/useCarousel";
import { getImageUrl } from "@/lib/get-image-url";
import { cn } from "@/utils/cn";

import "yet-another-react-lightbox/styles.css";

interface Props {
  images: (Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> | undefined)[];
}
export function BlockImages({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  // const [index, setIndex] = useState(-1);

  return (
    <section className="relative mb-8 mt-8 w-full overflow-hidden md:sticky md:top-32 md:mt-0">
      <Button
        size="icon"
        variant="outline"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full"
        disabled={prevBtnDisabled}
        onClick={onPrevButtonClick}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full"
        disabled={nextBtnDisabled}
        onClick={onNextButtonClick}
      >
        <ArrowRightIcon className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="mb-4 overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div
              key={image?.sys.id}
              role="group"
              aria-roledescription="slide"
              className="relative mr-4 h-[400px] min-w-0 shrink-0 grow-0 basis-3/4 overflow-hidden rounded-3xl bg-black lg:h-[650px]"
            >
              <Image
                // onClick={() => setIndex(1)}
                src={getImageUrl(image) || ""}
                width={400}
                height={200}
                quality={80}
                alt={image?.fields.title || ""}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-1">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              "h-3 rounded-full transition-all duration-300",
              "hover:bg-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              index === selectedIndex ? "w-6 bg-gray-700" : "w-3 bg-gray-300",
            )}
          />
        ))}
      </div>

      {/* <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((image) => ({
          src: image?.fields.file?.url || "",
          alt: image?.fields.title || "",
        }))}
      /> */}
    </section>
  );
}
