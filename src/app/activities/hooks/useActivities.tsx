import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";

import { getAllActivities } from "../actions";

import { getActivitiesIdsSaved } from "./useActivitySave";

export function useActivities() {
  const [tab] = useQueryState("tab", parseAsString);
  const [query] = useQueryState("query", parseAsString);

  const result = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["activities", tab, query],
    queryFn: async () => {
      let activities = await getAllActivities();

      if (query) {
        activities = activities.filter((activity) =>
          activity.fields.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      if (tab === "saved") {
        const activitiesIdsSaved = getActivitiesIdsSaved();
        activities = activities.filter((activity) => activitiesIdsSaved.includes(activity.sys.id));
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