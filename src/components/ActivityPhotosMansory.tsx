"use client";

import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { ActivityPhoto } from "#/app/activities/types";

interface Props {
  photos: ActivityPhoto[];
}
export function ActivityPhotosMansory({ photos }: Props) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="10px">
        {photos.map((photo) => (
          <Image
            key={photo.id}
            src={photo.path}
            alt={photo.alt}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
