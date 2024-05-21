import { ActivityCardLoading } from "#/components/ActivityCardLoading";

interface Props {
  limit: number;
}
export function SkeletonCardList({ limit }: Props) {
  return (
    <>
      {Array.from(Array(limit).keys()).map((item) => (
        <ActivityCardLoading key={item} />
      ))}
    </>
  );
}
