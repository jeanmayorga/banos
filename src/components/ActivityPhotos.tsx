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
    <div className="w-full mb-8">
      <div className="container max-w-6xl mx-auto relative">
        <div className="lg:h-[336px] grid grid-rows-2 md:grid-cols-4 grid-cols-2 gap-2 rounded-xl overflow-hidden">
          <div className="row-span-2 col-span-2 bg-slate-200">
            {photos?.[0]?.path && (
              <Image
                onClick={() => setIndex(0)}
                src={photos?.[0].path}
                width={500}
                height={300}
                alt={photos[0].alt}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}
          </div>
          <div className="bg-slate-200 hidden md:block">
            {photos?.[1]?.path && (
              <Image
                onClick={() => setIndex(1)}
                src={photos[1].path}
                width={600}
                height={300}
                alt={photos[1].alt}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}
          </div>
          <div className="bg-slate-200 hidden md:block">
            {photos?.[2]?.path && (
              <Image
                onClick={() => setIndex(2)}
                src={photos[2].path}
                width={600}
                height={300}
                alt={photos[2].alt}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}
          </div>
          <div className="bg-slate-200 hidden md:block">
            {photos?.[3]?.path && (
              <Image
                onClick={() => setIndex(3)}
                src={photos[3].path}
                width={600}
                height={300}
                alt={photos[3].alt}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}
          </div>
          <div className="bg-slate-200 hidden md:block">
            {photos?.[4]?.path && (
              <Image
                onClick={() => setIndex(4)}
                src={photos[4].path}
                width={600}
                height={300}
                alt={photos[4].alt}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="absolute right-10 bottom-2 rounded-full"
          onClick={() => setIndex(0)}
        >
          <ImageIcon className="w-4 h-4 mr-1" /> Mostrar todas las fotos
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
