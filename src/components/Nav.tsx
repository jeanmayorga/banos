"use client";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { BedDoubleIcon, BikeIcon, HomeIcon, MountainSnowIcon, SoupIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "#/utils";

interface ItemProps {
  icon?: React.ReactNode;
  href: string;
  name: string;
}
function Item({ href, icon, name }: ItemProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.includes(href);

  return (
    <Link
      href={href}
      passHref
      className={cn(
        "border-b-2 border-b-transparent transition-all",
        "hover:border-b-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 dark:hover:border-b-gray-300",
        isActive && "border-b-rose-500 hover:border-b-rose-500 text-rose-500 hover:text-rose-500",
      )}
    >
      <div className="flex flex-col items-center px-2 py-2 my-1 rounded-lg">
        {icon}
        <div className={cn("text-xs font-normal", isActive && "font-medium")}>{name}</div>
      </div>
    </Link>
  );
}

export function NavItems() {
  return (
    <div className="flex items-center gap-2">
      <Item href="/" icon={<HomeIcon className="w-6 h-6 mb-2" />} name="Inicio" />
      <Item href="/places" icon={<MountainSnowIcon className="w-6 h-6 mb-2" />} name="Lugares" />
      <Item href="/activities" icon={<BikeIcon className="w-6 h-6 mb-2" />} name="Actividades" />
      {/* <Item href="/hotels" icon={<BedDoubleIcon className="w-6 h-6 mb-2" />} name="Hoteles" />
      <Item href="/restaurants" icon={<SoupIcon className="w-6 h-6 mb-2" />} name="Restaurantes" />
      <Item href="/events" icon={<CalendarDaysIcon className="w-6 h-6 mb-2" />} name="Fiestas" /> */}
    </div>
  );
}

export function Nav() {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 border-b-gray-100 sticky top-0 z-30 overflow-y-hidden whitespace-nowrap scrollbar-hide">
      <div className="container max-w-6xl mx-auto">
        <NavItems />
      </div>
    </nav>
  );
}
