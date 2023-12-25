import { Skeleton } from "./ui/skeleton";
import { Typography } from "./ui/typography";

export function ActivityCardLoading() {
  return (
    <div className="group">
      <Skeleton className="rounded-xl overflow-hidden aspect-square w-full" />

      <div className="w-full mt-[12px]">
        <Skeleton className="w-[120px] h-4 mb-[10px]" />
        <Skeleton className="h-[14px] w-[50px] mb-1" />
        <Skeleton className="h-[14px] w-[70px]" />
      </div>
    </div>
  );
}
