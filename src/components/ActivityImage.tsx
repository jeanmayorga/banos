"use client";

import mediumZoom from "medium-zoom";
import Image from "next/image";
import { useEffect } from "react";

interface Props {
  src: string;
}
export function ActivityImage({ src }: Props) {
  useEffect(() => {
    const cover = document.querySelector("#cover") as HTMLElement;
    const coverContainer = document.querySelector("#coverContainer") as HTMLElement;

    if (cover) {
      const mediumCover = mediumZoom(cover);

      mediumCover.on("open", () => {
        coverContainer.classList.remove("h-[250px]");
        coverContainer.classList.remove("sm:h-[400px]");
        coverContainer.classList.add("h-[600px]");
      });
      mediumCover.on("close", () => {
        coverContainer.classList.remove("h-[600px]");
        coverContainer.classList.add("h-[250px]");
        coverContainer.classList.add("sm:h-[400px]");
      });
    }
  }, []);

  return (
    <div
      className="relative w-full h-[250px] sm:h-[400px] rounded-3xl overflow-hidden mb-8"
      id="coverContainer"
    >
      <Image src={src} alt="Header" id="cover" fill className="object-cover" quality={50} />
    </div>
  );
}
