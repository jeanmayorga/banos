"use client";

import {
  CalendarDaysIcon,
  UserGroupIcon,
  BanknotesIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

interface Props {}
export function JumboHomeForm({}: Props) {
  const price = 2;
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [isPeopleCountOpen, setPeopleCountOpen] = useState(false);

  const [total, setTotal] = useState(price);

  useEffect(() => {
    setTotal(peopleCount * price);
  }, [peopleCount]);

  return (
    <div className="rounded-lg bg-white shadow sm:inline-flex sm:rounded-full sm:p-2">
      <div className="flex flex-none items-center overflow-hidden border-b px-4 py-4 text-gray-400 sm:border-b-0 sm:border-r sm:py-0">
        <Popover onOpenChange={(e) => setIsDateOpen(e)}>
          <PopoverTrigger className="flex h-full w-full items-center justify-start">
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
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <motion.div
          initial={{ width: "0" }}
          animate={{ width: isDateOpen || date ? "24px" : "0px" }}
          className="flex items-center overflow-hidden"
        >
          <Button variant="ghost" onClick={() => setDate(undefined)}>
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <div className="flex flex-none items-center overflow-hidden border-b px-4 py-4 text-gray-400 sm:border-b-0 sm:border-r sm:py-0">
        <Popover onOpenChange={(e) => setPeopleCountOpen(e)}>
          <PopoverTrigger className="flex h-full w-full items-center justify-start">
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
            className="flex w-auto select-none flex-col items-center px-8 py-4"
            align="start"
          >
            <div className="mb-4 text-sm font-semibold">Número de personas</div>
            <div className="my-4 flex items-center space-x-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPeopleCount((count) => (count === 0 ? 0 : count - 1))}
              >
                <MinusIcon />
              </Button>

              <div className="select-none text-center text-2xl font-semibold text-gray-800">
                {peopleCount}
              </div>

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
        <motion.div
          initial={{ width: "0" }}
          animate={{ width: isPeopleCountOpen || peopleCount ? "24px" : "0px" }}
          className="flex items-center overflow-hidden"
        >
          <Button variant="ghost" onClick={() => setPeopleCount(0)}>
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <div className="flex flex-none items-center overflow-hidden border-b px-4 py-4 text-gray-400 sm:border-b-0 sm:border-r sm:py-0">
        <div className="flex h-full w-full items-center justify-start">
          <BanknotesIcon className="mr-2 h-6 w-6" />
          <div className="text-left transition-all">${total.toFixed(2)} USD</div>
        </div>
      </div>

      <div className="p-4 sm:ml-4 sm:p-0">
        <Button className="w-full sm:rounded-full">Comprar entradas</Button>
      </div>
    </div>
  );
}
