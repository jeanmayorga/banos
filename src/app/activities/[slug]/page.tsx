import {
  CircleDollarSignIcon,
  Clock3Icon,
  DollarSignIcon,
  EditIcon,
  MapPinIcon,
} from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { isProduction } from "@/api/contentful";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/get-image-url";

import { Breadcrumds } from "#/components/Breadcrumb";
import { Container } from "#/components/container";
import { Typography } from "#/components/ui/typography";

import { getActivityBySlug, getAllActivities } from "../actions";
import { BlockDescription } from "../components/BlockDescription";
import { BlockGoogleMaps } from "../components/BlockGoogleMaps";
import { BlockImages } from "../components/BlockImages";
import { BlockYoutubeVideo } from "../components/BlockYoutubeVideo";
import { SaveButton } from "../components/SaveButton";

export const dynamicParams = true;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivityBySlug(params.slug);

  const title = `${activity?.fields.title} | Baños de agua santa | Ecuador`;
  const description = activity?.fields.seoDescription;
  const url = `https://banos.app/activities/${activity?.fields.slug}`;
  const images = [
    {
      url: getImageUrl(activity?.fields.images[0]) || "",
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  return {
    title,
    applicationName: "Banos de Agua Santa | Ecuador",
    description,
    keywords: activity?.fields.seoKeywords,
    authors: [
      {
        name: "Jean Paul Mayorga",
        url: "https://jeanmayorga.com",
      },
    ],
    robots: isProduction ? "index, follow" : "noindex, nofollow",
    openGraph: {
      siteName: "Banos de Agua Santa",
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
  const youtubeVideo = activity.fields.youtubeVideo;

  const priceInUsd = `$${activity.fields.adultPrice?.toFixed(2)} USD`;

  return (
    <>
      <Container>
        <div className="mb-4">
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
        </div>

        <section className="mb-8">
          <Typography variant="h1" component="h1">
            {activity.fields.title}
          </Typography>
          <Typography variant="muted" component="p">
            {activity.fields.seoDescription}
          </Typography>
        </section>

        <div className="mb-8 lg:flex lg:items-center lg:justify-between">
          <div className="mb-8 flex items-center text-sm lg:mb-0">
            {activity.fields.openAt && activity.fields.closeAt && (
              <div className="mr-3 flex flex-col border-r pr-3">
                <span className="flex items-center text-muted-foreground">
                  <Clock3Icon className="mr-1 h-4 w-4" />
                  Horario
                </span>
                <span className="ml-5 font-semibold">
                  {activity.fields.openAt} - {activity.fields.closeAt}
                </span>
              </div>
            )}
            {activity.fields.adultPrice && (
              <div className="mr-3 flex flex-col border-r pr-3">
                <span className="flex items-center text-muted-foreground">
                  <CircleDollarSignIcon className="mr-1 h-4 w-4" />
                  Precio
                </span>
                <span className="ml-5 font-semibold">{priceInUsd}</span>
              </div>
            )}
            {activity.fields.place && (
              <div className="flex flex-col">
                <span className="flex items-center text-muted-foreground">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  Lugar
                </span>
                <span className="ml-5 font-semibold">{activity.fields.place?.fields.title}</span>
              </div>
            )}
          </div>
          <div className="lg flex space-x-2">
            <a
              href={`https://api.whatsapp.com/send?phone=593962975512&text=Hola, quiero que edites esta pagina: https://banos.app/activities/${activity?.fields.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-full" variant="outline">
                <EditIcon className="mr-1 h-6 w-4 text-muted-foreground" />
                Editar
              </Button>
            </a>
            <SaveButton id={activity.sys.id} />
            <ShareButton />
          </div>
        </div>
      </Container>

      <BlockImages images={images} />

      <Container
      // className="lg:grid lg:grid-cols-6"
      >
        {/* <div className="col-span-4"> */}
        <BlockDescription document={description} />
        <BlockGoogleMaps location={location} />
        <BlockYoutubeVideo youtubeVideo={youtubeVideo} />
        {/* </div> */}
        {/* <div className="col-span-2">
          <div className="w-full rounded-xl text-foreground">
            <Typography>Desde {priceInUsd}</Typography>
          </div>
        </div> */}
      </Container>
    </>
  );
}
