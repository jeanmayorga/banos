import { ReactNode } from "react";

import { cn } from "@/utils";

export function TitleMini(props: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={cn(
        "mb-[2px] text-[10px] font-semibold uppercase leading-none text-gray-500",
        props.className,
      )}
    >
      {props.children}
    </h3>
  );
}
