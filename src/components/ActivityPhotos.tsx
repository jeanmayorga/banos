"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { ActivityPhoto } from "#/app/activities/types";

import { Button } from "./ui/button";

interface Props {
  photos: ActivityPhoto[];
}
export function ActivityPhotos({ photos }: Props) {
  const [index, setIndex] = useState(-1);

  return (
    <div className="w-full">
      <div className="container relative mx-auto max-w-6xl">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-xl md:grid-cols-4 lg:h-[336px]">
          <div className="col-span-2 row-span-2 bg-gray-800 transition-all hover:scale-[.98]">
            {photos?.[0]?.path && (
              <Image
                onClick={() => setIndex(0)}
                src={photos?.[0].path}
                width={500}
                height={300}
                alt={photos[0].alt}
                className="h-full w-full cursor-pointer object-cover"
              />
            )}
          </div>
          <div className="hidden bg-gray-800 transition-all hover:scale-[.98] md:block">
            {photos?.[1]?.path && (
              <Image
                onClick={() => setIndex(1)}
                src={photos[1].path}
                width={600}
                height={300}
                alt={photos[1].alt}
                className="h-full w-full cursor-pointer object-cover"
              />
            )}
          </div>
          <div className="hidden bg-gray-800 transition-all hover:scale-[.98] md:block">
            {photos?.[2]?.path && (
              <Image
                onClick={() => setIndex(2)}
                src={photos[2].path}
                width={600}
                height={300}
                alt={photos[2].alt}
                className="h-full w-full cursor-pointer object-cover"
              />
            )}
          </div>
          <div className="hidden bg-gray-800 transition-all hover:scale-[.98] md:block">
            {photos?.[3]?.path && (
              <Image
                onClick={() => setIndex(3)}
                src={photos[3].path}
                width={600}
                height={300}
                alt={photos[3].alt}
                className="h-full w-full cursor-pointer object-cover"
              />
            )}
          </div>
          <div className="hidden bg-gray-800 transition-all hover:scale-[.98] md:block">
            {photos?.[4]?.path && (
              <Image
                onClick={() => setIndex(4)}
                src={photos[4].path}
                width={600}
                height={300}
                alt={photos[4].alt}
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
          slides={photos.map((photo) => ({
            src: `https://res.cloudinary.com/da3uyv9xp/image/upload/${photo.path}`,
            alt: photo.alt,
          }))}
        />
      </div>
    </div>
  );
}
