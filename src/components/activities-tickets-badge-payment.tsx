import { TicketPaymentStatus } from "@/app/tickets/types";
import { cn } from "@/utils";

import { Badge } from "./ui/badge";

export function ActivitiesTicketsBadgePayment({ status }: { status?: TicketPaymentStatus }) {
  return (
    <Badge
      className={cn(
        status === "pending" && "bg-amber-200 text-black/60 hover:bg-amber-200",
        status === "paid" && "bg-green-200 text-black/60 hover:bg-green-200",
      )}
    >
      {(status === "pending" || !status) && "Pendiente de pago"}
      {status === "paid" && "Pagada"}
      {status === "cancel" && "Cancelada"}
    </Badge>
  );
}
