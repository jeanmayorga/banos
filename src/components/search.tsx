"use client";

import { SearchIcon } from "lucide-react";

import { cn } from "#/utils";

import { Input } from "./ui/input";

interface Props {
  placeholder?: string;
  onSearch?: (query: string) => void;
}
export function Search({ placeholder, onSearch }: Props) {
  return (
    <section className="relative mb-4 overflow-hidden rounded-full">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <Input
        placeholder={placeholder || "Buscar"}
        className={cn(
          "w-full rounded-xl border-0 bg-gray-100 pl-11 text-base text-gray-500 transition-all duration-300 placeholder:text-gray-400 dark:bg-gray-700 dark:text-gray-300",
        )}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </section>
  );
}
