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
    <header className="w-full border-b border-b-gray-100 dark:border-b-gray-800 h-[80px] flex items-center">
      <div className="container max-w-6xl mx-auto flex items-center justify-between py-2">
        <Link href="/" passHref>
          <Logo size="sm" className="text-rose-500 dark:text-white" />
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
            className="sm:flex sm:justify-between sm:items-center shadow-sm hover:shadow-md hidden relative w-[390px] hover:w-[490px] border border-gray-200 dark:border-gray-700 rounded-full px-2 py-[6px] transition-all"
          >
            <span className="ml-3 font-medium text-sm">¿Qué hacer en Banos?</span>
            <div className="rounded-full bg-rose-500 w-8 h-8 flex items-center justify-center text-white">
              <SearchIcon className="h-3 w-3" strokeWidth={4} />
            </div>
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
