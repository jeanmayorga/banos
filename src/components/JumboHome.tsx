"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";

import { Typography } from "#/components/ui/typography";

import { JumboHomeForm } from "./JumboHomeForm";
import { Logo } from "./Logo";

const places = [
  {
    id: "1",
    slug: "la-casa-del-arbol",
    title: "La Casa del Arbol",
    description:
      "Una atracción única que ofrece vistas impresionantes del volcán Tungurahua y una emocionante oportunidad de balancearse en el Columpio del Fin del Mundo",
    image:
      "https://images.myguide-cdn.com/ecuador/companies/from-quito-waterfalls-of-banos-de-agua-santa-guided-tour/large/from-quito-waterfalls-of-banos-de-agua-santa-guided-tour-965611.jpg",
  },
  {
    id: "2",
    slug: "el-pailon-del-diablo",
    title: "El Pailon de Diablo",
    description:
      "Una majestuosa cascada natural, escondida entre las verdes montañas de los Andes ecuatorianos.",
    image: "https://samarispa.com/wp-content/uploads/2021/04/video.jpg",
  },
];

interface Props {
  className?: string;
}
export function JumboHome({ className }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [place, setPlace] = useState(places[0]);
  const currentIndex = places.findIndex((currentPlace) => currentPlace?.id === place?.id);

  useEffect(() => {
    setTimeout(() => {
      setShowVideo(true);
    }, 5000);
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     const currentIndex = places.findIndex(
  //       (currentPlace) => currentPlace.id === place.id
  //     );
  //     const totalIndexes = places.length;
  //     const newIndex = currentIndex + 1;
  //     setPlace(places[newIndex]);

  //     console.log({
  //       newIndex,
  //     });
  // console.log({
  //   currentIndex,
  //   totalIndexes,
  //   newIndex,
  //   set: newIndex === totalIndexes ? places[0] : places[newIndex],
  // });

  // setPlace(newIndex === totalIndexes ? places[0] : places[newIndex]);
  //   }, 4000);
  // }, [place]);

  const handlePrevButton = () => {
    const newIndex = currentIndex - 1;
    const newPlace = places[newIndex];
    const lastPlace = places[places.length - 1];

    setLoaded(false);

    if (currentIndex === 0) {
      setPlace(lastPlace);
      return;
    }

    setPlace(newPlace);
  };

  const handleNextButton = () => {
    const newIndex = currentIndex + 1;
    const newPlace = places[newIndex];
    const initialPlace = places[0];

    setLoaded(false);

    if (!newPlace || newIndex === places.length) {
      setPlace(initialPlace);
      return;
    }

    setPlace(newPlace);
  };

  return (
    <div className={clsx(className, "relative overflow-hidden bg-black")}>
      <div className="bg-black/50 absolute top-0 left-0 w-full h-full z-10" />
      <div className="relative z-20 py-12 lg:pl-[100px] px-4 flex justify-between flex-col h-screen">
        <Logo />
        <div>
          <div className="max-w-xl">
            <Typography variant="h1" component="h1" className="text-white">
              {place?.title}
            </Typography>
            <div className="h-2 w-16 bg-white mb-4" />
            <p className="text-lg text-gray-200 mb-8 leading-tight">{place?.description}</p>
          </div>
          <JumboHomeForm />
        </div>
        <div className="flex space-x-2">
          <div
            className="w-9 h-9 text-white/70 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer active:scale-95"
            onClick={handlePrevButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div
            className="w-9 h-9 text-white/70 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer active:scale-95"
            onClick={handleNextButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className={`z-0 transition-all duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <img
          src={place?.image}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[120%] h-full"
          onLoad={() => setLoaded(true)}
        />
      </div>
      {isBrowser && showVideo && (
        <div
        // className={`z-0 transition-all duration-200 ${
        //   showVideo ? "opacity-100" : "opacity-0"
        // }`}
        >
          <iframe
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[160%] h-full"
            src="https://www.youtube.com/embed/vZYhHC93GoQ?start=65&end=117&autoplay=1&mute=1&playlist=vZYhHC93GoQ&loop=1"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
