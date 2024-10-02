import { ShareIcon } from "lucide-react";

import { Breadcrumds } from "#/components/Breadcrumb";
import { Button } from "#/components/ui/button";
import { Skeleton } from "#/components/ui/skeleton";

export default async function Page() {
  return (
    <>
      <div className="container mx-auto max-w-6xl">
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
            <Skeleton className="mb-2 h-[60px] w-[300px]" />
            <Skeleton className="h-[14px] w-[90px]" />
          </div>
          <Button disabled variant="outline" aria-label="compartir" className="rounded-full">
            <ShareIcon className="mr-2 h-4 w-4" />
            Compartir
          </Button>
        </div>
      </div>
    </>
  );
}
