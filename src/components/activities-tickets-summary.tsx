"use client";

import { TZDate } from "@date-fns/tz";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, TicketCheckIcon } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { ReactNode } from "react";

import { Activity } from "@/app/activities/actions";
import { Ticket } from "@/app/tickets/types";
import { Paper } from "@/components/paper";
import { Separator } from "@/components/ui/separator";
import { getImageUrl } from "@/lib/get-image-url";
import { cn } from "@/utils";
import { capitalize } from "@/utils/capitalize";

import { ActivitiesTicketsBadgePayment } from "./activities-tickets-badge-payment";
import { H3 } from "./h3";
import { TitleMini } from "./title-mini";

function Section(props: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex border-b border-dashed px-8 py-4 last-of-type:border-b-0",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

interface Props {
  ticket: Ticket;
  activity: Activity;
}
export function ActivitiesTicketsSummary({ ticket, activity }: Props) {
  const date = new TZDate(ticket.date as string, "America/Guayaquil");

  const adultsQuantity = ticket.adults_quantity || 0;
  const adultsPrice = activity.fields.adultPrice || 0;
  const adultsTotal = adultsQuantity * adultsPrice;

  const childrenQuantity = ticket.children_quantity || 0;
  const childrenPrice = activity.fields.childPrice || 0;
  const childrenTotal = childrenQuantity * childrenPrice;

  const taxAmount = 0;
  const subTotalAmount = 0;
  const totalAmount = adultsTotal + childrenTotal;

  return (
    <Paper className="py-4">
      <Section className="flex justify-center border-b-0 pb-4">
        <TicketCheckIcon className="mr-2 mt-[-2px] text-gray-500 dark:text-gray-100" />
        <h2 className="text-xl leading-none tracking-tight text-gray-600 dark:text-gray-100">
          Ticket/Entrada
        </h2>
      </Section>
      <Section className="flex justify-center pb-8">
        <QRCodeSVG value={ticket.uuid} size={ticket.payment_status === "paid" ? 256 : 128} />
      </Section>
      <Section className="flex justify-center">
        <ActivitiesTicketsBadgePayment status={ticket.payment_status} />
      </Section>
      <Section>
        <Image
          src={getImageUrl(activity.fields.images[0])}
          alt={activity.fields.title}
          width={48}
          height={48}
          className="mr-2 aspect-square h-10 w-10 rounded-full bg-cover"
        />
        <div className="flex flex-col justify-center">
          <H3>{activity.fields.title}</H3>
          <div className="flex items-center text-gray-500 dark:text-gray-100">
            <Clock className="mr-[3px] h-[14px] w-[14px]" />
            <div className="text-sm">
              Horario {activity.fields.openAt} - {activity.fields.closeAt}
            </div>
          </div>
        </div>
      </Section>
      <Section className="flex-col">
        <TitleMini className="block">Fecha:</TitleMini>
        <p className="mb-2 text-sm">
          {capitalize(formatDate(new Date(date), "EEEE, d 'de' MMMM 'del' yyyy", { locale: es }))}
        </p>
        {ticket.customer_name && (
          <>
            <TitleMini className="block">A nombre de:</TitleMini>
            <p className="mb-2 text-sm">{ticket.customer_name}</p>
          </>
        )}
        {ticket.customer_document && ticket.customer_id && (
          <>
            <TitleMini>{ticket.customer_document?.replaceAll("_", " ")}:</TitleMini>
            <p className="mb-2 text-sm">{ticket.customer_id}</p>
          </>
        )}
        {ticket.customer_phone_country_code && ticket.customer_phone && (
          <>
            <TitleMini>Telefono:</TitleMini>
            <p className="text-sm">
              {ticket.customer_phone_country_code} {ticket.customer_phone}
            </p>
          </>
        )}
      </Section>
      <Section className="flex flex-col">
        <div className="flex w-full justify-between text-sm text-gray-500 dark:text-gray-300">
          <span>
            Adultos: ({adultsQuantity} x ${adultsPrice.toFixed(2)})
          </span>
          <span>${adultsTotal.toFixed(2)}</span>
        </div>
        <div className="mb-4 flex w-full justify-between text-sm text-gray-500 dark:text-gray-300">
          <span>
            Menores: ({childrenQuantity} x ${childrenPrice.toFixed(2)})
          </span>
          <span>${childrenTotal.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between text-sm text-gray-500 dark:text-gray-300">
          <span>Impuestos:</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div className="mb-4 flex w-full justify-between text-sm text-gray-500 dark:text-gray-300">
          <span>Subtotal:</span>
          <span>${subTotalAmount.toFixed(2)}</span>
        </div>
        <Separator className="mb-2" />
        <div className="flex w-full justify-between text-base font-medium text-gray-900 dark:text-white">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </Section>
    </Paper>
  );
}
