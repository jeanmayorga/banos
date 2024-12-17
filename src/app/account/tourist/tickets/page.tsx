import { getSession } from "@/app/services/session.service";
import { AccountTickets } from "@/components/account-tickets";
import { AccountWelcome } from "@/components/account-welcome";
import { Container } from "@/components/container";
import { TabLink } from "@/components/tab-link";

export default async function Page() {
  const session = await getSession();
  const user = session?.user!;

  return (
    <div>
      <Container className="max-w-3xl">
        <AccountWelcome user={user} />
        <nav className="no-scrollbar mb-8 flex space-x-2 overflow-x-auto">
          <TabLink href="/account/tourist">Inicio</TabLink>
          <TabLink href="/account/tourist/tickets">Mis tickets</TabLink>
        </nav>
        <AccountTickets userUuid={user.uuid} />
      </Container>
    </div>
  );
}
