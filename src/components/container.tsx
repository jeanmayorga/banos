import { ReactNode } from "react";

import { cn } from "#/utils";

interface Props {
  children?: ReactNode;
  className?: string;
}
export function Container({ children, className }: Props) {
  return (
    <div className={cn("ms:px-0 container mx-auto max-w-6xl px-4", className)}>{children}</div>
  );
}
