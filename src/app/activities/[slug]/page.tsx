import { Clock4Icon, MapPinIcon, MonitorStopIcon, ParkingCircle, SearchIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ActivityContent } from "#/components/ActivityContent";
import { ActivityCtaForm } from "#/components/ActivityCtaForm";
import { ActivityPhotos } from "#/components/ActivityPhotos";
import { BackButton } from "#/components/back-button";
import { Breadcrumds } from "#/components/Breadcrumb";
import { Container } from "#/components/container";
import { GoogleMapsDynamic } from "#/components/GoogleMapsDynamic";
import { ShareButton } from "#/components/ShareButton";
import { Separator } from "#/components/ui/separator";
import { Typography } from "#/components/ui/typography";

import { getActivities, getActivity, updateActivity } from "../services";

export const revalidate = 3600;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivity({ slug: params.slug });

  return {
    metadataBase: new URL("https://banos.app/"),
    alternates: {
      canonical: `/activities/${activity?.slug}`,
    },
    title: `${activity?.title} | Baños de agua santa | Ecuador`,
    description: activity?.description,
    applicationName: "Banos de agua santa",
    keywords: activity?.keywords,
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: `https://banos.app/activities/${activity?.slug}`,
      title: `${activity?.title} | Baños de agua santa | Ecuador`,
      description: activity?.description,
      siteName: "Banos de Agua Santa",
      images: activity?.photos?.map((photo) => ({
        url: `https://res.cloudinary.com/da3uyv9xp/image/upload/f_auto,c_limit,w_1080,q_auto/${photo.path}`,
      })),
    },
  };
}

export async function generateStaticParams() {
  const activities = await getActivities({ limit: 200 });

  return activities.map((activity) => ({ slug: activity.slug }));
}

export default async function Page({ params }: Props) {
  const activity = await getActivity({ slug: params.slug });
  if (!activity || !activity.is_active) return notFound();

  const photos = activity.photos || [];
  await updateActivity({ slug: params.slug, visits: Number(activity.visits) + 1 });

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
              text: activity.place.name,
              href: `/places/${activity.place.slug}`,
            },
            {
              text: activity.title,
              href: `/activities/${activity.slug}`,
            },
          ]}
        />

        <div className="mb-6">
          <Typography variant="h1" component="h1" className="mb-2">
            {activity.title}
          </Typography>

          <Typography variant="muted" component="h2" className="mb-2">
            {activity.title} en {activity.place.name}, Banos, Ecuador
          </Typography>
        </div>
      </Container>

      <section className="relative mb-8 w-full overflow-hidden bg-gray-800 py-12">
        <Image
          src={photos[0].path}
          alt="cover blur"
          height={190}
          width={250}
          quality={40}
          className="absolute left-0 top-0 h-full w-full scale-150 blur-xl transition-all"
        />
        <Container className="relative">
          <ActivityPhotos photos={photos} />
        </Container>
      </section>

      <Container>
        <article>
          <Typography variant="h4" component="h2" className="mb-4">
            Descripción
          </Typography>
          <ActivityContent content={activity.body} />
        </article>
      </Container>
    </>
  );
}
