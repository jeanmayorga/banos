"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useObserver } from "@/hooks/useObserver";

import { getActivities, GetActivityOptionsTab } from "../actions";
import { DEFAULT_LIMIT_ITEMS } from "../config";
import { getActivitiesIdsSaved } from "../hooks/useActivitySave";

import { Card } from "./Card";
import { ListActivitiesSkeleton } from "./ListActivitiesSkeleton";

interface Props {
  searchParams: {
    tab?: string;
    query?: string;
    place?: string;
  };
  // initialData: Activity[];
}
export function ListActivities({ searchParams }: Props) {
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
    <div className="mb-24 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {isRefetching && <ListActivitiesSkeleton />}
      {data?.pages
        .flat()
        .map((activity, idx) => <Card key={activity.fields.slug} activity={activity} idx={idx} />)}
      {isFetching && <ListActivitiesSkeleton />}
      <div ref={ref} />
    </div>
  );
}
