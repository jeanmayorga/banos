import { Title } from "@/components/Title";

import { getCurrentUser } from "./actions";

export default async function Page() {
  const currentUser = await getCurrentUser();
  return <div className="px-16">Hola, {currentUser?.firstName}</div>;
}
