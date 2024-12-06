import { DEFAULT_LIMIT_ITEMS } from "../config";

import { CardSkeleton } from "./CardSkeleton";

export function ListActivitiesSkeleton() {
  return (
    <>
      {[...Array(DEFAULT_LIMIT_ITEMS).keys()].map((_number, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </>
  );
}
