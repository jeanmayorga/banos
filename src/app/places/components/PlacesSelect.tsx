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
  const [place, setPlace] = useQueryState("place", {
    shallow: false,
    defaultValue: "all",
    clearOnDefault: true,
  });
  const { data: places } = useQuery({
    queryKey: ["places"],
    queryFn: () => getPlaces(),
  });

  return (
    <Select onValueChange={(e) => setPlace(e)} defaultValue={place}>
      <SelectTrigger className="mb-0">
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
