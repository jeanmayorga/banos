import { useQuery } from "@tanstack/react-query";

import { getPlaces } from "./actions";

export function usePlaces() {
  return useQuery({
    queryKey: ["places"],
    queryFn: () => getPlaces(),
  });
}
