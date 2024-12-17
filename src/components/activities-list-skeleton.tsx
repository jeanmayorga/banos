import { CardSkeleton } from "@/app/activities/components/CardSkeleton";

interface Props {
  count?: number;
}
export function ActivitiesListSkeleton({ count }: Props) {
  return (
    <>
      {[...Array(count || 9).keys()].map((_number, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </>
  );
}
