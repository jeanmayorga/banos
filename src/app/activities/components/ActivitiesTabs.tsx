"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

export const tabs = [
  {
    name: "Todos",
    key: "all",
  },
  {
    name: "Mas populares",
    key: "most-popular",
  },
  {
    name: "Mas baratos",
    key: "cheaper",
  },
  {
    name: "En la ciudad",
    key: "in-city",
  },
  {
    name: "Afuera de la ciudad",
    key: "out-of-city",
  },
];

export function ActivitiesTab() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "all";

  return (
    <nav className="no-scrollbar flex space-x-1 overflow-x-auto">
      {tabs.map((tab) => {
        const isTabActive = tab.key === currentTab;

        return (
          <Link href={`/activities?tab=${tab.key}`} key={tab.key}>
            <button
              className={cn(
                "text-nowrap rounded-full bg-gray-200/80 px-4 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-rose-400 hover:text-white active:scale-95 dark:bg-gray-700/80 dark:text-gray-400",
                isTabActive && "bg-rose-400 text-white dark:bg-rose-500/50 dark:text-white/70",
              )}
            >
              {tab.name}
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
