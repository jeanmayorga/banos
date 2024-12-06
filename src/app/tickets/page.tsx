"use client";

import { Container } from "@/components/container";
import { Header } from "@/components/Header";
import { Title } from "@/components/Title";

export default function Page() {
  return (
    <>
      <Header />
      <Container className="mt-12 md:mt-24">
        <Title title="Tickets" subtitle="Todavia no has comprado nada y no tienes ningun ticket." />
      </Container>
    </>
  );
}
