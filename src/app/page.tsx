import { Clock3Icon, DollarSignIcon, MapPinIcon } from "lucide-react";
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
      <div className="h-full bg-gradient-to-b from-[#0a493c] to-white py-10 dark:to-[#0a0a0b]">
        <div className="mb-8 py-14 text-center">
          <h1 className="mb-2 text-6xl font-semibold tracking-tight text-white">
            Compra tus entradas aqui.
          </h1>
          <p className="mb-10 text-lg font-light text-white/70">
            Compra tus entradas con nosotros y ahorra descuentos únicos.
          </p>
          <Link href="/activities">
            <Button className="rounded-full px-8 py-5" variant="default">
              ⚡ Ver todas las {allActivities.length} actividades
            </Button>
          </Link>
        </div>
        <Container>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {allActivities.slice(0, 5).map((activity) => (
                <CarouselItem key={activity.sys.id} className="basis-3/4 lg:basis-1/3">
                  <Link
                    href={`/activities/${activity.fields.slug}`}
                    className="relative block h-[500px] select-none overflow-hidden rounded-3xl"
                  >
                    <div
                      className="absolute left-0 top-0 h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${getImageUrl(activity.fields.images?.[0])})`,
                      }}
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black p-6">
                      <Typography variant="h2" className="mb-2 text-white drop-shadow-md">
                        {activity.fields.title}
                      </Typography>

                      <div className="mb-8 flex items-center text-sm lg:mb-0">
                        {activity.fields.openAt && activity.fields.closeAt && (
                          <div className="mr-4 flex flex-col">
                            <span className="flex items-center text-sm font-light text-gray-200 drop-shadow-md">
                              Horario
                            </span>
                            <span className="font-semibold text-white drop-shadow-md">
                              {activity.fields.openAt} - {activity.fields.closeAt}
                            </span>
                          </div>
                        )}
                        {activity.fields.adultPrice && (
                          <div className="flex flex-col">
                            <span className="flex items-center text-sm font-light text-gray-200 drop-shadow-md">
                              Precio
                            </span>
                            <span className="font-semibold text-white drop-shadow-md">
                              $ {activity.fields.adultPrice?.toFixed(2)} USD
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant="default" />
            <CarouselNext variant="default" />
          </Carousel>
        </Container>
      </div>
    </>
  );
}
