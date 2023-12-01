"use client";

import { useEffect } from "react";

import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";

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
    <div>
      <Header />
      <Nav />
    </div>
  );
}
