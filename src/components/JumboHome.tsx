"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Logo } from "./Logo";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "#/utils";
import moment from "moment";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";

function Form() {
  const [peopleCount, setPeopleCount] = useState(0);

  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [total, setTotal] = useState(0);

  return (
    <div className={cn("bg-white rounded-full py-2 w-auto max-w-2xl flex")}>
      <motion.div
        className={cn(
          "text-gray-400 flex flex-none items-center border-r transition-all"
        )}
      >
        <Popover onOpenChange={(e) => setIsDateOpen(e)}>
          <PopoverTrigger
            className={cn(
              "h-full w-full flex items-center justify-start",
              date ? "pl-6 pr-4" : "px-6"
            )}
          >
            <CalendarDaysIcon className="h-6 w-6 mr-2" />
            <div className={cn("text-left transition-all")}>
              {date ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {moment(date).format("DD-MM-YYYY")}
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Fecha
                </motion.span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {date && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setDate(undefined)}
            className="mr-4"
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        )}
      </motion.div>
      <div
        className={`flex items-center border-r-2 col-span-2 ${
          peopleCount > 0 ? "text-gray-900" : "text-gray-400"
        }`}
      >
        <Popover>
          <PopoverTrigger className="h-full w-full flex items-center justify-start pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>

            <div>{peopleCount} personas</div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[250px] py-4 flex flex-col items-center"
            align="start"
            sideOffset={16}
          >
            <div className={`font-semibold text-lg mb-4 `}>
              Número de personas
            </div>
            <div className="flex space-x-4 items-center">
              <div
                className="w-9 h-9 text-black/70 bg-black/10 rounded-full flex items-center justify-center hover:bg-black/30 transition-all cursor-pointer active:scale-95"
                onClick={() => setPeopleCount((count) => count - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </div>

              <div className="font-semibold text-2xl text-center text-gray-400 select-none">
                {peopleCount}
              </div>
              <div
                className="w-9 h-9 text-black/70 bg-black/10 rounded-full flex items-center justify-center hover:bg-black/30 transition-all cursor-pointer active:scale-95"
                onClick={() => setPeopleCount((count) => count + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {peopleCount > 0 && (
          <div
            className="w-6 h-6 text-black/70 bg-black/10 rounded-full flex items-center justify-center hover:bg-black/30 transition-all cursor-pointer active:scale-95 mr-2"
            onClick={() => setPeopleCount(0)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="col-span-2 pl-4 h-full w-full flex items-center justify-start text-gray-400">
        <span className="block">$ 60 USD</span>
      </div>
      <div className="col-span-2 flex items-center justify-end">
        <div>
          <a
            href="#"
            className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-fuchsia-800 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
          >
            <span className="relative text-base font-semibold text-white">
              Comprar entradas
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

const places = [
  {
    id: "1",
    slug: "la-casa-del-arbol",
    title: "La Casa del Arbol",
    description:
      "Una atracción única que ofrece vistas impresionantes del volcán Tungurahua y una emocionante oportunidad de balancearse en el Columpio del Fin del Mundo",
    image:
      "https://images.squarespace-cdn.com/content/v1/5d23b57617786c0001fcbeda/1571161059661-1TOZDKTU1IEP5E5XUBC7/Casa+del+Arbol+Atardecer+Banos+Ecuador.jpg?format=1000w",
  },
  {
    id: "2",
    slug: "el-pailon-del-diablo",
    title: "El Pailon de Diablo",
    description:
      "Una majestuosa cascada natural, escondida entre las verdes montañas de los Andes ecuatorianos.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5d23b57617786c0001fcbeda/1571158999045-KFSVWEW1M4TI030D4D5B/Cascada+Pailon+del+Diablo.jpg?format=2500w",
  },
];

interface Props {
  className?: string;
}
export function JumboHome({ className }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [place, setPlace] = useState(places[0]);
  const currentIndex = places.findIndex(
    (currentPlace) => currentPlace?.id === place?.id
  );

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowVideo(true);
  //   }, 4000);
  // }, []);

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
    <div className={clsx(className, "relative overflow-hidden select-none")}>
      <div className="bg-black/60 absolute top-0 left-0 w-full h-full z-10" />
      <div className="relative z-20 py-12 pl-[100px] flex justify-between flex-col h-screen">
        <Logo />
        <div>
          <div className="max-w-xl">
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-2">
              {place?.title}
            </h1>
            <div className="h-2 w-16 bg-white mb-4" />
            <p className="text-lg text-slate-300 mb-8">{place?.description}</p>
          </div>
          <Form />
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`z-0 transition-all duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={place?.image}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[120%] h-full"
          onLoad={() => setLoaded(true)}
        />
      </div>
      {/* <div
        className={`z-0 transition-all duration-200 ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
      >
        <iframe
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[140%] h-full"
          src="https://www.youtube.com/embed/vZYhHC93GoQ?start=65&end=117&autoplay=1&mute=1&playlist=vZYhHC93GoQ&loop=1"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div> */}
    </div>
  );
}
