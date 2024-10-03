import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumds } from "#/components/Breadcrumb";
import { Container } from "#/components/container";
import { Typography } from "#/components/ui/typography";

import { getActivityBySlug, getAllActivities } from "../actions";
import { BlockImages } from "../components/BlockImages";
import { DescriptionBlock } from "../components/DescriptionBlock";

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

  // const photos = activity.photos || [];
  // await updateActivity({ slug: params.slug, visits: Number(activity.visits) + 1 });

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

        <div className="mb-6">
          <Typography variant="h1" component="h1" className="mb-2">
            {activity.fields.title}
          </Typography>

          <Typography variant="muted" component="h2" className="mb-2">
            {activity.fields.title} en {place?.fields.title}, Banos, Ecuador
          </Typography>
        </div>
      </Container>

      <BlockImages title={activity.fields.title} images={images} />

      <DescriptionBlock document={activity.fields.description} />
    </>
  );
}
