"use client";

import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { cn } from "#/utils";

import { Input } from "./ui/input";

interface Props {
  placeholder?: string;
}
export function Search({ placeholder }: Props) {
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <section className="relative mb-4 overflow-hidden rounded-full">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <Input
        placeholder={placeholder || "Buscar"}
        className={cn(
          isSearching ? "w-[calc(100%-80px)]" : "w-full",
          "rounded-xl border-0 bg-gray-100 pl-11 text-base text-gray-500 transition-all duration-300 placeholder:text-gray-400 dark:bg-gray-700 dark:text-gray-300",
        )}
        onFocus={() => setIsSearching(true)}
        // onChange={(e) => doSearch(e.target.value)}
        // value={search || ""}
      />
      <span
        className={cn(
          isSearching ? "right-0 opacity-100" : "-right-[100px] opacity-0",
          "hover:text-rose-4s00 absolute top-0 flex h-full cursor-pointer select-none items-center text-rose-400 transition-all duration-300 hover:scale-[.99] active:scale-[.97]",
        )}
        onClick={() => {
          // setSearch(null);
          setIsSearching(false);
        }}
      >
        Cancelar
      </span>
    </section>
  );
}
