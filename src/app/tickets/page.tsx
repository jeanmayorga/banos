"use client";

import { Container } from "@/components/container";
import { Header } from "@/components/Header";
import { Title } from "@/components/Title";

export default function Page() {
  return (
    <>
      <Header />
      <Container className="mt-12 md:mt-24">
        <Title
          title="Encuentra actividades"
          subtitle="Si estás en Baños y no sabes qué hacer, no te preocupes. Aqui te ayudamos."
        />
      </Container>
    </>
  );
}
