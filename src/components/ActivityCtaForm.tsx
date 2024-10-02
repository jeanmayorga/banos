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
    <div className="sticky top-[90px] w-full rounded-xl bg-gray-50/90 py-6 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 px-4">
        <Typography variant="h3" className="flex items-center">
          $ {price.toFixed(2)}{" "}
          <Typography variant="muted" component="span" className="ml-1">
            USD
          </Typography>
        </Typography>
        <Typography variant="lead">por persona</Typography>
      </div>

      <div className="mx-4 mb-4 flex flex-none items-center overflow-hidden rounded-full border bg-white dark:border-slate-600 dark:hover:bg-slate-700">
        <Popover onOpenChange={(e) => setIsDateOpen(e)} open={isDateOpen}>
          <PopoverTrigger className="flex h-full w-full items-center justify-start px-4 py-3 text-gray-400">
            <CalendarDaysIcon className="mr-2 h-6 w-6" />
            <motion.div
              className="mr-4 text-left"
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
              className="relative mr-2 flex items-center"
            >
              <Button variant="ghost" onClick={() => setDate(undefined)}>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-4 mb-4 flex flex-none items-center overflow-hidden rounded-full border bg-white dark:border-slate-600 dark:hover:bg-slate-700">
        <Popover onOpenChange={(e) => setIsPeopleCountOpen(e)} open={isPeopleCountOpen}>
          <PopoverTrigger className="flex h-full w-full items-center justify-start px-4 py-3 text-gray-400">
            <UserGroupIcon className="mr-2 h-6 w-6" />
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
            className="flex w-full select-none flex-col items-center px-8 py-4"
            align="start"
          >
            <Typography variant="lead">Número de personas</Typography>
            <div className="my-4 flex items-center space-x-8">
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
              className="relative mr-2 flex items-center"
            >
              <Button variant="ghost" onClick={() => setPeopleCount(0)}>
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
          <Button className="w-full rounded-full">
            <SendIcon className="mr-2 h-4 w-4" />
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
