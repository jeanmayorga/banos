import { MenuIcon, TentTree, TicketIcon } from "lucide-react";
import Link from "next/link";

import { SignInButton } from "@/app/auth/components/SignInButton";

import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export function Header() {
  return (
    <header
      className="sticky top-0 z-30 flex flex-row items-center justify-between bg-white px-8 py-4 shadow-sm dark:border-b dark:border-gray-800 dark:bg-black dark:shadow-black md:top-6 md:mx-auto md:mb-12 md:w-full md:max-w-2xl md:rounded-3xl md:dark:border"
      //  className="fixed inset-x-4 left-0 top-6 z-10 flex w-full items-center justify-between rounded-3xl bg-white px-8 py-4 shadow-lg dark:border-b-gray-800 dark:bg-black md:left-1/2 md:max-w-2xl md:-translate-x-1/2"
    >
      <Link href="/">
        <Logo size="sm" className="text-[#00a7ac] dark:text-white" />
      </Link>
      <div className="hidden md:block">
        {/* <Link href="/places">
          <Button variant="ghost" className="rounded-full">
            <MapPinIcon className="h-4 w-4" />
            Lugares
          </Button>
        </Link> */}
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
      </div>
      <div className="flex space-x-4">
        <SignInButton />
        {/* <div className="block md:hidden">
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
        </div> */}
      </div>
      {/* <div className="absolute right-4">
          <ModeToggle />
        </div> */}
    </header>
  );
}
