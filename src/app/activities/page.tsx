import { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/container";
import { Search } from "@/components/search";
import { Title } from "@/components/Title";

import { PlacesSelect } from "../places/components/PlacesSelect";

import { ListActivities } from "./components/ListActivities";
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
      <Container className="mt-12 md:mt-24">
        <Title
          title="Encuentra actividades"
          subtitle="Si estás en Baños y no sabes qué hacer, no te preocupes. Aqui te ayudamos."
        />

        <div className="mb-4 grid gap-4 rounded-3xl border border-transparent bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-black md:grid-cols-2">
          <Suspense>
            <Search />
            <PlacesSelect />
          </Suspense>
        </div>
        <div className="mb-4 rounded-3xl border border-transparent bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-black">
          <Suspense>
            <Tabs />
          </Suspense>
        </div>
        <ListActivities searchParams={searchParams} />
      </Container>
    </>
  );
}
