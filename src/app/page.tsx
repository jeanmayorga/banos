import { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import { getImageUrl } from "@/lib/get-image-url";

import { getAllActivities } from "./activities/actions";

export const metadata: Metadata = {
  title: "Banos de Agua Santa | Ecuador",
};

export default async function Page() {
  const allActivities = await getAllActivities();

  return (
    <>
      <div className="h-full bg-gradient-to-b from-[#0a493c] to-[#0a0a0b] py-10">
        <div className="mb-8 py-14 text-center">
          <h1 className="mb-2 text-6xl font-semibold tracking-tight">Compra tus entradas aqui.</h1>
          <p className="mb-10 text-lg font-light text-foreground">
            Compra tus entradas con nosotros y ahorra descuentos únicos.
          </p>
          <Button className="rounded-full px-8 py-5" variant="default">
            ⚡ Ver todas las {allActivities.length} actividades
          </Button>
        </div>
        <Container>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {allActivities.slice(0, 5).map((activity) => (
                <CarouselItem key={activity.sys.id} className="md:basis-2/3 lg:basis-1/3">
                  <Link
                    href={`/activities/${activity.fields.slug}`}
                    className="relative block h-[500px] overflow-hidden rounded-3xl"
                  >
                    <div
                      className="absolute left-0 top-0 h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${getImageUrl(activity.fields.images?.[0])})`,
                      }}
                    />
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black/40" />
                    <div className="absolute bottom-0 p-6">
                      <Typography variant="h2" className="mb-2">
                        {activity.fields.title}
                      </Typography>
                      <p className="text-sm text-gray-300">
                        {(activity.fields.seoDescription || "").slice(0, 100)}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Container>
      </div>
    </>
  );
}
