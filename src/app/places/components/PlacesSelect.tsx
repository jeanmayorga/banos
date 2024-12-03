"use client";

import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getPlaces } from "../actions";

export function PlacesSelect() {
  const [_, setPlaceId] = useQueryState("placeId", {
    shallow: false,
    throttleMs: 1000,
    defaultValue: "",
    clearOnDefault: true,
  });
  const { data: places } = useQuery({
    queryKey: ["places"],
    queryFn: () => getPlaces(),
  });

  return (
    <Select onValueChange={(e) => setPlaceId(e)}>
      <SelectTrigger className="mb-0 rounded-full border-none bg-gray-100 text-gray-500">
        <SelectValue placeholder="Todos los lugares" defaultValue="all" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos los lugares</SelectItem>
        {places?.map((place) => (
          <SelectItem key={place.sys.id} value={place.fields.slug}>
            {place.fields.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
