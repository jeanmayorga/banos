import { MenuIcon, TentTree, TicketIcon } from "lucide-react";
import Link from "next/link";

import { getSession } from "@/app/services/session.service";
import { cn } from "@/utils";

import { HeaderAccountButton } from "./header-account-button";
import { HeaderSignInButton } from "./header-sign-in-button";
import { HeaderTicketScanButton } from "./header-ticket-scan-button";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export async function Header() {
  const session = await getSession();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex flex-row items-center justify-between bg-white px-8 py-4 shadow-sm dark:border-b dark:border-gray-800 dark:bg-black dark:shadow-black md:top-6 md:mx-auto md:mb-12 md:w-full md:rounded-3xl md:dark:border",
        session ? "md:max-w-5xl" : "md:max-w-2xl",
      )}
    >
      <Link href="/">
        <Logo size="sm" className="text-[#00a7ac] dark:text-white" />
      </Link>
      <div className="absolute left-[130px] hidden border-l border-l-gray-100 md:block">
        <Link href="/activities">
          <Button variant="ghost" className="rounded-full">
            <TentTree className="h-4 w-4" />
            Actividades
          </Button>
        </Link>
        <Link href="/tickets">
          <Button variant="ghost" className="rounded-full">
            <TicketIcon className="h-4 w-4" />
            Mis tickets
          </Button>
        </Link>
        {session && <HeaderTicketScanButton />}
      </div>
      <div className="flex space-x-4">
        {session ? <HeaderAccountButton currentUser={session} /> : <HeaderSignInButton />}

        <div className="block md:hidden">
          {/* Aqui es el problema del doble button */}
          <Sheet>
            <SheetTrigger>
              <Button className="rounded-full" variant="secondary" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="mb-8">Menu</SheetTitle>
                <Link href="/activities">
                  <Button variant="ghost" className="w-full rounded-full">
                    <TentTree className="h-4 w-4" />
                    Actividades
                  </Button>
                </Link>
                <Link href="/tickets">
                  <Button variant="ghost" className="w-full rounded-full">
                    <TicketIcon className="h-4 w-4" />
                    Mis entradas
                  </Button>
                </Link>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
