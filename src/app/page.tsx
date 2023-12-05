import { SearchIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { supabase } from "#/api";
import { ActivitiesSectionList } from "#/components/ActivitySectionList";
import { EventsSectionList } from "#/components/EventsSectionList";
import { JumboHome } from "#/components/JumboHome";
import { NavItems } from "#/components/Nav";
import { ThemeButton } from "#/components/ThemeButton";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import { Typography } from "#/components/ui/typography";
import { UserButton } from "#/components/UserButton";
import { Event } from "#/modules";
import { getCurrentDate } from "#/utils";

import { getActivities } from "./activities/services";

// export const revalidate = 3600 / 60;

export const metadata: Metadata = {
  title: "Banos de Agua Santa | Ecuador",
};

export default async function Page() {
  const currentDate = getCurrentDate();
  const { data: eventsData } = await supabase
    .from("events")
    .select("*")
    .order("time")
    .eq("date", currentDate);
  const events = eventsData as Event[];

  const activities = await getActivities({});

  return (
    <>
      <div className="lg:grid lg:grid-cols-10 min-h-screen">
        <JumboHome className="lg:col-span-7 w-full h-screen" />
        {/* <div className="lg:col-span-7" /> */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-950 lg:border-l lg:relative lg:z-20">
          <div className="px-4 py-2 flex items-center justify-between dark:bg-slate-900">
            <Typography variant="h4" component="h4">
              Explorar
            </Typography>

            <div className="flex items-center gap-2">
              <ThemeButton />
              <UserButton />
            </div>
          </div>
          <Separator />

          <div className="px-4 overflow-y-hidden whitespace-nowrap scrollbar-hide dark:bg-slate-900">
            <NavItems />
          </div>
          <Separator />

          <div className="px-4 py-3">
            <Link
              href="search"
              passHref
              prefetch
              className="relative flex w-full bg-gray-50 dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full py-2 px-3 text-gray-500 transition-all"
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              <span className="font-light text-sm">¿Qué hacer en Banos?</span>
            </Link>
          </div>

          {events.length > 0 && (
            <>
              <Separator />
              <div className="mb-8">
                <div className="flex items-center justify-between px-4 py-3">
                  <Typography variant="h4" component="h4">
                    Fiestas de Baños
                  </Typography>
                  <Link href="/events" passHref>
                    <Button variant="link" size="sm">
                      Ver todos
                    </Button>
                  </Link>
                </div>
                <EventsSectionList events={events} />
              </div>
            </>
          )}

          {activities.length > 0 && (
            <>
              <Separator />

              <div className="mb-8">
                <div className="flex items-center justify-between px-4 py-3">
                  <Typography variant="h4" component="h4">
                    Actividades
                  </Typography>
                  <Link href="/activities" passHref>
                    <Button variant="link" size="sm">
                      Ver todos
                    </Button>
                  </Link>
                </div>
                <ActivitiesSectionList activities={activities} />
              </div>
            </>
          )}

          {/* <div className="w-full h-[200px] bg-fuchsia-800 mb-8 grid grid-cols-6">
            <div className="col-span-4 p-4">
              <h1 className="font-extrabold text-4xl tracking-tight text-white mb-4">
                Compras tus entradas aqui
              </h1>
              <p className="text-lg text-slate-300">
                Somos el unico portal autorizado para vender entradas.
              </p>
            </div>
            <div className="col-span-2 overflow-hidden p-4">
              <img src="/hands.png" className="h-full" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
