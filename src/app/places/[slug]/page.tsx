import { getActivities } from "@/app/activities/actions";
import { Card } from "@/app/activities/components/Card";
import { Container } from "@/components/container";
import ScrollUp from "@/components/ScrollUp";
import { Typography } from "@/components/ui/typography";

import { getPlaceBySlug } from "../actions";

interface Props {
  params: {
    slug: string;
  };
}
export default async function Page({ params }: Props) {
  const slug = params.slug;

  const place = await getPlaceBySlug(slug);
  const activities = await getActivities({ limit: 3, byPlaceSlug: slug });

  return (
    <>
      <ScrollUp />
      <Container className="mt-12 md:mt-24">
        <Typography variant="h1" component="h1" className="text-4xl text-gray-700 md:text-5xl">
          {place.fields.title}
        </Typography>
        <Typography variant="lead" component="h2" className="mb-4 text-base">
          ({activities.length}) actividades
        </Typography>

        <div className="mb-24 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {activities.map((activity, idx) => (
            <Card key={activity.fields.slug} activity={activity} idx={idx} />
          ))}
        </div>
      </Container>
    </>
  );
}
