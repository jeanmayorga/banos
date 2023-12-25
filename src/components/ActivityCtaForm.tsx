"use client";

import { CalendarDaysIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { MinusIcon, PlusIcon, SendIcon } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

import { Activity } from "#/app/activities/types";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";
import { getWhatsappUrl } from "#/utils/get-whatsapp-url";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { Typography } from "./ui/typography";

interface Props {
  price: number;
}
export function ActivityCtaForm({ price }: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [isPeopleCountOpen, setIsPeopleCountOpen] = useState(false);

  const [total, setTotal] = useState(price);

  useEffect(() => setTotal(peopleCount * price), [peopleCount, price]);

  const onSelectCalendar = (date: Date | undefined) => {
    setDate(date);
    setIsDateOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 shadow border dark:border-slate-700 rounded-lg w-full py-6 sticky top-[90px]">
      <div className="px-4 mb-4">
        <Typography variant="h3" className="flex items-center">
          $ {price.toFixed(2)}{" "}
          <Typography variant="muted" component="span" className="ml-1">
            USD
          </Typography>
        </Typography>
        <Typography variant="lead">por persona</Typography>
      </div>

      <div className="mx-4 flex flex-none items-center overflow-hidden border dark:border-slate-600 dark:hover:bg-slate-700 rounded-full mb-4">
        <Popover onOpenChange={(e) => setIsDateOpen(e)} open={isDateOpen}>
          <PopoverTrigger className="h-full w-full flex items-center justify-start py-3 px-4 text-gray-400">
            <CalendarDaysIcon className="h-6 w-6 mr-2" />
            <motion.div
              className="text-left mr-4"
              animate={{ width: isDateOpen || date ? "100px" : "auto" }}
            >
              {date ? moment(date).format("DD-MM-YYYY") : "Fecha"}
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(e) => onSelectCalendar(e)}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <AnimatePresence>
          {(isDateOpen || date) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center mr-2 relative"
            >
              <Button variant="ghost" size="icon-sm" onClick={() => setDate(undefined)}>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-4 flex flex-none items-center overflow-hidden border dark:border-slate-600 dark:hover:bg-slate-700 rounded-full mb-4">
        <Popover onOpenChange={(e) => setIsPeopleCountOpen(e)} open={isPeopleCountOpen}>
          <PopoverTrigger className="h-full w-full flex items-center justify-start py-3 px-4 text-gray-400">
            <UserGroupIcon className="h-6 w-6 mr-2" />
            <motion.div
              className="text-left"
              animate={{
                width: isPeopleCountOpen || peopleCount ? "120px" : "auto",
              }}
            >
              {peopleCount === 0 && "Personas"}
              {peopleCount === 1 && `${peopleCount} persona`}
              {peopleCount > 1 && `${peopleCount} personas`}
            </motion.div>
          </PopoverTrigger>
          <PopoverContent
            className="w-full py-4 px-8 flex flex-col items-center select-none"
            align="start"
          >
            <Typography variant="lead">Número de personas</Typography>
            <div className="flex space-x-8 items-center my-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPeopleCount((count) => (count === 0 ? 0 : count - 1))}
              >
                <MinusIcon />
              </Button>
              <Typography variant="lead">{peopleCount}</Typography>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPeopleCount((count) => count + 1)}
              >
                <PlusIcon />
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <AnimatePresence>
          {(isPeopleCountOpen || peopleCount) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center mr-2 relative"
            >
              <Button variant="ghost" size="icon-sm" onClick={() => setPeopleCount(0)}>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-4 mb-4">
        <a
          href={getWhatsappUrl({
            text: `Quiero reservar para ${peopleCount || 0} para la fecha ${date}`,
          })}
          target="_blank"
          rel="noreferrer"
        >
          <Button className="rounded-full w-full bg-fuchsia-800">
            <SendIcon className="w-4 h-4 mr-2" />
            Reserva ahora
          </Button>
        </a>
      </div>

      <Separator />

      <div className="mx-4 flex items-center justify-between pt-6">
        <div className="flex items-center">
          <Typography variant="lead" className="font-normal">
            Total
          </Typography>
        </div>
        <Typography variant="lead" className="font-medium">
          ${total.toFixed(2)} USD
        </Typography>
      </div>
    </div>
  );
}
