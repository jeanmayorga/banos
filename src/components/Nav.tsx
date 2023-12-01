"use client";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { BedDoubleIcon, BikeIcon, MountainSnowIcon, SoupIcon } from "lucide-react";
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
  const isActive = pathname.includes(href);

  return (
    <Link
      href={href}
      passHref
      className={cn(
        "border-b-2 border-b-transparent transition-all",
        "hover:border-b-gray-700 text-gray-400 hover:text-gray-700",
        isActive &&
          "border-b-fuchsia-700 hover:border-b-fuchsia-700 text-fuchsia-700 hover:text-fuchsia-700",
      )}
    >
      <div className="flex flex-col items-center px-2 py-2 my-1 rounded-lg">
        {icon}
        <div className={cn("text-xs font-light transition-all", isActive && "font-medium")}>
          {name}
        </div>
      </div>
    </Link>
  );
}

export function Nav() {
  return (
    <nav className="w-full bg-white dark:bg-black shadow-sm border-b-gray-100">
      <div className="container mx-auto flex items-center gap-2">
        <Item href="/places" icon={<MountainSnowIcon className="w-6 h-6 mb-2" />} name="Lugares" />
        <Item href="/activities" icon={<BikeIcon className="w-6 h-6 mb-2" />} name="Actividades" />
        <Item href="/hotels" icon={<BedDoubleIcon className="w-6 h-6 mb-2" />} name="Hoteles" />
        <Item
          href="/restaurants"
          icon={<SoupIcon className="w-6 h-6 mb-2" />}
          name="Restaurantes"
        />
        <Item href="/events" icon={<CalendarDaysIcon className="w-6 h-6 mb-2" />} name="Eventos" />
      </div>
    </nav>
  );
}
