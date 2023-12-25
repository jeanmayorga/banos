import { Metadata } from "next";

import { ActivityCard } from "#/components/ActivityCard";
import { Typography } from "#/components/ui/typography";

import { getActivities } from "./services";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Que hacer en Banos de Agua Santa | Ecuador",
  metadataBase: new URL("https://banos.app"),
  alternates: {
    canonical: "/",
  },
  description: "Aqui tienes una lista de actividades para hacer en Banos de agua santa Ecuador",
  applicationName: "Banos de agua santa app",
  keywords: "que hacer en banos, ecuador, banos de agua santa, actividades, fotos",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: `https://banos.app/activities`,
    title: "Que hacer en Banos de Agua Santa | Ecuador",
    description: "Aqui tienes una lista de actividades para hacer en Banos de agua santa Ecuador",
    siteName: "Banos app",
    images: [
      {
        url: "",
      },
    ],
  },
};

interface Props {
  searchParams: {
    sortBy: string;
    sortOrder: string;
  };
}
export default async function Page({ searchParams }: Props) {
  const activities = await getActivities({
    sortBy: searchParams?.sortBy || "visits",
    sortOrder: searchParams?.sortOrder || "desc",
    isActive: true,
  });

  return (
    <>
      <div className="container mx-auto py-16">
        <div className="mb-12">
          <Typography variant="h2" component="h1">
            Que hacer en Banos Ecuador
          </Typography>
          <Typography variant="muted">
            En la ciudad de Banos de agua santa tienes muchas atracciones turisticas.
          </Typography>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </>
  );
}
