import { ReactNode } from "react";

import { cn } from "@/utils";

interface Props {
  children: ReactNode;
  className?: string;
}
export function H4({ children, className }: Props) {
  return (
    <h4
      className={cn(
        "truncate text-base leading-none tracking-tight text-gray-600 dark:text-white",
        className,
      )}
    >
      {children}
    </h4>
  );
}
