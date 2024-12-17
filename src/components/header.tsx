import { CircleUserRoundIcon, TentTree, TicketIcon } from "lucide-react";
import Link from "next/link";

import { getSession } from "@/app/services/session.service";
import { cn } from "@/utils";

import { HeaderAccountButton } from "./header-account-button";
import { HeaderMobileButton } from "./header-mobile-button";
import { HeaderThemeButton } from "./header-theme-button";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

const menu = [
  {
    href: "/activities",
    icon: <TentTree className="h-4 w-4" />,
    text: "Actividades",
  },
  {
    href: "/account",
    icon: <TicketIcon className="h-4 w-4" />,
    text: "Mis Tickets",
  },
];

export async function Header() {
  const session = await getSession();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex flex-row items-center justify-between bg-white px-8 py-4 shadow-sm dark:bg-[#171716] dark:shadow-[#171716] md:top-6 md:mx-auto md:mb-12 md:w-full md:rounded-3xl md:dark:border",
        session ? "md:max-w-3xl" : "md:max-w-2xl",
      )}
    >
      <Link href="/">
        <Logo size="sm" className="text-[#00a7ac] dark:text-white" />
      </Link>
      <div className={cn("absolute left-1/2 hidden -translate-x-1/2 md:block")}>
        {menu.map((item) => {
          return (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="rounded-full">
                {item.icon} {item.text}
              </Button>
            </Link>
          );
        })}
      </div>
      <div className="flex space-x-2">
        <HeaderThemeButton />
        {session ? (
          <HeaderAccountButton session={session} />
        ) : (
          <Link href="/auth" className="hidden md:block">
            <Button className="rounded-full" variant="secondary" size="icon">
              <CircleUserRoundIcon className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <HeaderMobileButton session={session} menu={menu} />
      </div>
    </header>
  );
}
