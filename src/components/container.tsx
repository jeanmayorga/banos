import { ReactNode } from "react";

import { cn } from "#/utils";

interface Props {
  children?: ReactNode;
  className?: string;
}
export function Container({ children, className }: Props) {
  return <div className={cn("container mx-auto max-w-5xl p-4 md:p-0", className)}>{children}</div>;
}
