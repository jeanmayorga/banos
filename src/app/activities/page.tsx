import { Metadata } from "next";
import { Suspense } from "react";

import { Breadcrumds } from "@/components/Breadcrumb";
import { Container } from "@/components/container";
import { Search } from "@/components/search";
import { Typography } from "@/components/ui/typography";

import { BlockCardList } from "./components/BlockCardList";
import { BlockCardListSkeleton } from "./components/BlockCardListSkeleton";
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
        <Suspense>
          <Search />
          <Tabs />
        </Suspense>
      </div>
      <Suspense fallback={<BlockCardListSkeleton />}>
        <BlockCardList />
      </Suspense>
    </Container>
  );
}
