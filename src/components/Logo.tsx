import { Satisfy } from "next/font/google";

import { cn } from "#/utils";

const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  size?: "sm" | "md";
  className?: string;
}
export function Logo({ size, className }: Props) {
  if (size === "sm") {
    return (
      <div className="relative select-none">
        <div className={cn("text-4xl leading-none text-gray-50", satisfy.className, className)}>
          Baños
        </div>
      </div>
    );
  }
  if (size === "md") {
    return (
      <div className="relative select-none">
        <div className={cn(`text-5xl leading-none text-gray-50 ${satisfy.className}`, className)}>
          Baños
        </div>
        <div
          className={cn(
            `ml-[26px] mt-[-25px] text-2xl leading-none text-gray-50 ${satisfy.className}`,
            className,
          )}
        >
          de Agua Santa
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[200px] select-none">
      <div className={cn(`text-7xl leading-none text-gray-50 ${satisfy.className}`, className)}>
        Baños
      </div>
      <div
        className={cn(
          `ml-[30px] mt-[-12px] text-3xl leading-none text-gray-50 ${satisfy.className}`,
          className,
        )}
      >
        de Agua Santa
      </div>
    </div>
  );
}
