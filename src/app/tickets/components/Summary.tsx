import { Clock, MapPinIcon, TicketCheckIcon } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

import { Activity } from "@/app/activities/actions";
import { Paper } from "@/components/paper";
import { Separator } from "@/components/ui/separator";
import { getImageUrl } from "@/lib/get-image-url";

import { Ticket } from "../types";

import { TicketPaymentStatusBadge, TicketStatusBadge } from "./TicketBadges";

interface Props {
  ticket: Ticket;
  activity: Activity;
}
export function Summary({ ticket, activity }: Props) {
  return (
    <Paper>
      <div className="flex items-center border-b border-dashed px-8 py-4">
        <TicketCheckIcon className="mr-2 mt-[-2px] text-gray-500" />
        <h2 className="text-xl leading-none tracking-tight text-gray-600">Ticket</h2>
      </div>
      <div className="flex justify-center border-b border-dashed px-8 py-4">
        <QRCodeSVG value={ticket.uuid} />
      </div>
      <div className="flex justify-center space-x-2 border-b border-dashed px-8 py-4">
        <TicketPaymentStatusBadge status={ticket.payment_status} />
        <TicketStatusBadge status={ticket.status} />
      </div>
      <div className="flex border-b border-dashed px-8 py-4">
        <Image
          src={getImageUrl(activity.fields.images[0])}
          alt={activity.fields.title}
          width={48}
          height={48}
          className="mr-2 aspect-square h-14 w-14 rounded-full bg-cover"
        />
        <div className="flex flex-col justify-center">
          <h2 className="truncate text-lg leading-none tracking-tight text-gray-600">
            {activity.fields.title}
          </h2>
          <div className="flex items-center text-gray-400">
            <MapPinIcon className="mr-[2px] h-[14px] w-[14px]" />
            <div className="mt-[1px] text-xs">{activity.fields.place?.fields.title}</div>
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="mr-[2px] h-[14px] w-[14px]" />
            <div className="mt-[1px] text-xs">
              {activity.fields.openAt} - {activity.fields.closeAt}
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 tracking-tight">
        <div className="flex justify-between text-sm text-gray-400">
          <span>
            Adultos: ({ticket.adults_quantity} x ${ticket.adults_price.toFixed(2)})
          </span>
          <span>${(ticket.adults_quantity * ticket.adults_price).toFixed(2)}</span>
        </div>
        <div className="mb-4 flex justify-between text-sm text-gray-400">
          <span>
            Menores: ({ticket.children_quantity} x ${ticket.children_price.toFixed(2)})
          </span>
          <span>${(ticket.children_quantity * ticket.children_price).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Impuestos:</span>
          <span>${ticket.tax_amount.toFixed(2)}</span>
        </div>
        <div className="mb-4 flex justify-between text-sm text-gray-400">
          <span>Subtotal:</span>
          <span>${ticket.subtotal_amount.toFixed(2)}</span>
        </div>
        <Separator className="mb-2" />
        <div className="flex justify-between text-base font-medium text-gray-900">
          <span>Total:</span>
          <span>${ticket.total_amount.toFixed(2)}</span>
        </div>
      </div>
    </Paper>
  );
}
