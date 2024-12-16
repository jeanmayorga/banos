import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { Header } from "@/components/header";
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

import { getActivities } from "./activities/actions";
export const metadata: Metadata = {
  title: "Banos de Agua Santa | Ecuador",
};

export default async function Page() {
  const activities = await getActivities({ limit: 4, byTab: "most-visited" });

  return (
    <>
      <Container className="-mt-14">
        <div className="relative mb-16 h-[450px] w-full overflow-hidden rounded-3xl bg-slate-500">
          <Image
            src="https://images.ctfassets.net/3nb2uoch90ye/10X17L8ijbDOyWq7pf7MPX/7b2d162a41092f4a331a716fc47a4bcc/potra.jpeg"
            alt="Baños de Agua Santa"
            fill
            className="z-0 rounded-3xl object-cover"
          />
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40" />
          <div className="absolute top-1/2 z-10 w-full -translate-y-1/2 px-4 text-center">
            <Typography
              variant="h1"
              component="h1"
              className="text-balance text-4xl text-white md:text-6xl"
            >
              Compra tus entradas aqui
            </Typography>
            <p className="mb-8 text-balance text-lg text-white/80">
              Descuentos únicos, aventuras sin límites: Compra tus entradas ahora.
            </p>
            <div className="space-x-4">
              <Link href="/activities">
                <Button className="rounded-full" size="lg">
                  Comprar entradas
                </Button>
              </Link>
              <Link href="/activities">
                <Button className="rounded-full" size="lg" variant="outline">
                  Ver lugares
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div className="bg-primary py-16">
        <Container>
          <Typography variant="h1" component="h1" className="mb-8 text-balance text-4xl text-white">
            ¿Qué hacer en Baños, Ecuador?
          </Typography>
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent>
              {activities.slice(0, 5).map((activity) => (
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
            <CarouselPrevious variant="secondary" />
            <CarouselNext variant="secondary" />
          </Carousel>
        </Container>
      </div>
    </>
  );
}
