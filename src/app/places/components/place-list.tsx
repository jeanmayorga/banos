import Link from "next/link";

// import { GetActivitiesOptions, getActivities } from "#/app/activities/services";
// import { ActivityCard } from "#/components/ActivityCard";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";

import { Place } from "../types";

interface Props {
  place: Place;
}
export async function PlaceList({ place }: Props) {
  // const options: GetActivitiesOptions = {
  //   placeId: place.id,
  //   limit: 6,
  // };
  // const activities = await getActivities(options);

  return (
    <div className="border-b border-slate-100 py-8 last-of-type:border-b-0">
      <div className="mb-8">
        <Link href={`/places/${place.slug}`} passHref>
          <Typography variant="h2">{place.name}</Typography>
        </Link>
        <Typography variant="muted">{place.description}</Typography>
      </div>

      <div
        // key={JSON.stringify(options)}
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
      >
        {/* {activities.map((activity, idx) => (
          <ActivityCard key={activity.id} idx={idx} activity={activity} />
        ))} */}
      </div>
      <div className="pt-4">
        <Link href={`/places/${place.slug}`} passHref>
          <Button>Ver todos</Button>
        </Link>
      </div>
    </div>
  );
}
