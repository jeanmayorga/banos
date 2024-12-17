import { redirect } from "next/navigation";

import { AccountWelcome } from "@/components/account-welcome";
import { Container } from "@/components/container";

import { getSession } from "../services/session.service";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <Container className="py-4">
        <AccountWelcome user={user} />
        {children}
      </Container>
    </>
  );
}
