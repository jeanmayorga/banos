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
        className={cn("w-full border-0 pl-11 text-base transition-all duration-300")}
        defaultValue={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </section>
  );
}
