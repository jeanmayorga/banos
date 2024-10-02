import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import InfiniteScrollActivities from "#/app/activities/components/infinity-scroll-activities";
import { GetActivitiesOptions, getActivities } from "#/app/activities/services";
import { ActivityFilters } from "#/components/ActivityFilters";
import { Breadcrumds } from "#/components/Breadcrumb";
import { GoBackButton } from "#/components/go-back-button";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";

import { getPlace } from "../services";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const place = await getPlace({ slug: params.slug });

  return {
    metadataBase: new URL("https://banos.app"),
    alternates: {
      canonical: "/",
    },
    title: `${place?.name} | Baños de agua santa`,
    description: place?.description,
    applicationName: "Banos de agua santa app",
    keywords: place?.description,
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: `https://banos.app/places/${place?.slug}`,
      title: `${place?.name} | Baños de agua santa`,
      description: place?.description,
      siteName: "Banos app",
      images: [],
    },
  };
}

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
      <div className="container mx-auto py-8">
        <GoBackButton href="/places" />

        <Breadcrumds
          items={[
            {
              text: "Banos",
              href: "/",
            },
            {
              text: "Lugares",
              href: `/places`,
            },
            {
              text: place.name,
              href: `/places/${place.slug}`,
            },
          ]}
        />

        <div className="mb-8">
          <Typography variant="h2" className="mb-2">
            {place.name}
          </Typography>
          <Typography variant="muted">{place.description}</Typography>
        </div>

        <Typography variant="h3" className="mb-4">
          Actividades en {place.name}
        </Typography>
        <ActivityFilters />
        <div
          key={JSON.stringify(options)}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
        >
          <InfiniteScrollActivities initialData={activities} options={options} />
        </div>
      </div>
    </>
  );
}
