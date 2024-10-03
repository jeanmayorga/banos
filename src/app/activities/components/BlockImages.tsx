"use client";

import { Asset } from "contentful";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getImageUrl } from "@/lib/get-image-url";
import "yet-another-react-lightbox/styles.css";
interface Props {
  title: string;
  images: (Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> | undefined)[];
}
export function BlockImages({ title, images }: Props) {
  const [index, setIndex] = useState(-1);

  const image1 = getImageUrl(images[0]);

  return (
    <section className="relative mb-8 w-full overflow-hidden bg-gray-800 py-12">
      {image1 && (
        <Image
          src={image1}
          alt="cover blur"
          height={190}
          width={250}
          quality={40}
          className="absolute left-0 top-0 h-full w-full scale-150 blur-xl transition-all"
        />
      )}
      <Container className="relative">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Image
                  onClick={() => setIndex(1)}
                  src={getImageUrl(image) || ""}
                  width={600}
                  height={300}
                  alt={title}
                  className="h-full w-full cursor-pointer rounded-2xl object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((image) => ({
          src: image?.fields.file?.url || "",
          alt: title,
        }))}
      />
      {/* </Container> */}
    </section>
  );
}
