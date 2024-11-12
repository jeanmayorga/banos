import { useQuery } from "@tanstack/react-query";

import { getAllActivities } from "../actions";

interface Options {
  query?: string;
}

export function useActivities({ query }: Options) {
  const result = useQuery({
    queryKey: ["activities", query],
    queryFn: async () => {
      let activities = await getAllActivities();

      if (query) {
        activities = activities.filter((activity) =>
          activity.fields.title.toLowerCase().includes(query),
        );
      }

      return activities;
    },
    initialData: [],
  });

  return {
    isLoading: result.isFetching || result.isLoading || result.isPending,
    activities: result.data,
  };
}
