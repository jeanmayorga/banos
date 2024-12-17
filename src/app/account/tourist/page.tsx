import { DollarSignIcon, TicketsIcon } from "lucide-react";

import { getSession } from "@/app/services/session.service";
import { getTicketsByUserUuid } from "@/app/services/tickets.service";
import { AccountWelcome } from "@/components/account-welcome";
import { Container } from "@/components/container";
import { H3 } from "@/components/h3";
import { Paper } from "@/components/paper";
import { TabLink } from "@/components/tab-link";

export default async function Page() {
  const session = await getSession();
  const user = session?.user!;

  const tickets = await getTicketsByUserUuid(user.uuid);

  const totalPaidTickets = tickets.filter((ticket) => ticket.payment_status === "paid");
  const totalPaidAmount = totalPaidTickets.reduce(
    (prevValue, ticket) => prevValue + ticket.total_amount,
    0,
  );

  return (
    <div>
      <Container className="max-w-3xl">
        <AccountWelcome user={user} />
        <nav className="no-scrollbar mb-8 flex space-x-2 overflow-x-auto">
          <TabLink href="/account/tourist">Inicio</TabLink>
          <TabLink href="/account/tourist/tickets">Mis tickets</TabLink>
        </nav>
        <div className="grid gap-4 md:grid-cols-3">
          <Paper className="flex p-6">
            <div className="mr-4">
              <div className="flex items-center justify-center rounded-full bg-orange-200 p-3">
                <TicketsIcon className="h-5 w-5 text-orange-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">Tickes creados</div>
              <H3 className="text-xl font-medium leading-none">{tickets.length}</H3>
            </div>
          </Paper>
          <Paper className="flex p-6">
            <div className="mr-4">
              <div className="flex items-center justify-center rounded-full bg-green-200 p-3">
                <TicketsIcon className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">Tickes comprados</div>
              <H3 className="text-xl font-medium leading-none">{totalPaidTickets.length}</H3>
            </div>
          </Paper>
          <Paper className="flex p-6">
            <div className="mr-4">
              <div className="flex items-center justify-center rounded-full bg-green-200 p-3">
                <DollarSignIcon className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">Dinero gastado</div>
              <H3 className="text-xl font-medium leading-none">$ {totalPaidAmount.toFixed(2)}</H3>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
