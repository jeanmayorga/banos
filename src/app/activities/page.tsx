import { SearchIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { ActivityFilters } from "#/components/ActivityFilters";
import { Container } from "#/components/container";
import { Search } from "#/components/search";
import { Typography } from "#/components/ui/typography";

import InfiniteScrollActivities from "./components/infinity-scroll-activities";
import { GetActivitiesOptions, getActivities } from "./services";

import { BackButton } from "@/components/back-button";
import { GoBackButton } from "@/components/go-back-button";

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
    search: string;
  };
}
export default async function Page({ searchParams }: Props) {
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
    <Container>
      <BackButton to="/" />
      <Typography variant="h2" component="h1" className="mb-4">
        ¿Qué hacer en Baños?
      </Typography>
      {/* <Typography variant="muted" component="p" className="mb-8">
        Descubre las mejores aventuras y actividades en el corazón de la naturaleza.
      </Typography> */}
      <Search placeholder="Buscar actividades..." />
      <ActivityFilters />
      <div
        key={JSON.stringify(options)}
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        <InfiniteScrollActivities initialData={activities} options={options} />
      </div>
    </Container>
  );
}
