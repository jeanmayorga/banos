import { Bars3Icon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

import { Logo } from "./Logo";
import { ThemeButton } from "./ThemeButton";
import { Button } from "./ui/button";
import { UserButton } from "./UserButton";

interface Props {
  hideSearch?: boolean;
}
export function Header({ hideSearch }: Props) {
  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-b-gray-100 dark:border-b-gray-800">
      <div className="container max-w-6xl mx-auto flex items-center justify-between py-2">
        <Link href="/" passHref>
          <Logo size="sm" className=" text-fuchsia-700 dark:text-white" />
        </Link>

        {/* {!hideSearch && (
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
        )} */}
        {!hideSearch && (
          <Link
            href="/search"
            passHref
            prefetch
            className="sm:flex hidden relative w-[450px] hover:w-[490px] bg-gray-50 dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full py-2 px-3 text-gray-500 transition-all"
          >
            <SearchIcon className="h-5 w-5 mr-2" />
            <span className="font-light text-sm">¿Qué hacer en Banos?</span>
          </Link>
        )}

        <div className="flex items-center gap-2">
          {!hideSearch && (
            <Link href="/search" passHref prefetch>
              <Button variant="outline" aria-label="tema" className="rounded-full block sm:hidden">
                <SearchIcon className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <ThemeButton />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
