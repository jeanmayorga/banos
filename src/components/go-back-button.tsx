"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "#/utils/cn";

import { Button } from "./ui/button";

interface Props {
  href: string;
  className?: string;
}

export function GoBackButton({ href, className }: Props) {
  const router = useRouter();

  function handleGoBack() {
    if (document.referrer) {
      return router.back();
    }

    return router.replace(href);
  }

  return (
    <Button
      variant="ghost"
      className={cn("rounded-full px-0 hover:px-3", className)}
      onClick={handleGoBack}
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> Regresar
    </Button>
  );
}
