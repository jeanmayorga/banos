import { Satisfy } from "next/font/google";

import { cn } from "#/utils";

const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  size?: "sm";
  className?: string;
}
export function Logo({ size, className }: Props) {
  if (size === "sm") {
    return (
      <div className="relative select-none">
        <div className={cn("text-4xl leading-none text-gray-50", satisfy.className, className)}>
          Banos
        </div>
      </div>
    );
  }

  return (
    <div className="w-[200px] relative select-none">
      <div className={cn(`text-7xl leading-none text-gray-50 ${satisfy.className}`, className)}>
        Banos
      </div>
      <div
        className={cn(
          `text-3xl leading-none text-gray-50 mt-[-12px] ml-[30px] ${satisfy.className}`,
          className,
        )}
      >
        de Agua Santa
      </div>
    </div>
  );
}
