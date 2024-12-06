"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";

import { cn } from "@/lib/utils";

export const tabs = [
  {
    name: "Mas visitados",
    key: "most-visited",
  },
  // {
  //   name: "Mas populares",
  //   key: "most-popular",
  // },
  {
    name: "Mas baratos",
    key: "cheaper",
  },
  {
    name: "Mas caros",
    key: "most-expensive",
  },
  {
    name: "Guardadas",
    key: "saved",
  },
];

export function Tabs() {
  const [currentTab, setCurrentTab] = useQueryState("tab", {
    shallow: false,
    defaultValue: "most-visited",
    clearOnDefault: true,
  });

  return (
    <nav className="no-scrollbar flex space-x-1 overflow-x-auto">
      {tabs.map((tab) => {
        const isTabActive = tab.key === currentTab;

        return (
          <Link href={`/activities?tab=${tab.key}`} key={tab.key}>
            <button
              onClick={() => setCurrentTab(tab.key)}
              className={cn(
                "text-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 shadow-sm transition-all hover:bg-[#00a7ac] hover:text-white active:scale-95 dark:bg-gray-800 dark:text-gray-400",
                isTabActive && "bg-[#00a7ac] text-white dark:bg-[#00a7ac] dark:text-white",
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
