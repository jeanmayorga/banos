"use client";

import { Container } from "@/components/container";
import { Header } from "@/components/Header";
import { Typography } from "@/components/ui/typography";

export default function Page() {
  return (
    <>
      <Header />
      <Container className="mt-12 md:mt-24">
        <Typography variant="h1" component="h1" className="text-4xl text-gray-700 md:text-5xl">
          Tickets
        </Typography>
        <Typography variant="lead" component="h2" className="mb-4 text-base">
          Todavia no has comprado nada y no tienes ningun ticket.
        </Typography>
      </Container>
    </>
  );
}
