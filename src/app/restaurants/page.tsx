import { SearchIcon } from "lucide-react";
import Link from "next/link";

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
        <Link
          href="/search"
          passHref
          prefetch
          className="sm:flex sm:justify-between sm:items-center shadow-sm hover:shadow-md hidden relative w-[390px] hover:w-[490px] border border-gray-200 dark:border-gray-700 rounded-full px-2 py-[6px] transition-all bg-white mb-8"
        >
          <span className="ml-3 font-medium text-sm text-gray-500">¿Qué hacer en Banos?</span>
          <div className="rounded-full bg-rose-500 w-8 h-8 flex items-center justify-center text-white">
            <SearchIcon className="h-3 w-3" strokeWidth={4} />
          </div>
        </Link>

        <div className={cn("relative overflow-hidden bg-black h-[500px] rounded-[40px] mb-2")}>
          <div className="bg-black/50 absolute top-0 left-0 w-full h-full z-10" />
          <div className="relative z-20 flex items-center w-full h-full mx-8">
            <div className="container mx-auto py-16 text-center">
              <Typography
                variant="h1"
                component="h1"
                className="text-white drop-shadow-md text-6xl mb-4"
              >
                ¿Donde comer en Banos de agua santa?
              </Typography>
              <p className="text-lg text-gray-100 mb-8 leading-tight">
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
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[150%] h-[180%]"
            src={`https://www.youtube.com/embed/_HW26Ao2A9M?&autoplay=1&mute=1&playlist=_HW26Ao2A9M&loop=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <ActivityFilters />
        <div className="bg-white p-4 rounded-xl">
          <div
            key={JSON.stringify(options)}
            className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 "
          >
            <InfiniteScrollActivities initialData={activities} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
