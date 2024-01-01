import { notFound } from "next/navigation";

import InfiniteScrollActivities from "#/app/activities/components/infinity-scroll-activities";
import { GetActivitiesOptions, getActivities } from "#/app/activities/services";
import { ActivityFilters } from "#/components/ActivityFilters";
import { Typography } from "#/components/ui/typography";

import { getPlace } from "../services";

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    sortBy: string;
    sortOrder: string;
    search: string;
  };
}

export default async function Page({ params, searchParams }: Props) {
  const place = await getPlace({ slug: params.slug });
  if (!place) return notFound();

  const options: GetActivitiesOptions = {
    placeId: place.id,
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
      <div className="container mx-auto py-16">
        <div className="mb-8">
          <Typography variant="h2">{place.name}</Typography>
          <Typography variant="muted">{place.description}</Typography>
        </div>

        <Typography variant="h3" className="mb-4">
          Actividades en {place.name}
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
