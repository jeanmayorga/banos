"use client";

import { PlayIcon } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  youtubeVideo?: string;
}

export function BlockYoutubeVideo({ youtubeVideo }: Props) {
  const [open, setOpen] = useState(false);

  if (!youtubeVideo) return null;

  const videoId = youtubeVideo.split("v=")[1]?.split("&")[0];
  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  const thumbnailSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      <div
        className="group relative mb-4 aspect-video cursor-pointer overflow-hidden rounded-2xl md:mb-6"
        onClick={() => setOpen(true)}
      >
        <img
          src={thumbnailSrc}
          alt="YouTube video thumbnail"
          className="absolute left-0 top-0 h-full w-full rounded-2xl transition-all group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-800/20">
          <PlayIcon className="h-16 w-16 transform text-white transition-transform group-hover:scale-110" />
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!rounded-3xl !p-0 md:min-w-[900px]" closeOutside>
          {open && (
            <iframe
              className="aspect-video h-full w-full rounded-3xl"
              src={iframeSrc}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
