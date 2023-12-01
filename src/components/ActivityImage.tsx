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
    if (cover) {
      mediumZoom(cover);
    }
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-8">
      <Image src={src} alt="Header" id="cover" fill style={{ objectFit: "cover" }} />
    </div>
  );
}
