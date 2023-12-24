"use client";

import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: { cloudName: "da3uyv9xp" },
});

interface Props {
  path: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
}
export function Photo({ path, alt, width, height, quality, className }: Props) {
  const image = cld.image(path);

  if (width && height) image.resize(fill().width(width).height(height));

  if (quality) image.quality(quality);

  return (
    <AdvancedImage
      alt={alt}
      width={width}
      height={height}
      className={className}
      cldImg={image}
      plugins={[lazyload(), placeholder({ mode: "predominant-color" })]}
    />
  );
}
