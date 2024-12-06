"use client";

import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { cn } from "#/utils";

import { Input } from "./ui/input";

export function Search() {
  const [query, setQuery] = useQueryState("query", {
    shallow: false,
    throttleMs: 1000,
    defaultValue: "",
    clearOnDefault: true,
  });

  return (
    <section className="relative overflow-hidden rounded-full">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <Input
        placeholder="Buscar"
        className={cn(
          "w-full rounded-xl border-0 bg-gray-100 pl-11 text-base text-gray-500 transition-all duration-300 placeholder:text-gray-400",
        )}
        defaultValue={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </section>
  );
}
