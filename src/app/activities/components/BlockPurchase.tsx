"use client";

import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarIcon,
  Loader,
  MinusIcon,
  PlusIcon,
  TicketCheckIcon,
  TicketPlusIcon,
  UsersRoundIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { Activity, createActivityReservation } from "../actions";
import { DEFAULT_MAX_ADULTS, DEFAULT_MAX_CHILDREN } from "../config";

interface Props {
  activity: Activity;
}
export function BlockPurchase({ activity }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const isAddAdultDisbled = adults >= DEFAULT_MAX_ADULTS;
  const isMinusAdultDisabled = adults <= 1;
  const isAddChildrenDisbled = children >= DEFAULT_MAX_CHILDREN;
  const isMinusChildrenDisabled = children <= 0;
  const adultsPrice = activity.fields.adultPrice || 0;
  const childPrice = activity.fields.childPrice || 0;

  const total = useMemo(() => {
    const adultsTotal = adults * adultsPrice;
    const childrenTotal = children * childPrice;

    return adultsTotal + childrenTotal;
  }, [adults, adultsPrice, childPrice, children]);

  async function buyTickets() {
    if (!date) {
      toast.error("Te falta seleccionar una fecha.");
      return;
    }
    setLoading(true);
    const reservation = await createActivityReservation({
      date: date.toISOString(),
      slug: activity.fields.slug,
      adults,
      children,
      total,
    });

    if (reservation) {
      router.push(`/activities/reservations/${reservation.uuid}`);
      return;
    } else {
      setLoading(false);
      toast.error("No pudimos crear la reserva.");
    }
  }

  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl bg-white py-8 shadow-sm">
      {loading && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/10">
          <Loader className="animate-spin" />
        </div>
      )}
      <div className="mb-6 flex border-b border-dashed px-8 pb-6">
        <TicketCheckIcon className="mr-2 mt-[-2px] text-gray-500" />
        <div>
          <h2 className="text-xl leading-none tracking-tight text-gray-600">Comprar entradas</h2>
          <p className="text-sm tracking-tight text-gray-400">
            Al terminar la compra, recibirás un código QR.
          </p>
        </div>
      </div>

      <div className="space-y-4 px-8">
        <div className="relative flex flex-col">
          <div className="mb-1 text-sm tracking-tight text-gray-600">¿Cuándo quieres ir?</div>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger>
              <Button
                variant="outline"
                className={cn(
                  "group w-full justify-start rounded-full bg-white pl-3 font-normal text-gray-400 hover:text-gray-500",
                )}
              >
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto rounded-3xl p-4" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setIsCalendarOpen(false);
                }}
                disabled={{ before: new TZDate(new Date(), "America/Guayaquil") }}
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
                  "group w-full justify-start rounded-full bg-white pl-3 font-normal text-gray-400 hover:text-gray-500",
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

        <div />

        <Button
          type="submit"
          className="w-full rounded-full"
          onClick={buyTickets}
          disabled={loading}
        >
          <TicketPlusIcon />
          Comprar entradas
        </Button>

        <p className="text-center text-xs text-gray-400">No se hará ningún cargo por el momento</p>

        <div className="tracking-tight">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Total adultos:</span>
            <span>${(adults * adultsPrice).toFixed(2)}</span>
          </div>
          <div className="mb-4 flex justify-between text-sm text-gray-500">
            <span>Total menores:</span>
            <span>${(children * childPrice).toFixed(2)}</span>
          </div>
          <Separator className="mb-4" />
          <div className="flex justify-between text-base font-medium text-gray-600">
            <span>Total con impuestos</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
