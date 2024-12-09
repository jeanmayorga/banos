import { ReactNode } from "react";

import { cn } from "@/utils";

interface Props {
  children: ReactNode;
  className?: string;
}
export function Paper({ children, className }: Props) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-black dark:shadow-black",
        className,
      )}
    >
      {children}
    </section>
  );
}
