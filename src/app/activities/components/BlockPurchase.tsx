"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, MinusIcon, PlusIcon, TicketPlusIcon, UsersRoundIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { Activity } from "../actions";

interface Props {
  activity: Activity;
}
export function BlockPurchase({ activity }: Props) {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const isAddAdultDisbled = adults >= 9;
  const isMinusAdultDisabled = adults <= 0;
  const isAddChildrenDisbled = children >= 9;
  const isMinusChildrenDisabled = children <= 0;

  const total = useMemo(() => {
    const adultsPrice = activity.fields.adultPrice || 0;
    const childPrice = activity.fields.childPrice || 0;

    const adultsTotal = adults * adultsPrice;
    const childrenTotal = children * childPrice;

    return adultsTotal + childrenTotal;
  }, [adults, children, activity.fields]);

  return (
    <div className="mb-8 space-y-4 rounded-3xl bg-white px-8 py-8 shadow-sm">
      <div>
        <h2 className="text-xl leading-none tracking-tight text-gray-700">Comprar entradas</h2>
        <p className="text-sm tracking-tight text-gray-400">
          Al terminar la compra, recibirás un código QR para entrar.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="mb-1 text-sm tracking-tight text-gray-600">¿Cuándo quieres ir?</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "group w-full justify-start rounded-full bg-gray-50 pl-3 font-normal text-gray-400 hover:text-gray-500",
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto rounded-3xl p-4" align="start">
            <Calendar
              mode="single"
              selected={new Date(date || "")}
              onSelect={(e) => setDate(e?.toISOString())}
              disabled={(date) => date <= new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col">
        <div className="mb-1 text-sm tracking-tight text-gray-600">¿Cuántas personas son?</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "group w-full justify-start rounded-full bg-gray-50 pl-3 font-normal text-gray-400 hover:text-gray-500",
              )}
            >
              <UsersRoundIcon className="h-4 w-4" />
              {adults + children === 0 ? "0 Personas" : `${adults + children} Personas`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto rounded-3xl p-4" align="start">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-lg leading-none tracking-tight text-gray-700">Adultos</p>
                <p className="mb-4 text-xs tracking-tight text-gray-400">Desde 18 años</p>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                    disabled={isMinusAdultDisabled}
                    onClick={() => setAdults(adults - 1)}
                  >
                    <MinusIcon />
                  </Button>
                  <p className="min-w-7 text-center text-lg leading-none tracking-tight text-gray-700">
                    {adults}
                  </p>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                    disabled={isAddAdultDisbled}
                    onClick={() => setAdults(adults + 1)}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-lg leading-none tracking-tight text-gray-700">Menores</p>
                <p className="mb-4 text-xs tracking-tight text-gray-400">Hasta 18 años</p>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                    disabled={isMinusChildrenDisabled}
                    onClick={() => setChildren(children - 1)}
                  >
                    <MinusIcon />
                  </Button>
                  <p className="min-w-7 text-center text-lg leading-none tracking-tight text-gray-700">
                    {children}
                  </p>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                    disabled={isAddChildrenDisbled}
                    onClick={() => setChildren(children + 1)}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div></div>

      <Button type="submit" className="w-full rounded-full">
        <TicketPlusIcon />
        Comprar entradas
      </Button>

      <p className="text-center text-xs text-gray-400">No se hará ningún cargo por el momento</p>

      <Separator />

      <div className="flex justify-between text-base font-medium tracking-tight text-gray-600">
        <span>Total con impuestos</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
