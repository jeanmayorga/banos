"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Button } from "./ui/button";

interface Props {
  to?: string;
  text?: string;
}

export function BackButton({ to, text }: Props) {
  const searchParams = useSearchParams();
  const searchParamsStringify = searchParams.toString();

  function goBackUrl() {
    const url = to || "/";
    const searchParams = localStorage.getItem("searchParams");
    if (searchParams) return `${url}?${searchParams}`;
    return url;
  }

  useEffect(() => {
    if (searchParamsStringify) {
      localStorage.setItem("searchParams", searchParamsStringify);
    }
  }, [searchParamsStringify]);

  return (
    <div
      className="my-6"
      // style={{ viewTransitionName: "back-button" }}
    >
      <Link href={goBackUrl()}>
        <Button variant="ghost" className="rounded-full">
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> {text || "Regresar"}
        </Button>
      </Link>
    </div>
  );
}
