import { getSession } from "@/app/services/session.service";
import { AccountTickets } from "@/components/account-tickets";

export default async function Page() {
  const session = await getSession();
  const user = session?.user!;

  return <AccountTickets userUuid={user.uuid} />;
}
