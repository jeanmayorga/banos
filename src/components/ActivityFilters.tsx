"use client";

import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import useQueryParams from "#/hooks/useQueryParams";

import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface QueryParams {
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export function ActivityFilters() {
  const { queryParams, setQueryParams, removeQueryParam } = useQueryParams<QueryParams>();

  const sortBy = queryParams.get("sortBy") || "";
  const sortOrder = queryParams.get("sortOrder") || "";
  const search = queryParams.get("search") || "";

  const sort = sortBy && sortOrder ? `${sortBy}-${sortOrder}` : undefined;

  const handleSort = (value: string) => {
    const sortBy = value.split("-")[0];
    const sortOrder = value.split("-")[1];

    setQueryParams({ sortBy, sortOrder });
  };

  const debounced = useDebouncedCallback((search) => {
    if (search.length > 0) {
      setQueryParams({ search });
    } else {
      removeQueryParam("search");
    }
  }, 500);

  return (
    <div className="lg:flex items-center justify-between py-2 bg-muted border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-xl px-2 mb-8">
      <span>
        <Input
          placeholder="Buscar..."
          className="rounded-xl lg:w-[300px] w-full lg:mb-0 mb-2"
          defaultValue={search}
          onChange={(e) => debounced(e.target.value)}
        />
      </span>
      <span>
        <Select value={sort} onValueChange={handleSort}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Ordenar por:" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ordenar por:</SelectLabel>
              <SelectItem value="visits-asc">Popularidad (menor a mayor)</SelectItem>
              <SelectItem value="visits-desc">Popularidad (mayor a menor)</SelectItem>
              <SelectItem value="price-asc">Precio (menor a mayor)</SelectItem>
              <SelectItem value="price-desc">Precio (mayor a menor)</SelectItem>
              <SelectItem value="name-asc">Nombre (de A-Z)</SelectItem>
              <SelectItem value="name-desc">Nombre (de Z-A)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </span>
    </div>
  );
}
