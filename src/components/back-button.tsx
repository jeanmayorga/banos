"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { Button } from "./ui/button";

interface Props {
  href?: string;
  className?: string;
  children: ReactNode;
}

export function BackButton({ href, className, children }: Props) {
  return (
    <div className={className}>
      <Link href={href || "/activities"}>
        <Button variant="ghost" className="rounded-full">
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> {children || "Regresar"}
        </Button>
      </Link>
    </div>
  );
}
