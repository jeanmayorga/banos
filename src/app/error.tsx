"use client";

import { useEffect } from "react";

import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { Typography } from "@/components/ui/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <div className="flex h-60 items-center justify-center">
        <Container>
          <Typography variant="h1" className="text-center text-6xl text-gray-500">
            404
          </Typography>
        </Container>
      </div>
    </>
  );
}
