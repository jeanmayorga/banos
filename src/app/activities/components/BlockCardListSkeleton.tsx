import { CardSkeleton } from "./CardSkeleton";

export function BlockCardListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(12).keys()].map((_number, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
}
