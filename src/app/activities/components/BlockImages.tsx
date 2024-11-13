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

  const [index, setIndex] = useState(-1);

  return (
    <section className="relative mb-8 w-full overflow-hidden">
      <div className="mb-4 overflow-hidden pl-4 lg:pl-[calc((100vw-70rem)/2)]" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div
              key={image?.sys.id}
              role="group"
              aria-roledescription="slide"
              className="lg:basis-3/3 relative mr-4 h-48 min-w-0 shrink-0 grow-0 basis-2/3 overflow-hidden rounded-xl bg-black md:basis-2/5 lg:h-96"
            >
              <Image
                onClick={() => setIndex(1)}
                src={getImageUrl(image) || ""}
                width={400}
                height={200}
                quality={80}
                alt={image?.fields.title || ""}
                className="h-full w-full cursor-pointer object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Container>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              disabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              disabled={nextBtnDisabled}
              onClick={onNextButtonClick}
            >
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
          <div className="flex flex-wrap items-center">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  "ml-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray-300 transition-all",
                  "dark:border-gray-500",
                  index === selectedIndex && "border-gray-400 dark:border-white",
                )}
              />
            ))}
          </div>
        </div>
      </Container>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((image) => ({
          src: image?.fields.file?.url || "",
          alt: image?.fields.title || "",
        }))}
      />
    </section>
  );
}
