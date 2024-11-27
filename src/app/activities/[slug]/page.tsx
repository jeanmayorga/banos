import { CircleDollarSignIcon, Clock3Icon, EditIcon, MapPinIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { isProduction } from "@/api/contentful";
import ScrollUp from "@/components/ScrollUp";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/get-image-url";
import { cn } from "@/utils";

import { Breadcrumds } from "#/components/Breadcrumb";
import { Container } from "#/components/container";
import { Typography } from "#/components/ui/typography";

import { getActivityBySlug, getAllActivities } from "../actions";
import { BlockDescription } from "../components/BlockDescription";
import { BlockGoogleMaps } from "../components/BlockGoogleMaps";
import { BlockImages } from "../components/BlockImages";
import { BlockYoutubeVideo } from "../components/BlockYoutubeVideo";
import { BuyTicketsForm } from "../components/BuyTicketsForm";
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
  const activities = await getAllActivities({ limit: 1000 });

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

  const adultPrice = activity.fields.adultPrice;
  const priceInUsd = `$${activity.fields.adultPrice?.toFixed(2)} USD`;

  const canBuyTickets = activity.fields.buyCtaEnabled;

  return (
    <>
      <ScrollUp />
      <Container>
        <div className="gap-8 md:my-40 md:grid md:grid-cols-2">
          <div>
            <BlockImages images={images} />
          </div>
          <div>
            <section className="mb-8">
              <h1 className="mb-4 scroll-m-20 text-balance text-center text-5xl font-bold tracking-tight lg:text-5xl">
                {activity.fields.title}
              </h1>
              <Typography
                variant="muted"
                component="p"
                className="text-balance text-center text-xs"
              >
                {activity.fields.seoKeywords}
              </Typography>
            </section>
            <div className="mb-8 flex items-center justify-center text-sm">
              {activity.fields.openAt && activity.fields.closeAt && (
                <div className="flex min-w-24 flex-col items-center border-r px-4">
                  <Clock3Icon className="mb-3 h-6 w-6 text-[#00a7ac]" />
                  <span className="font-semibold text-[#007276]">
                    {activity.fields.openAt} - {activity.fields.closeAt}
                  </span>
                </div>
              )}
              {activity.fields.adultPrice && (
                <div className="flex min-w-24 flex-col items-center border-r px-4">
                  <CircleDollarSignIcon className="mb-3 h-6 w-6 text-[#00a7ac]" />
                  <span className="font-semibold text-[#007276]">$ {adultPrice} USD</span>
                </div>
              )}
              {activity.fields.place && (
                <div className="flex min-w-24 flex-col items-center px-4">
                  <MapPinIcon className="mb-3 h-6 w-6 text-[#00a7ac]" />
                  <span className="font-semibold text-[#007276]">
                    {activity.fields.place?.fields.title}
                  </span>
                </div>
              )}
            </div>
            <div className="lg mb-8 flex justify-center space-x-2">
              {/* <a
                href={`https://api.whatsapp.com/send?phone=593962975512&text=Hola, quiero que edites esta pagina: https://banos.app/activities/${activity?.fields.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full" variant="outline">
                  <EditIcon className="mr-1 h-6 w-4 text-muted-foreground" />
                  Editar
                </Button>
              </a> */}
              <SaveButton id={activity.sys.id} />
              <ShareButton />
            </div>

            <BlockDescription document={description} />
            <BlockGoogleMaps location={location} />
            <BlockYoutubeVideo youtubeVideo={youtubeVideo} />
          </div>
        </div>
      </Container>
    </>
  );
}
