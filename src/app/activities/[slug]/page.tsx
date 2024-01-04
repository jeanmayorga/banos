import { Clock4Icon, MapPinIcon, MonitorStopIcon, ParkingCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ActivityContent } from "#/components/ActivityContent";
import { ActivityCtaForm } from "#/components/ActivityCtaForm";
import { ActivityPhotos } from "#/components/ActivityPhotos";
import { Breadcrumds } from "#/components/Breadcrumb";
import { GoBackButton } from "#/components/go-back-button";
import { ShareButton } from "#/components/ShareButton";
import { Separator } from "#/components/ui/separator";
import { Typography } from "#/components/ui/typography";

import { getActivity, updateActivity } from "../services";

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
        url: `https://res.cloudinary.com/da3uyv9xp/image/upload/${photo.path}`,
      })),
    },
  };
}

export default async function Page({ params }: Props) {
  const activity = await getActivity({ slug: params.slug });
  if (!activity || !activity.is_active) return notFound();

  const photos = activity.photos || [];
  await updateActivity({ slug: params.slug, visits: Number(activity.visits) + 1 });

  return (
    <>
      <div className="container max-w-6xl mx-auto">
        <GoBackButton href="/activities" className="mt-8" />
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
            imageUrl={photos[0].path}
            name={activity.title}
            description={activity.description}
          />
        </div>
      </div>

      <ActivityPhotos photos={photos} />

      <div className="container max-w-6xl mx-auto">
        <div className="sm:grid sm:grid-cols-6 gap-8 relative pb-4">
          <div className="col-span-4 mb-8 sm:mb-0">
            <article>
              <Typography variant="h4" component="h2" className="mb-4">
                {activity.title} en {activity.place.name}, Banos, Ecuador
              </Typography>
              <ActivityContent content={activity.body} />
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
      </div>
    </>
  );
}
