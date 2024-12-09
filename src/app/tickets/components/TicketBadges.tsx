import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";

import { TicketPaymentStatus, TicketStatus } from "../types";

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return (
    <Badge variant={status === "not_used" ? "secondary" : "destructive"}>
      {status === "not_used" && "Ticket no usado"}
      {status === "used" && "Ticket usado"}
    </Badge>
  );
}

export function TicketPaymentStatusBadge({ status }: { status: TicketPaymentStatus }) {
  return (
    <Badge className={cn(status === "pending" && "bg-amber-500 hover:bg-amber-600")}>
      {status === "pending" && "Pendiente de pago"}
      {status === "paid" && "Pagada"}
      {status === "cancel" && "Cancelada"}
    </Badge>
  );
}
