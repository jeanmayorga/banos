import { HeartIcon, MapPinIcon, ShareIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Breadcrumds } from "#/components/Breadcrumb";
import { Container } from "#/components/container";
import { Typography } from "#/components/ui/typography";

import { getActivityBySlug, getAllActivities } from "../actions";
import { BlockDescription } from "../components/BlockDescription";
import { BlockGoogleMaps } from "../components/BlockGoogleMaps";
import { BlockImages } from "../components/BlockImages";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivityBySlug(params.slug);
  const title = `${activity?.fields.title} | Baños de agua santa | Ecuador`;
  const description = "";
  const url = `https://banos.app/activities/${activity?.fields.slug}`;

  function generateImages() {
    const images = activity?.fields.images;
    return images?.map((image) => ({
      url: `https:${image?.fields.file?.url}`,
      width: image?.fields.file?.details.image?.width,
      height: image?.fields.file?.details.image?.height,
      alt: title,
    }));
  }

  const images = generateImages();

  return {
    title,
    applicationName: "Banos de Agua Santa | Ecuador",
    description,
    keywords: activity?.fields.keywords,
    authors: [
      {
        name: "Jean Paul Mayorga",
        url: "https://jeanmayorga.com",
      },
    ],
    robots: "index, follow",
    openGraph: {
      siteName: "Guayaquil",
      title: title,
      description,
      url,
      type: "website",
      images,
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const activities = await getAllActivities();

  return activities.map((activity) => ({ slug: activity.fields.slug }));
}

export default async function Page({ params }: Props) {
  const activity = await getActivityBySlug(params.slug);

  if (!activity) return notFound();

  const place = activity.fields.place;
  const images = activity.fields.images;
  const description = activity.fields.description;
  const location = activity.fields.location;

  // increaseActivityVisit(activity.sys.id);

  return (
    <>
      <Container>
        <Breadcrumds
          items={[
            {
              text: "Banos",
              href: "/",
            },
            {
              text: "Actividades",
              href: `/activities`,
            },
            {
              text: place?.fields.title,
              href: `/places/${place?.fields.title}`,
            },
            {
              text: activity.fields.title,
              href: `/activities/${activity.fields.slug}`,
            },
          ]}
        />

        <div className="mb-4 lg:flex lg:items-end lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <Typography variant="h1" component="h1" className="mb-2">
              {activity.fields.title}
            </Typography>

            <div className="flex items-center">
              <MapPinIcon className="mr-1 h-6 w-4 text-muted-foreground" />
              <Typography variant="muted" component="h2">
                {activity.fields.title}, {place?.fields.title}, Banos, Ecuador
              </Typography>
            </div>
          </div>
          <div className="lg flex space-x-2">
            <Button className="rounded-full" variant="outline">
              <ShareIcon className="mr-1 h-6 w-4 text-muted-foreground" />
              Compartir
            </Button>
            <Button className="rounded-full" variant="outline">
              <HeartIcon className="mr-1 h-6 w-4 text-muted-foreground" />
              Guardar
            </Button>
          </div>
        </div>
      </Container>

      <BlockImages images={images} />

      <BlockDescription document={description} />

      <BlockGoogleMaps location={location} />
    </>
  );
}
