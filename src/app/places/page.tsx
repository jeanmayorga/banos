import { Entry } from "contentful";
import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/container";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { TypePlacesSkeleton } from "@/contentful";

import { getAllActivities } from "../activities/actions";
import { Card } from "../activities/components/Card";

import { getPlaces } from "./actions";

export default async function Page() {
  const places = await getPlaces();

  return (
    <>
      <Container className="mt-24">
        <Typography variant="h1" component="h1" className="mb-2">
          Lugares
        </Typography>

        <Typography variant="muted" component="p" className="mb-4">
          Un lugar donde encuentras varias actividades
        </Typography>

        <div className="mb-8 rounded-3xl bg-white p-4 shadow-sm">
          <Suspense>
            <Search />
          </Suspense>
        </div>

        <div>
          {places.map((place) => (
            <PlacesActivities place={place} key={place.sys.id} />
          ))}
        </div>
      </Container>
    </>
  );
}

async function PlacesActivities(props: {
  place: Entry<TypePlacesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
}) {
  const place = props.place;
  const activities = await getAllActivities({ limit: 3, byPlaceSlug: place.fields.slug });

  if (activities.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-3xl font-medium">{place.fields.title}</h2>
        <Link href={`/places/${place.fields.slug}`}>
          <Button className="rounded-full" variant="default" size="sm">
            Ver todos
          </Button>
        </Link>
      </div>
      <div className="gap-4 md:grid md:grid-cols-3">
        {activities.map((activity, idx) => (
          <Card key={activity.fields.slug} activity={activity} idx={idx} />
        ))}
      </div>
    </div>
  );
}
