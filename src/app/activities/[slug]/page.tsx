import { Clock4Icon, MapPinIcon, MonitorStopIcon, ParkingCircle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ActivityCtaForm } from "#/components/ActivityCtaForm";
import { ActivityPhotos } from "#/components/ActivityPhotos";
import { ActivityPhotosLoading } from "#/components/ActivityPhotosLoading";
import { ActivityPhotosMansory } from "#/components/ActivityPhotosMansory";
import { Breadcrumds } from "#/components/Breadcrumb";
import { Markdown } from "#/components/Markdown";
import { ShareButton } from "#/components/ShareButton";
// import { Badge } from "#/components/ui/badge";
import { Separator } from "#/components/ui/separator";
import { Typography } from "#/components/ui/typography";

import { getActivity, getActivityPhotos, updateActivity } from "../services";

export const revalidate = 3600;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivity({ slug: params.slug });

  return {
    metadataBase: new URL("https://banos.app"),
    alternates: {
      canonical: "/",
    },
    title: `${activity?.title} | Baños de agua santa`,
    description: activity?.body.substring(0, 100),
    applicationName: "Banos de agua santa app",
    keywords: activity?.keywords,
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: `https://banos.app/activities/${activity?.slug}`,
      title: `${activity?.title} | Baños de agua santa`,
      description: activity?.description,
      siteName: "Banos app",
      images: [
        {
          url: `https://banos.app/api/og?title?=${activity?.title}&image=${
            activity?.cover_picture_url
              ? encodeURIComponent(`https://www.banos.app/${activity?.cover_picture_url}`)
              : undefined
          }`,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const activity = await getActivity({ slug: params.slug });
  if (!activity || !activity.is_active) return notFound();

  const photos = await getActivityPhotos({ activityId: activity?.id });
  await updateActivity({ slug: params.slug, visits: Number(activity.visits) + 1 });

  return (
    <>
      <div className="container max-w-6xl mx-auto">
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

        <div className="mb-6 sm:flex sm:items-end sm:justify-between">
          <div className="mb-4 sm:mb-0">
            {/* <Badge variant="outline" className="mb-2 bg-fuchsia-700 text-white">
              Uno de los lugares mas visitados
            </Badge> */}

            <Typography variant="h1" component="h1" className="mb-2">
              {activity.title}
            </Typography>
            <Link href={`/places/${activity.place.slug}`} passHref>
              <Typography variant="muted" className="flex items-center mr-2">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {activity.place.name}
              </Typography>
            </Link>
          </div>

          <ShareButton
            imageUrl={activity.cover_picture_url}
            name={activity.title}
            description={activity.body}
          />
        </div>
      </div>

      <ActivityPhotos photos={photos} />

      <div className="container max-w-6xl mx-auto">
        <div className="sm:grid sm:grid-cols-6 gap-8 relative pb-4">
          <div className="col-span-4 mb-8 sm:mb-0">
            <article>
              <Typography variant="h4" component="p">
                {activity.title} en {activity.place.name}, Banos, Ecuador
              </Typography>
              <Separator className="my-8" />
              <Markdown content={activity.body} />
              <Separator className="my-8" />
              {activity.open_time && activity.close_time && (
                <div className="flex mb-8">
                  <div className="mr-8">
                    <Clock4Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <Typography variant="h5" component="h5">
                      Horario
                    </Typography>
                    <Typography variant="muted">
                      Desde {activity.open_time} hasta {activity.close_time}
                    </Typography>
                  </div>
                </div>
              )}
              {activity.has_free_parking && (
                <div className="flex mb-8">
                  <div className="mr-8">
                    <ParkingCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <Typography variant="h5" component="h5">
                      Estacionamiento gratuito
                    </Typography>
                    <Typography variant="muted">
                      Este es uno de los pocos lugares en la zona con estacionamiento gratuito.
                    </Typography>
                  </div>
                </div>
              )}
              {activity.tik_tok_video_id && (
                <div className="flex">
                  <div className="mr-8">
                    <MonitorStopIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <Typography variant="h5" component="h5">
                      Tiktok
                    </Typography>
                    <iframe
                      src={`https://www.tiktok.com/embed/${activity.tik_tok_video_id}`}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className=" h-[574px]"
                    />
                  </div>
                </div>
              )}

              {activity.map_url && (
                <>
                  <Separator className="my-4" />
                  <section className="pt-4 rounded-xl overflow-hidden">
                    <Typography variant="h4" component="h2" className="mb-4">
                      Ubicación
                    </Typography>
                    <iframe
                      src={activity.map_url}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full sm:h-[300px] h-[250px] mb-4 rounded-xl overflow-hidden"
                    />
                    <Typography variant="muted">
                      {activity.place.name}, Banos de agua santa, Tungurahua, Ecuador
                    </Typography>
                  </section>
                </>
              )}
            </article>
          </div>
          <div className="col-span-2">
            <ActivityCtaForm price={activity.price} />
          </div>
        </div>
        <div>
          <Separator className="my-4" />
          <section className="py-4 rounded-xl overflow-hidden">
            <Typography variant="h4" component="h2" className="mb-4">
              Fotos
            </Typography>

            <ActivityPhotosMansory photos={photos} />
          </section>
        </div>
      </div>
    </>
  );
}
