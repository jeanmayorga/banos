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
    <div className="items-center justify-between p-4 lg:flex">
      <span>
        <Input
          placeholder="Buscar..."
          className="mb-2 w-full rounded-full bg-muted bg-white lg:mb-0 lg:w-[300px]"
          defaultValue={search}
          onChange={(e) => debounced(e.target.value)}
        />
      </span>
      <span>
        <Select value={sort} onValueChange={handleSort}>
          <SelectTrigger className="rounded-full">
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
