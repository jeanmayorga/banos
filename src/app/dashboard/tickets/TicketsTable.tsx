"use client";

import { TrashIcon } from "lucide-react";
import { useState } from "react";

import { Summary } from "@/app/tickets/components/Summary";
import { TicketStatusBadge, TicketPaymentStatusBadge } from "@/app/tickets/components/TicketBadges";
import { Ticket } from "@/app/tickets/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  tickets: Ticket[];
}

export function TicketsTable({ tickets }: Props) {
  const [ticketSheet, setTicketSheet] = useState<Ticket | undefined>(undefined);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Identificador</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Pago</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Adultos</TableHead>
            <TableHead>Menores</TableHead>
            <TableHead>Impuestos</TableHead>
            <TableHead>SubTotal</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets?.map((ticket) => (
            <TableRow key={ticket.id} onClick={() => setTicketSheet(ticket)}>
              <TableCell>
                <Badge variant="secondary">{ticket.slug}</Badge>
              </TableCell>
              <TableCell className="flex items-center">
                <Avatar className="mr-1 h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {ticket.customer_name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">{ticket.customer_name}</div>
              </TableCell>
              <TableCell>
                <TicketStatusBadge status={ticket.status} />
              </TableCell>
              <TableCell>
                <TicketPaymentStatusBadge status={ticket.payment_status} />
              </TableCell>
              <TableCell>{ticket.check_in}</TableCell>
              <TableCell>
                {ticket.adults_quantity} x ${ticket.adults_price.toFixed(2)} = $
                {(ticket.adults_quantity * ticket.adults_price).toFixed(2)}
              </TableCell>
              <TableCell>
                {ticket.children_quantity} x ${ticket.children_price.toFixed(2)} = $
                {(ticket.children_quantity * ticket.children_price).toFixed(2)}
              </TableCell>
              <TableCell>$ {ticket.tax_amount.toFixed(2)}</TableCell>
              <TableCell>$ {ticket.subtotal_amount.toFixed(2)}</TableCell>
              <TableCell className="text-right">$ {ticket.total_amount.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button variant="secondary" size="icon">
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet>
        <SheetContent className="w-[400px] sm:w-[540px]">sdf</SheetContent>
      </Sheet>
    </>
  );
}
