"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { ActivityCard } from "#/components/ActivityCard";
import { ActivityCardLoading } from "#/components/ActivityCardLoading";

import { GetActivitiesOptions, getActivities } from "../services";
import { Activity } from "../types";

export default function InfiniteScrollActivities({
  options,
  initialData,
}: {
  options: GetActivitiesOptions;
  initialData: Activity[];
}) {
  const [ref, inView] = useInView();

  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["activities"],
    initialData: { pages: [initialData], pageParams: [0] },
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getActivities({ page: pageParam, ...options }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
      {(isFetching || isLoading) &&
        Array.from(Array(12).keys()).map((item) => <ActivityCardLoading key={item} />)}
      <div ref={ref} />
    </>
  );
}
