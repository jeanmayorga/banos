"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { GetActivityOptionsTab, getActivities } from "@/app/activities/actions";
import { Card } from "@/app/activities/components/Card";
import { DEFAULT_LIMIT_ITEMS } from "@/app/activities/config";
import { getActivitiesIdsSaved } from "@/app/activities/hooks/useActivitySave";
import { useObserver } from "@/hooks/useObserver";

import { ActivitiesListSkeleton } from "./activities-list-skeleton";

interface Props {
  searchParams: {
    tab?: string;
    query?: string;
    place?: string;
  };
  // initialData: Activity[];
}
export function ActivitiesList({ searchParams }: Props) {
  const { data, isFetching, isRefetching, refetch, fetchNextPage } = useInfiniteQuery({
    // initialData: () => {
    //   return {
    //     pageParams: [1],
    //     pages: [initialData],
    //   };
    // },
    queryKey: ["activities"],
    queryFn: (options) => {
      const limit = DEFAULT_LIMIT_ITEMS;
      const page = options.pageParam;
      const query = searchParams.query;
      const tab = searchParams.tab;
      const place = searchParams.place;

      const byTab = tab as GetActivityOptionsTab;
      const byIds = tab === "saved" ? getActivitiesIdsSaved() : undefined;
      const byPlaceSlug = place !== "all" ? place : undefined;

      return getActivities({
        limit,
        page,
        query,
        byTab,
        byIds,
        byPlaceSlug,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false,
  });
  const { isIntersecting, ref } = useObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting) fetchNextPage();
  }, [isIntersecting, fetchNextPage]);

  useEffect(() => {
    if (searchParams) refetch();
  }, [searchParams, refetch]);

  return (
    <div className="mb-24 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {isRefetching && <ActivitiesListSkeleton count={DEFAULT_LIMIT_ITEMS} />}
      {data?.pages
        .flat()
        .map((activity, idx) => <Card key={activity.fields.slug} activity={activity} idx={idx} />)}
      {isFetching && <ActivitiesListSkeleton count={DEFAULT_LIMIT_ITEMS} />}
      <div ref={ref} />
    </div>
  );
}
