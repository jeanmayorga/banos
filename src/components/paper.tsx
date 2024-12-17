import { ReactNode } from "react";

import { cn } from "@/utils";

interface Props {
  children: ReactNode;
  className?: string;
  onMouseOver?: () => void;
}
export function Paper({ children, className, ...props }: Props) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-border dark:bg-[#171716] dark:shadow-[#171716] md:dark:border",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
