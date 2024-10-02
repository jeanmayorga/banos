import { ActivityFilters } from "#/components/ActivityFilters";
import { Typography } from "#/components/ui/typography";
import { cn } from "#/utils";

import InfiniteScrollActivities from "../activities/components/infinity-scroll-activities";
import { getActivities, GetActivitiesOptions } from "../activities/services";

export default async function Page() {
  const activitiesJumbo = await getActivities({
    limit: 5,
    sortBy: "visits",
  });

  const options: GetActivitiesOptions = {
    isActive: true,
    activitySelect: ["id", "title", "price", "slug"],
    placeSelect: ["name"],
  };
  const activities = await getActivities(options);
  return (
    <>
      <div className="container mx-auto py-8">
        <div className={cn("relative mb-2 h-[500px] overflow-hidden rounded-[40px] bg-black")}>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50" />
          <div className="relative z-20 mx-8 flex h-full w-full items-center">
            <div className="container mx-auto py-16 text-center">
              <Typography
                variant="h1"
                component="h1"
                className="mb-4 text-6xl text-white drop-shadow-md"
              >
                ¿Donde comer en Banos de agua santa?
              </Typography>
              <p className="mb-8 text-lg leading-tight text-gray-100">
                Recomendaciones de restaurantes y estilo de vida por Foodies guayaquileños.
              </p>
            </div>
          </div>
          <div className="z-0">
            {/* <Image
              alt={activity.photos?.[0].alt || ""}
              src={activity.photos?.[0].path || ""}
              width={1000}
              height={500}
              className="absolute top-0 object-cover h-full w-full"
            /> */}
          </div>
          <iframe
            className="absolute left-1/2 top-1/2 h-[180%] w-[150%] -translate-x-1/2 -translate-y-1/2"
            src={`https://www.youtube.com/embed/_HW26Ao2A9M?&autoplay=1&mute=1&playlist=_HW26Ao2A9M&loop=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <ActivityFilters />
        <div className="rounded-xl bg-white p-4">
          <div
            key={JSON.stringify(options)}
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
          >
            <InfiniteScrollActivities initialData={activities} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
