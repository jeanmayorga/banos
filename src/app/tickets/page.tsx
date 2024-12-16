"use client";

import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { Title } from "@/components/Title";

export default function Page() {
  return (
    <>
      <Container className="mt-12 md:mt-24">
        <Title title="Tickets" subtitle="Todavia no has comprado nada y no tienes ningun ticket." />
      </Container>
    </>
  );
}
