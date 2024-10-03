"use client";

import { Asset } from "contentful";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/get-image-url";
import "yet-another-react-lightbox/styles.css";

interface Props {
  title: string;
  images: (Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> | undefined)[];
}
export function ImagesBlock({ title, images }: Props) {
  const [index, setIndex] = useState(-1);

  const image1 = getImageUrl(images[0]);
  const image2 = getImageUrl(images[1]);
  const image3 = getImageUrl(images[2]);
  const image4 = getImageUrl(images[3]);
  const image5 = getImageUrl(images[4]);

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
        <div className="w-full">
          <div className="container relative mx-auto max-w-6xl">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-xl md:grid-cols-4 lg:h-[336px]">
              <div className="col-span-2 row-span-2 bg-gray-800 transition-all hover:scale-[.98]">
                {image1 && (
                  <Image
                    onClick={() => setIndex(0)}
                    src={image1}
                    width={500}
                    height={300}
                    alt={title}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                )}
              </div>
              <div className="hidden bg-gray-800 transition-all hover:scale-[.98] md:block">
                {image2 && (
                  <Image
                    onClick={() => setIndex(1)}
                    src={image2}
                    width={600}
                    height={300}
                    alt={title}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                )}
              </div>
              <div className="hidden bg-gray-800 transition-all hover:scale-[.98] md:block">
                {image3 && (
                  <Image
                    onClick={() => setIndex(2)}
                    src={image3}
                    width={600}
                    height={300}
                    alt={title}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                )}
              </div>
              <div className="hidden bg-gray-800 transition-all hover:scale-[.98] md:block">
                {image4 && (
                  <Image
                    onClick={() => setIndex(3)}
                    src={image4}
                    width={600}
                    height={300}
                    alt={title}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                )}
              </div>
              <div className="hidden bg-gray-800 transition-all hover:scale-[.98] md:block">
                {image5 && (
                  <Image
                    onClick={() => setIndex(4)}
                    src={image5}
                    width={600}
                    height={300}
                    alt={title}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="absolute bottom-2 right-2 rounded-full"
              onClick={() => setIndex(0)}
            >
              <ImageIcon className="mr-1 h-4 w-4" /> Mostrar todas las fotos
            </Button>

            <Lightbox
              index={index}
              open={index >= 0}
              close={() => setIndex(-1)}
              slides={images.map((image) => ({
                src: image?.fields.file?.url || "",
                alt: title,
              }))}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
