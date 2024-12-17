import { redirect } from "next/navigation";

import { AuthSignIn } from "@/components/auth-sign-in";

import { getSession } from "../services/session.service";

export default async function Page() {
  // const session = await getSession();

  // if (session) {
  //   redirect("/");
  //   return;
  // }

  return <AuthSignIn />;
}
