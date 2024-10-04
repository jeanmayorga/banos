"use client";

import { useEffect } from "react";

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
    <div>
      <Typography variant="h1">La pagina que buscas no existe</Typography>
    </div>
  );
}
