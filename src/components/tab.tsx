import { ReactNode } from "react";

import { cn } from "@/utils";

interface Props {
  active?: boolean;
  children?: ReactNode;
}
export function Tab({ active, children }: Props) {
  return (
    <button
      className={cn(
        "text-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 shadow-sm transition-all hover:bg-[#00a7ac] hover:text-white active:scale-95 dark:bg-gray-800 dark:text-gray-400",
        active && "bg-[#00a7ac] text-white dark:bg-[#00a7ac] dark:text-white",
      )}
    >
      {children}
    </button>
  );
}
