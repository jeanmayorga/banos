import { EditIcon, MapPinIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { isProduction } from "@/api/contentful";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";

import { Breadcrumds } from "#/components/Breadcrumb";
import { Container } from "#/components/container";
import { Typography } from "#/components/ui/typography";

import { getActivityBySlug, getAllActivities } from "../actions";
import { BlockDescription } from "../components/BlockDescription";
import { BlockGoogleMaps } from "../components/BlockGoogleMaps";
import { BlockImages } from "../components/BlockImages";
import { BlockYoutubeVideo } from "../components/BlockYoutubeVideo";
import { SaveButton } from "../components/SaveButton";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivityBySlug(params.slug);

  const title = `${activity?.fields.title} | Baños de agua santa | Ecuador`;
  const description = (activity?.fields.description.content[0].content[0] as any)?.value;
  const url = `https://banos.app/activities/${activity?.fields.slug}`;
  const image = `https://banos.app/api/og?title=${activity?.fields.title}`;
  const images = [
    {
      url: image,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

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
    robots: isProduction ? "index, follow" : "noindex, nofollow",
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

// export async function generateStaticParams() {
//   const activities = await getAllActivities();

//   return activities.map((activity) => ({ slug: activity.fields.slug }));
// }

export default async function Page({ params }: Props) {
  const activity = await getActivityBySlug(params.slug);

  if (!activity) return notFound();

  const place = activity.fields.place;
  const images = activity.fields.images;
  const description = activity.fields.description;
  const location = activity.fields.location;
  const youtubeVideoUrl = activity.fields.youtubeVideoUrl;

  // increaseActivityVisitsById(activity.sys.id);

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

        <Typography variant="h1" component="h1" className="mb-2">
          {activity.fields.title}
        </Typography>
        <div className="mb-4 lg:flex lg:items-center lg:justify-between">
          <div className="mb-2 flex items-center lg:mb-0">
            <MapPinIcon className="mr-1 h-5 w-5 text-muted-foreground" />
            <Typography variant="p" component="h2">
              {activity.fields.title}, {place?.fields.title}, Banos, Ecuador
            </Typography>
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

      <BlockDescription document={description} />

      <BlockGoogleMaps location={location} />

      <BlockYoutubeVideo youtubeVideoUrl={youtubeVideoUrl} />
    </>
  );
}
