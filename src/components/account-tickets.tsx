import { EllipsisIcon, ExternalLinkIcon, TicketPlusIcon } from "lucide-react";

import { getTicketsByUserUuid } from "@/app/services/tickets.service";

import { ActivitiesTicketsBadgePayment } from "./activities-tickets-badge-payment";
import { H2 } from "./h2";
import { Paper } from "./paper";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Props {
  userUuid: string;
}
export async function AccountTickets({ userUuid }: Props) {
  const tickets = await getTicketsByUserUuid(userUuid);

  return (
    <Paper className="mb-16 px-8 py-6">
      <div className="flex items-start justify-between">
        <H2 className="mb-8">Tus entradas</H2>
        <Button variant="outline" className="rounded-full" disabled>
          <TicketPlusIcon /> Agregar un ticket
        </Button>
      </div>

      {tickets.length === 0 ? (
        <div className="mb-4 flex justify-center text-gray-600">
          <h3>No tienes tickets comprados</h3>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Actividad</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado de Pago</TableHead>
              <TableHead>Adultos</TableHead>
              <TableHead>Menores</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.uuid}>
                <TableCell className="font-medium">{ticket.uuid.split("-")[4]}</TableCell>
                <TableCell>
                  <a href={`/activities/${ticket.slug}`} target="_blank" rel="noopener noreferrer">
                    <Badge variant="outline">
                      /{ticket.slug} <ExternalLinkIcon className="ml-2 h-3 w-3" />
                    </Badge>
                  </a>
                </TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell>
                  <ActivitiesTicketsBadgePayment status={ticket.payment_status} />
                </TableCell>
                <TableCell>{ticket.adults_quantity}</TableCell>
                <TableCell>{ticket.children_quantity}</TableCell>
                <TableCell className="text-right">$ {ticket.total_amount.toFixed(2)} USD</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" className="rounded-full" size="icon">
                    <EllipsisIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
