import { ActivityPhotosLoading } from "#/components/ActivityPhotosLoading";
import { Breadcrumds } from "#/components/Breadcrumb";
import { Skeleton } from "#/components/ui/skeleton";

export default async function Page() {
  return (
    <>
      <div className="container max-w-6xl mx-auto">
        <Breadcrumds
          items={[
            {
              text: "Banos",
              href: "/",
            },
            {
              href: "#",
              text: <Skeleton className="h-[14px] w-[70px]" />,
            },
            {
              href: "#",
              text: <Skeleton className="h-[14px] w-[90px]" />,
            },
          ]}
        />
        <div className="mb-[32px] sm:flex sm:items-end sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <Skeleton className="h-[60px] w-[300px] mb-2" />
            <Skeleton className="h-[14px] w-[90px]" />
          </div>
        </div>
      </div>
      <ActivityPhotosLoading />
    </>
  );
}
