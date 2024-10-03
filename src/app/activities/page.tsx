import { Metadata } from "next";

import { Breadcrumds } from "@/components/Breadcrumb";
import { Container } from "@/components/container";
import { Search } from "@/components/search";
import { Typography } from "@/components/ui/typography";

import { getAllActivities } from "./actions";
import { Card } from "./components/Card";
import { Tabs } from "./components/Tabs";

export const metadata: Metadata = {
  title: "Que hacer en Banos de Agua Santa | Ecuador",
  metadataBase: new URL("https://banos.app"),
  alternates: {
    canonical: "/",
  },
  description: "Aqui tienes una lista de actividades para hacer en Banos de agua santa Ecuador",
  applicationName: "Banos de agua santa app",
  keywords: "que hacer en banos, ecuador, banos de agua santa, actividades, fotos",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: `https://banos.app/activities`,
    title: "Que hacer en Banos de Agua Santa | Ecuador",
    description: "Aqui tienes una lista de actividades para hacer en Banos de agua santa Ecuador",
    siteName: "Banos app",
    images: [
      {
        url: "",
      },
    ],
  },
};

interface Props {
  searchParams: {
    sortBy: string;
    sortOrder: string;
    search: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const activities = await getAllActivities();

  return (
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
        ]}
      />
      <div className="mb-8">
        <Typography variant="h1" component="h1" className="mb-2">
          Actividades
        </Typography>
        <Typography variant="muted" component="p" className="mb-4">
          Descubre las mejores aventuras y actividades en el corazón de la naturaleza.
        </Typography>
        <Search />
        <Tabs />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {activities.map((activity, idx) => (
          <Card key={activity.fields.slug} activity={activity} idx={idx} />
        ))}
      </div>
    </Container>
  );
}
