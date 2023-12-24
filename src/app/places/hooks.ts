import { useQuery } from "@tanstack/react-query";

import { getPlaces } from "./services";

export function usePlaces() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["places"],
    queryFn: () => getPlaces(),
    initialData: [],
  });

  return {
    places: data,
    isLoadingPlaces: isLoading || isFetching,
  };
}
