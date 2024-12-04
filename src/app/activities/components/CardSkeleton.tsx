import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="group rounded-3xl border border-gray-100 bg-white shadow-md dark:border-gray-800 dark:bg-black dark:shadow-black">
      <Skeleton className="relative h-[280px] w-full shrink-0 grow-0 lg:h-[200px]" />

      <div className="flex flex-grow flex-col justify-between p-4">
        <Skeleton className="mb-[10px] h-4 w-[120px]" />
        <Skeleton className="mb-1 h-[14px] w-[50px]" />
        <Skeleton className="h-[14px] w-[70px]" />
      </div>
    </div>
  );
}
