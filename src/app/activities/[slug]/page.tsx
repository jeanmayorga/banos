import { CircleDollarSignIcon, Clock3Icon, PersonStandingIcon } from "lucide-react";
import { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";

import { isProduction } from "@/api/contentful";
import ScrollUp from "@/components/ScrollUp";
import { getImageUrl } from "@/lib/get-image-url";

import { Breadcrumds } from "#/components/Breadcrumb";
import { Container } from "#/components/container";
import { Typography } from "#/components/ui/typography";

import { getActivityBySlug, getActivities } from "../actions";
import { BlockDescription } from "../components/BlockDescription";
import { BlockGoogleMaps } from "../components/BlockGoogleMaps";
import { BlockImages } from "../components/BlockImages";
import { BlockPurchase } from "../components/BlockPurchase";
import { BlockYoutubeVideo } from "../components/BlockYoutubeVideo";

export const dynamicParams = true;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivityBySlug(params.slug);
  if (!activity) return notFound();

  const title = `${activity.fields.title} | Baños de agua santa | Ecuador`;
  const description = activity.fields.seoDescription;
  const keywords = activity?.fields.seoKeywords;
  const url = `https://banos.app/activities/${activity.fields.slug}`;
  const image = {
    url: getImageUrl(activity.fields.images[0]) || "",
    width: 1200,
    height: 630,
    alt: title,
  };
  const author = {
    name: "Jean Paul Mayorga",
    url: "https://jeanmayorga.com",
  };

  return {
    title,
    description,
    keywords,
    authors: [author],
    robots: isProduction ? "index, follow" : "noindex, nofollow",
    openGraph: {
      url,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  const activities = await getActivities({ limit: 1000 });
  return activities.map((activity) => ({ slug: activity.fields.slug }));
}

export default async function Page({ params }: Props) {
  const activity = await getActivityBySlug(params.slug);
  if (!activity) return notFound();

  const title = activity.fields.title;
  const place = activity.fields.place;
  const tiktokVideoId = activity.fields.tiktokVideoId;
  const images = activity.fields.images;
  const description = activity.fields.description;
  const location = activity.fields.location;
  const youtubeVideo = activity.fields.youtubeVideo;

  const adultPrice = activity.fields.adultPrice;
  const childPrice = activity.fields.childPrice;

  const isPurchaseEnabled = activity.fields.isPurchaseEnabled;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    image: getImageUrl(activity.fields.images[0]),
    description: activity.fields.seoDescription,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: adultPrice?.toFixed(2),
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollUp />
      <Container className="md:my-24">
        <Breadcrumds
          className="mb-0"
          items={[
            {
              text: "Actividades",
              href: `/activities`,
            },
            {
              text: place?.fields.title,
              href: `/places/${place?.fields.slug}`,
            },
            {
              text: activity.fields.title,
              href: `/activities/${activity.fields.slug}`,
            },
          ]}
        />
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
        {/* <SaveButton id={activity.sys.id} /> */}
        {/* <ShareButton /> */}
        <div className="gap-16 md:mb-4 md:grid md:grid-cols-2">
          <div>
            <BlockImages images={images} tiktokVideoId={tiktokVideoId} />
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

            <div className="no-scrollbar mb-8 flex items-start justify-center overflow-x-auto text-center text-sm">
              {activity.fields.openAt && activity.fields.closeAt && (
                <div className="flex min-w-32 flex-col items-center border-r">
                  <Clock3Icon className="mb-3 h-6 w-6 text-[#00a7ac]" />
                  <span className="font-semibold text-[#007276]">
                    {activity.fields.openAt} - {activity.fields.closeAt}
                  </span>
                  <span className="block text-xs font-light text-[#007276]">horario</span>
                </div>
              )}
              {activity.fields.adultPrice && (
                <div className="flex min-w-32 flex-col items-center border-r">
                  <CircleDollarSignIcon className="mb-3 h-6 w-6 text-[#00a7ac]" />
                  <span className="font-semibold text-[#007276]">
                    $ {adultPrice?.toFixed(2)} USD
                  </span>
                  <span className="block text-xs font-light text-[#007276]">adultos</span>
                </div>
              )}
              {activity.fields.childPrice && (
                <div className="flex min-w-32 flex-col items-center">
                  <PersonStandingIcon className="mb-3 h-6 w-6 text-[#00a7ac]" />
                  <span className="font-semibold text-[#007276]">
                    $ {childPrice?.toFixed(2)} USD
                  </span>
                  <span className="block text-xs font-light text-[#007276]">niños</span>
                </div>
              )}
              {/* {activity.fields.place && (
                <div className="flex min-w-32 flex-col items-center">
                  <MapPinIcon className="mb-3 h-6 w-6 text-[#00a7ac]" />
                  <span className="font-semibold text-[#007276]">
                    {activity.fields.place?.fields.title}
                  </span>
                </div>
              )} */}
            </div>

            {isPurchaseEnabled && <BlockPurchase activity={activity} />}

            <BlockDescription document={description} />
            <BlockYoutubeVideo youtubeVideo={youtubeVideo} />
          </div>
        </div>
        <BlockGoogleMaps location={location} />
      </Container>
    </>
  );
}
