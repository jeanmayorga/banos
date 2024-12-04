import { Metadata } from "next";
import { ReactNode } from "react";

import { Header } from "@/components/Header";

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
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
