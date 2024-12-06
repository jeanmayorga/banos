"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";

import { Container } from "@/components/container";
import { Search } from "@/components/search";
import { Title } from "@/components/Title";
import { useObserver } from "@/hooks/useObserver";

import { PlacesSelect } from "../places/components/PlacesSelect";

import { getAllActivities } from "./actions";
import { Card } from "./components/Card";
import { CardSkeleton } from "./components/CardSkeleton";
import { Tabs } from "./components/Tabs";
import { getActivitiesIdsSaved } from "./hooks/useActivitySave";

const DEFAULT_LIMIT = 9;

interface Props {
  searchParams: {
    tab?: string;
    query?: string;
    place?: string;
  };
}
export default function Page({ searchParams }: Props) {
  const { data, isFetching, isRefetching, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ["activities", "1"],
    queryFn: (options) => {
      let ids: string[] = [];
      let order: string[] = [];

      if (searchParams.tab === "most-visited") {
        order = ["-fields.visits"];
      }
      if (searchParams.tab === "cheaper") {
        order = ["fields.adultPrice"];
      }
      if (searchParams.tab === "most-expensive") {
        order = ["-fields.adultPrice"];
      }
      if (searchParams.tab === "saved") {
        const idsSaved = getActivitiesIdsSaved();
        ids = idsSaved;
      }

      return getAllActivities({
        limit: DEFAULT_LIMIT,
        page: options.pageParam,
        ids,
        order,
        query: searchParams.query,
        byPlaceSlug: searchParams.place === "all" ? undefined : searchParams.place,
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
    if (searchParams) {
      refetch();
    }
  }, [searchParams, refetch]);

  return (
    <>
      <Container className="mt-12 md:mt-24">
        <Title
          title="Encuentra actividades"
          subtitle="Si estás en Baños y no sabes qué hacer, no te preocupes. Aqui te ayudamos."
        />

        <div className="mb-4 grid gap-4 rounded-3xl bg-white p-4 shadow-sm md:grid-cols-2">
          <Suspense>
            <Search />
            <PlacesSelect />
          </Suspense>
        </div>
        <div className="mb-4 rounded-3xl bg-white p-4 shadow-sm">
          <Suspense>
            <Tabs />
          </Suspense>
        </div>

        <div className="mb-24 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {isRefetching &&
            [...Array(DEFAULT_LIMIT).keys()].map((_number, idx) => <CardSkeleton key={idx} />)}
          {data?.pages.map((page) => {
            return page.map((activity, idx) => (
              <Card key={activity.fields.slug} activity={activity} idx={idx} />
            ));
          })}
          {isFetching &&
            [...Array(DEFAULT_LIMIT).keys()].map((_number, idx) => <CardSkeleton key={idx} />)}
        </div>

        <div ref={ref} />
      </Container>
    </>
  );
}
