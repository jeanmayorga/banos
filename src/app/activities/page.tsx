import { Metadata } from "next";

import { ActivityCard } from "#/components/ActivityCard";
import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";
import { Typography } from "#/components/ui/typography";

import { getActivities } from "./services";

export const revalidate = 3600 / 60;

export const metadata: Metadata = {
  title: "Actividades en Banos de Agua Santa | Ecuador",
};

export default async function Page() {
  const activities = await getActivities({});
  return (
    <>
      <Header />
      <Nav />

      <div className="container mx-auto py-8">
        <Typography variant="h2" component="h1" className="mb-4">
          Actividades
        </Typography>
        <div className="grid sm:grid-cols-4 gap-4">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </>
  );
}
