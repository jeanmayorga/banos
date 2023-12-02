import { Bars3Icon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { Logo } from "./Logo";
import { ModeToggle } from "./ModeButton";
import { Button } from "./ui/button";

interface Props {
  hideSearch?: boolean;
}
export function Header({ hideSearch }: Props) {
  return (
    <header className="w-full bg-white dark:bg-black border-b border-b-gray-100">
      <div className="container mx-auto flex items-center justify-between h-[80px]">
        <Link href="/" passHref>
          <Logo size="sm" className=" text-fuchsia-700 dark:text-white" />
        </Link>

        {!hideSearch && (
          <Link
            href="/search"
            passHref
            prefetch
            className="sm:flex hidden items-center mx-8 relative w-[450px] hover:w-[500px] hover:bg-gray-50 active:bg-gray-100 px-4 border border-gray-300 rounded-full py-3 shadow hover:shadow-md select-none transition-all cursor-pointer"
          >
            <span className="text-gray-600 font-light text-sm">¿Qué hacer en Banos?</span>
            <div className="bg-fuchsia-700 rounded-full p-2 text-white absolute right-2 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </div>
          </Link>
        )}

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button size="icon" variant="ghost" aria-label="menu">
            <Bars3Icon />
          </Button>
          <Button size="icon" variant="outline" aria-label="menu">
            <UserIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
