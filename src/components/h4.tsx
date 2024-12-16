import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export function H4({ children }: Props) {
  return (
    <h4 className="truncate text-base leading-none tracking-tight text-gray-600 dark:text-white">
      {children}
    </h4>
  );
}
