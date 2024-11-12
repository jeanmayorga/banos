import { Metadata } from "next";
import { Suspense } from "react";

import { PageActivities } from "./components/PageActivities";

export const metadata: Metadata = {
  title: "Que hacer en Banos de Agua Santa | Ecuador",
  metadataBase: new URL("https://banos.app"),
  alternates: {
    canonical: "/activities",
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

export default function Page() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <PageActivities />
    </Suspense>
  );
}
