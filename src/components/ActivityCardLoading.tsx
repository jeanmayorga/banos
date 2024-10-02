import { Skeleton } from "./ui/skeleton";

export function ActivityCardLoading() {
  return (
    <div className="group">
      <Skeleton className="aspect-square w-full overflow-hidden rounded-xl" />

      <div className="mt-[12px] w-full">
        <Skeleton className="mb-[10px] h-4 w-[120px]" />
        <Skeleton className="mb-1 h-[14px] w-[50px]" />
        <Skeleton className="h-[14px] w-[70px]" />
      </div>
    </div>
  );
}
