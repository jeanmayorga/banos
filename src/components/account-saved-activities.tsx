"use client";
import { useQuery } from "@tanstack/react-query";

import { getActivities } from "@/app/activities/actions";
import { Card } from "@/app/activities/components/Card";
import { getActivitiesIdsSaved } from "@/app/activities/hooks/useActivitySave";

import { ActivitiesListSkeleton } from "./activities-list-skeleton";
import { H2 } from "./h2";

export function AccountSavedActivities() {
  const { isFetching, data } = useQuery({
    initialData: [],
    queryKey: ["saved-activities"],
    refetchOnWindowFocus: false,
    queryFn: () => {
      const byIds = getActivitiesIdsSaved();

      return getActivities({
        limit: 8,
        page: 0,
        byIds,
      });
    },
  });

  if (data.length === 0 && !isFetching) return null;

  return (
    <div className="mb-16">
      <H2 className="mb-8">Tus actividades guardadas</H2>

      <div className="mb-24 grid grid-cols-2 gap-4 md:grid-cols-4">
        {isFetching ? (
          <ActivitiesListSkeleton count={8} />
        ) : (
          data.map((activity, idx) => (
            <Card key={activity.fields.slug} activity={activity} idx={idx} />
          ))
        )}
      </div>
    </div>
  );
}
