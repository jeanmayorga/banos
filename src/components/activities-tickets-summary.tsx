"use client";

import { TZDate } from "@date-fns/tz";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, MailIcon, TicketCheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import { WhatsappIcon } from "./icon-whatsapp";
import { TitleMini } from "./title-mini";
import { Button } from "./ui/button";

function Section(props: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex border-b border-dashed last-of-type:border-b-0", props.className)}>
      {props.children}
    </div>
  );
}

interface Props {
  ticket: Ticket;
  activity?: Activity | null;
  showQrCode?: boolean;
  showShareButtons?: boolean;
  showCustomer?: boolean;
  pYContainerClassName?: string;
  pXClassName?: string;
  pYClassName?: string;
  withLink?: boolean;
}
export function ActivitiesTicketsSummary({
  ticket,
  activity,
  showQrCode = false,
  showShareButtons = false,
  showCustomer = false,
  withLink = false,
  pYContainerClassName = "py-0",
  pYClassName = "py-4",
  pXClassName = "px-8",
}: Props) {
  const date = new TZDate(ticket.date as string, "America/Guayaquil");

  const adultsQuantity = ticket.adults_quantity || 0;
  const adultsPrice = activity?.fields.adultPrice || 0;
  const adultsTotal = adultsQuantity * adultsPrice;

  const childrenQuantity = ticket.children_quantity || 0;
  const childrenPrice = activity?.fields.childPrice || 0;
  const childrenTotal = childrenQuantity * childrenPrice;

  const taxAmount = 0;
  const subTotalAmount = 0;
  const totalAmount = adultsTotal + childrenTotal;

  const isUsed = ticket.status === "used";

  const Header = () => (
    <div className="flex items-center">
      <div className="mr-2 flex items-center justify-center rounded-full bg-gray-100 p-3">
        <TicketCheckIcon className="h-6 w-6 text-gray-500 group-hover:text-primary dark:text-gray-100" />
      </div>
      <div>
        <h2 className="text-xl leading-none tracking-tight text-gray-600 transition-all group-hover:text-primary dark:text-gray-100">
          Ticket/Entrada
        </h2>
        <p className="text-sm text-gray-400 transition-all group-hover:text-primary/70">
          Código: {ticket.uuid.split("-")[4]}
        </p>
      </div>
    </div>
  );

  return (
    <Paper className={cn("relative overflow-hidden", pYContainerClassName)}>
      {withLink ? (
        <Section className={cn("p-0")}>
          <Link
            href={`/activities/tickets/${ticket.uuid}`}
            className={cn("group w-full transition-all hover:bg-gray-50", pYClassName, pXClassName)}
          >
            <Header />
          </Link>
        </Section>
      ) : (
        <Section className={cn(pYClassName, pXClassName)}>
          <Header />
        </Section>
      )}
      {showQrCode && (
        <Section className={cn("flex justify-center pb-8", pYClassName, pXClassName)}>
          <QRCodeSVG value={ticket.uuid} size={256} />
        </Section>
      )}
      {showShareButtons && (
        <Section
          className={cn("relative z-20 flex justify-center space-x-2", pYClassName, pXClassName)}
        >
          <Button
            variant="outline"
            className="rounded-full"
            size="sm"
            onClick={(event) => {
              event.stopPropagation(); // Detiene la propagación del evento
              alert("Botón presionado");
            }}
          >
            <MailIcon /> Reenviar
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            size="sm"
            onClick={(event) => {
              event.stopPropagation(); // Detiene la propagación del evento
              alert("Botón presionado");
            }}
          >
            <WhatsappIcon /> Reenviar
          </Button>
        </Section>
      )}
      {isUsed ? (
        <Section
          className={cn(
            "flex bg-red-50 text-xs font-semibold text-red-800",
            pYClassName,
            pXClassName,
          )}
        >
          Ticket usado el{" "}
          {formatDate(new Date(ticket.used_at), "d 'de' MMMM 'del' yyyy HH:mm:ss", {
            locale: es,
          })}
        </Section>
      ) : (
        <Section className={cn("flex bg-gray-50 text-xs font-semibold", pYClassName, pXClassName)}>
          Ticket no usado
        </Section>
      )}
      <Section className={cn("flex", pYClassName, pXClassName)}>
        <ActivitiesTicketsBadgePayment status={ticket.payment_status} />
      </Section>
      {activity && (
        <Section className={cn(pYClassName, pXClassName)}>
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
      )}
      <Section className={cn("flex-col", pYClassName, pXClassName)}>
        <TitleMini className="block">Fecha:</TitleMini>
        <p className={cn("text-sm", showCustomer && ticket.customer_name && "mb-2")}>
          {capitalize(formatDate(new Date(date), "EEEE, d 'de' MMMM 'del' yyyy", { locale: es }))}
        </p>
        {showCustomer && (
          <>
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
          </>
        )}
      </Section>

      <Section className={cn("flex flex-col", pYClassName, pXClassName)}>
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
