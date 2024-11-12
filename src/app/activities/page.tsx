"use client";

import { Metadata } from "next";
import { Suspense, useState } from "react";

import { Breadcrumds } from "@/components/Breadcrumb";
import { Container } from "@/components/container";
import { Search } from "@/components/search";
import { Typography } from "@/components/ui/typography";

import { Card } from "./components/Card";
import { CardSkeleton } from "./components/CardSkeleton";
import { Tabs } from "./components/Tabs";
import { useActivities } from "./hooks/useActivities";

// export const metadata: Metadata = {
//   title: "Que hacer en Banos de Agua Santa | Ecuador",
//   metadataBase: new URL("https://banos.app"),
//   alternates: {
//     canonical: "/activities",
//   },
//   description: "Aqui tienes una lista de actividades para hacer en Banos de agua santa Ecuador",
//   applicationName: "Banos de agua santa app",
//   keywords: "que hacer en banos, ecuador, banos de agua santa, actividades, fotos",
//   robots: "index, follow",
//   openGraph: {
//     type: "website",
//     url: `https://banos.app/activities`,
//     title: "Que hacer en Banos de Agua Santa | Ecuador",
//     description: "Aqui tienes una lista de actividades para hacer en Banos de agua santa Ecuador",
//     siteName: "Banos app",
//     images: [
//       {
//         url: "",
//       },
//     ],
//   },
// };

export default function Page() {
  const { activities, isLoading } = useActivities();

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

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {isLoading && [...Array(12).keys()].map((_number, idx) => <CardSkeleton key={idx} />)}
        {activities.map((activity, idx) => (
          <Card key={activity.fields.slug} activity={activity} idx={idx} />
        ))}
      </div>
    </Container>
  );
}
