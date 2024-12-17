import { Metadata } from "next";
import { Suspense } from "react";

import { ActivitiesList } from "@/components/activities-list";
import { Container } from "@/components/container";
import { Paper } from "@/components/paper";
import { Search } from "@/components/search";
import { Title } from "@/components/Title";

import { PlacesSelect } from "../places/components/PlacesSelect";

import { Tabs } from "./components/Tabs";

export const metadata: Metadata = {
  title: "Que hacer en Banos de Agua Santa | Ecuador",
  description: "Aqui tienes una lista de actividades para hacer en Banos de agua santa Ecuador",
  applicationName: "Banos.app",
  keywords: "que hacer en banos, ecuador, banos de agua santa, actividades, fotos",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: `https://banos.app/activities`,
  },
};

interface Props {
  searchParams: {
    tab?: string;
    query?: string;
    place?: string;
  };
}
export default async function Page({ searchParams }: Props) {
  return (
    <>
      <Container className="mt-4">
        <Title
          title="Encuentra actividades"
          subtitle="Si estás en Baños y no sabes qué hacer, no te preocupes. Aqui te ayudamos."
        />

        <Paper className="mb-4 grid gap-4 p-4 md:grid-cols-2">
          <Suspense>
            <Search />
            <PlacesSelect />
          </Suspense>
        </Paper>
        <Paper className="mb-4 p-4">
          <Suspense>
            <Tabs />
          </Suspense>
        </Paper>
        <ActivitiesList searchParams={searchParams} />
      </Container>
    </>
  );
}
