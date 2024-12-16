import { ReactNode } from "react";

import { cn } from "@/utils";

interface Props {
  children: ReactNode;
  className?: string;
}
export function H3({ children, className }: Props) {
  return (
    <h3
      className={cn(
        "truncate text-lg leading-none tracking-tight text-gray-600 dark:text-white",
        className,
      )}
    >
      {children}
    </h3>
  );
}
