"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/container";
import { Typography } from "@/components/ui/typography";

interface Props {
  youtubeVideo?: string;
}

export function BlockYoutubeVideo({ youtubeVideo }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement | null>(null);

  if (!youtubeVideo) return null;

  const videoId = youtubeVideo.split("v=")[1]?.split("&")[0];
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  const thumbnailSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleClick = () => {
    setIsVisible(true);
  };

  return (
    <Container className="mb-8">
      <Typography variant="h4" component="h2" className="mb-4">
        Video
      </Typography>
      <div
        ref={videoRef}
        className="group relative h-0 cursor-pointer overflow-hidden rounded-2xl pb-[56.25%]"
        onClick={handleClick}
      >
        {!isVisible ? (
          <>
            <img
              src={thumbnailSrc}
              alt="YouTube video thumbnail"
              className="absolute left-0 top-0 h-full w-full rounded-2xl transition-all group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-800/20">
              <Play className="h-16 w-16 transform text-white transition-transform group-hover:scale-110" />
            </div>
          </>
        ) : (
          <iframe
            className="absolute left-0 top-0 h-full w-full rounded-2xl"
            src={videoSrc}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Container>
  );
}
