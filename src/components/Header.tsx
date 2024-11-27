import { CircleUserRoundIcon, MapPinIcon, TentTree } from "lucide-react";
import Link from "next/link";

import { Logo } from "./Logo";
// import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header
      className="sticky top-0 z-30 flex flex-row items-center justify-between bg-white px-8 py-4 shadow-sm md:top-6 md:mx-auto md:mb-12 md:w-full md:max-w-2xl md:rounded-3xl"
      //  className="fixed inset-x-4 left-0 top-6 z-10 flex w-full items-center justify-between rounded-3xl bg-white px-8 py-4 shadow-lg dark:border-b-gray-800 dark:bg-black md:left-1/2 md:max-w-2xl md:-translate-x-1/2"
    >
      <Link href="/">
        <Logo size="sm" className="text-[#00a7ac] dark:text-white" />
      </Link>
      <div className="hidden md:block">
        {/* <Link href="/lugares"> */}
        <Button variant="ghost" disabled className="rounded-full">
          <MapPinIcon className="mr-2 h-4 w-4" />
          Lugares
        </Button>
        {/* </Link> */}
        <Link href="/activities">
          <Button variant="ghost" className="rounded-full">
            <TentTree className="mr-2 h-4 w-4" />
            Actividades
          </Button>
        </Link>
      </div>
      <div>
        {/* <Link href="/auth"> */}
        <Button disabled className="rounded-full" variant="secondary">
          <CircleUserRoundIcon className="mr-2 h-4 w-4" />
          Iniciar sesión
        </Button>
        {/* </Link> */}
      </div>
      {/* <div className="absolute right-4">
          <ModeToggle />
        </div> */}
    </header>
  );
}
