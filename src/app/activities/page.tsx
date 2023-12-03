import { Metadata } from "next";

import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";

export const metadata: Metadata = {
  title: "Banos de Agua Santa | Ecuador",
};

export default function Page() {
  return (
    <>
      <Header />
      <Nav />
    </>
  );
}
