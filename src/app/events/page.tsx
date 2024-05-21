import { redirect } from "next/navigation";

import { getCurrentDate } from "#/utils";

export default function Page() {
  const date = getCurrentDate();
  redirect(`/events/${date}`);
}
