import { Breadcrumds } from "@/components/Breadcrumb";
import { Container } from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <>
      <Container>
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
        <div className="mb-[29px] sm:flex sm:items-end sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <Skeleton className="mb-[19px] h-[39px] w-[300px]" />
            <Skeleton className="h-[12px] w-[200px]" />
          </div>
        </div>
      </Container>
      <div className="bg-gray-200 py-12">
        <Container className="relative">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl lg:h-[336px]">
            <div className="col-span-2 row-span-2 bg-gray-300"></div>
            <div className="bg-gray-300"></div>
            <div className="bg-gray-300"></div>
            <div className="bg-gray-300"></div>
            <div className="bg-gray-300"></div>
          </div>
        </Container>
      </div>
    </>
  );
}
