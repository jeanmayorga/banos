import { Metadata } from "next";

import { ActivityFilters } from "#/components/ActivityFilters";
import { JumboHome } from "#/components/JumboHome";
import { Logo } from "#/components/Logo";
import { Nav, NavItems } from "#/components/Nav";
import { Typography } from "#/components/ui/typography";

import InfiniteScrollActivities from "./activities/components/infinity-scroll-activities";
import { getActivities, GetActivitiesOptions } from "./activities/services";

// export const revalidate = 3600 / 60;

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
    activitySelect: ["id", "title", "price", "slug"],
    placeSelect: ["name"],
  };
  const activities = await getActivities(options);

  return (
    <>
      <div className="flex items-center justify-center py-8">
        <Logo className="text-rose-400" />
      </div>
      <Nav />
      <JumboHome activities={activitiesJumbo} />

      <div className="container mx-auto py-16">
        <Typography variant="h2" component="h1">
          Que hacer en Banos Ecuador
        </Typography>
        <Typography variant="muted" className="mb-8">
          En la ciudad de Banos de agua santa tienes muchas atracciones turisticas.
        </Typography>
        <ActivityFilters />
        <div
          key={JSON.stringify(options)}
          className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <InfiniteScrollActivities initialData={activities} options={options} />
        </div>
      </div>
    </>
  );
}
