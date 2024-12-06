"use client";

import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { getTikTokImage } from "../actions";

interface Props {
  tiktokVideoId: string;
}

export function BlockTikTokVideo({ tiktokVideoId }: Props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    getTikTokImage(tiktokVideoId).then((tikTokImage) => {
      setImage(tikTokImage);
    });
  }, [tiktokVideoId]);

  return (
    <>
      <div
        className="group relative mb-4 h-full w-full cursor-pointer overflow-hidden rounded-2xl md:mb-6"
        onClick={() => setOpen(true)}
      >
        <img
          src={image}
          alt="Tik tok video thumbnail"
          className="h-full w-full rounded-2xl opacity-0 transition-all group-hover:scale-105"
          onLoad={(event) => {
            const image = event.target as HTMLElement;
            setTimeout(() => {
              image.classList.remove("opacity-0");
            }, 60);
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-800/20">
          <div className="flex flex-col items-center">
            <Image
              src="/tik-tok-2.png"
              alt="tik tok"
              width="100"
              height="50"
              quality={30}
              className="mb-8 w-[90px] transition-all"
            />
            <PlayIcon className="-ml-2 h-16 w-16 transform text-white transition-all group-hover:scale-110" />
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!rounded-3xl !p-0 md:min-w-[400px]" closeOutside>
          {open && (
            <iframe
              className="aspect-[9/16] h-full w-full rounded-3xl"
              src={`https://www.tiktok.com/embed/v3/${tiktokVideoId}?autoplay=1&rel=0`}
              title="YouTube video"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
