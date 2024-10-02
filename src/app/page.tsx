import { SearchIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ActivityFilters } from "#/components/ActivityFilters";
import { JumboHome } from "#/components/JumboHome";
import { Logo } from "#/components/Logo";
import { Nav, NavItems } from "#/components/Nav";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";

import InfiniteScrollActivities from "./activities/components/infinity-scroll-activities";
import { getActivities, GetActivitiesOptions } from "./activities/services";
import { Activity } from "./activities/types";

// export const revalidate = 3600 / 60;

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="relative aspect-video h-full w-full overflow-hidden rounded-xl">
      <Image
        src={activity?.photos?.[0].path || ""}
        width={270}
        height={270}
        quality={90}
        className="absolute left-1/2 top-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity"
        alt={activity?.title}
      />
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-black/60" />
      <div className="absolute bottom-0 z-20 p-8">
        <Typography variant="h2" component="h3" className="text-white">
          {activity?.title}
        </Typography>
        <Typography variant="muted" className="text-gray-300">
          {activity?.description}
        </Typography>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Banos de Agua Santa | Ecuador",
};

interface Props {
  searchParams: {
    sortBy: string;
    sortOrder: string;
    search: string;
  };
}

export default async function Page({ searchParams }: Props) {
  // const currentDate = getCurrentDate();
  // const { data: eventsData } = await supabase
  //   .from("events")
  //   .select("*")
  //   .order("time")
  //   .eq("date", currentDate);
  // const events = eventsData as Event[];

  const activitiesJumbo = await getActivities({
    limit: 5,
    sortBy: "visits",
  });

  const options: GetActivitiesOptions = {
    sortBy: searchParams?.sortBy,
    sortOrder: searchParams?.sortOrder,
    search: searchParams?.search,
    isActive: true,
    activitySelect: ["id", "title", "price", "slug", "description"],
    placeSelect: ["name"],
  };
  const activities = await getActivities(options);

  return (
    <>
      <div className="container mx-auto py-8">
        <Link
          href="/search"
          passHref
          prefetch
          className="relative mb-8 hidden w-[390px] rounded-full border border-gray-200 bg-white px-2 py-[6px] shadow-sm transition-all hover:w-[490px] hover:shadow-md sm:flex sm:items-center sm:justify-between dark:border-gray-700"
        >
          <span className="ml-3 text-sm font-medium text-gray-500">¿Qué hacer en Banos?</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white">
            <SearchIcon className="h-3 w-3" strokeWidth={4} />
          </div>
        </Link>
        <JumboHome activities={activitiesJumbo} />
        <section className="my-16">
          <Typography variant="h2" component="h2" className="mb-8 pb-0 text-center text-5xl">
            Principales lugares turísticos de Guayaquil
          </Typography>
          <div className="mb-8 grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <ActivityItem activity={activities?.[0]} />
            </div>
            <div className="col-span-1">
              <ActivityItem activity={activities?.[1]} />
            </div>
            <div className="col-span-1">
              <ActivityItem activity={activities?.[2]} />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button className="rounded-full" variant="outline">
              Ver todos
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
