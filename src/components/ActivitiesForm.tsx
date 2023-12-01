'use client';

import { useEffect, useState } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import {
  CalendarDaysIcon,
  UserGroupIcon,
  BanknotesIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/solid';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';

interface Props {}
export function ActivitiesForm({}: Props) {
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
    <div className="bg-white shadow border rounded-lg w-full py-6 sticky top-[72px]">
      <div className="px-4 mb-4">
        <p className="text-2xl font-semibold text-gray-500">
          $ 42.00 <span className="text-base font-light">por persona</span>
        </p>
      </div>
      <div className="mx-4 py-3 px-4 text-gray-400 flex flex-none items-center overflow-hidden border rounded-xl mb-4">
        <Popover onOpenChange={(e) => setIsDateOpen(e)}>
          <PopoverTrigger className="h-full w-full flex items-center justify-start">
            <CalendarDaysIcon className="h-6 w-6 mr-2" />
            <motion.div
              className="text-left mr-4"
              animate={{ width: isDateOpen || date ? '100px' : 'auto' }}
            >
              {date ? moment(date).format('DD-MM-YYYY') : 'Fecha'}
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
          initial={{ width: '0' }}
          animate={{ width: isDateOpen || date ? '24px' : '0px' }}
          className="flex items-center overflow-hidden"
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setDate(undefined)}
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <div className="mx-4 py-3 px-4 text-gray-400 flex flex-none items-center overflow-hidden border rounded-xl">
        <Popover onOpenChange={(e) => setPeopleCountOpen(e)}>
          <PopoverTrigger className="h-full w-full flex items-center justify-start">
            <UserGroupIcon className="h-6 w-6 mr-2" />
            <motion.div
              className="text-left"
              animate={{
                width: isPeopleCountOpen || peopleCount ? '120px' : 'auto',
              }}
            >
              {peopleCount === 0 && 'Personas'}
              {peopleCount === 1 && `${peopleCount} persona`}
              {peopleCount > 1 && `${peopleCount} personas`}
            </motion.div>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto py-4 px-8 flex flex-col items-center select-none"
            align="start"
          >
            <div className="font-semibold text-sm mb-4">Número de personas</div>
            <div className="flex space-x-8 items-center my-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setPeopleCount((count) => (count === 0 ? 0 : count - 1))
                }
              >
                <MinusIcon />
              </Button>

              <div className="font-semibold text-2xl text-center text-gray-800 select-none">
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
          initial={{ width: '0' }}
          animate={{ width: isPeopleCountOpen || peopleCount ? '24px' : '0px' }}
          className="flex items-center overflow-hidden"
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setPeopleCount(0)}
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <div className="text-gray-400 flex flex-none items-center py-4 sm:py-0 overflow-hidden px-4">
        <div className="h-full w-full flex items-center justify-start">
          <BanknotesIcon className="h-6 w-6 mr-2" />
          <div className="text-left transition-all">
            ${total.toFixed(2)} USD
          </div>
        </div>
      </div>

      <div className="sm:ml-4 sm:p-0 p-4">
        <Button className="sm:rounded-full w-full">Comprar entradas</Button>
      </div>
    </div>
  );
}
