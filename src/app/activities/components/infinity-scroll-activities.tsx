"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { ActivityCard } from "#/components/ActivityCard";

import { GetActivitiesOptions, getActivities } from "../services";
import { Activity } from "../types";

import { SkeletonCardList } from "./skeleton-cards";

export default function InfiniteScrollActivities({
  options,
  initialData = [],
}: {
  options?: GetActivitiesOptions;
  initialData?: Activity[];
}) {
  const [ref, inView] = useInView();

  const initialDataDefault: InfiniteData<Activity[], number> | undefined = {
    pages: [initialData],
    pageParams: [0],
  };

  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["activities", options],
    initialData: initialDataDefault,
    initialPageParam: 0,
    enabled: false,
    queryFn: ({ pageParam }) => getActivities({ page: pageParam, ...options }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0 || lastPage.length < 12) return undefined;

      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (inView && initialData.length >= 12) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, initialData.length]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((activity, idx) => (
            <ActivityCard key={activity.id} idx={idx} activity={activity} />
          ))}
        </Fragment>
      ))}
      {(isFetching || isLoading) && <SkeletonCardList limit={6} />}
      <div ref={ref} />
    </>
  );
}
