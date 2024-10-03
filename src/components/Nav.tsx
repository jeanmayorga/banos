"use client";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import {
  BedDoubleIcon,
  BikeIcon,
  HomeIcon,
  MountainSnowIcon,
  SoupIcon,
  TentTree,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "#/utils";

import { Container } from "./container";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";

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
      className={cn(
        "border-1 group flex items-center rounded-full border border-transparent px-4 py-2 transition-all active:scale-95",
        "hover:border-gray-200 hover:shadow-sm",
        "dark:hover:border-gray-600",
        isActive && "bg-rose-400 dark:border-rose-400 dark:hover:border-gray-400",
      )}
    >
      <div
        className={cn(
          "mr-2 text-gray-500 transition-all group-hover:text-gray-900 dark:text-gray-200",
          "dark:text-gray-200 dark:group-hover:text-gray-100",
          isActive && "text-white group-hover:text-white dark:text-rose-50",
        )}
      >
        {icon}
      </div>
      <div
        className={cn(
          "text-sm font-semibold tracking-tight transition-all",
          "text-gray-500",
          "group-hover:font-semibold group-hover:text-gray-900",
          "dark:text-gray-200 dark:group-hover:text-gray-100",
          isActive && "text-white group-hover:text-white dark:text-rose-50",
        )}
      >
        {name}
      </div>
    </Link>
  );
}

export function Nav() {
  return (
    <div className="sticky top-0 z-30 border-b border-gray-100 bg-white py-2 dark:border-gray-900 dark:bg-black">
      <Container className="flex items-center gap-2">
        <Item href="/" icon={<HomeIcon className="h-5 w-5" />} name="Inicio" />
        <Item href="/places" icon={<MountainSnowIcon className="h-5 w-5" />} name="Lugares" />
        {/* <Item
          href="/hotels"
          icon={
            <svg viewBox="0 0 24 24" width="24px" height="24px" className="h-5 w-5">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.252 5.405c0-.47.38-.85.85-.85h15.624c.47 0 .85.38.85.85v6.649c.68.562 1.22 1.393 1.22 2.544v4.847h-1.5V17.77H3.704v1.674h-1.5V14.57c.025-.654.304-1.588 1.049-2.35zm2.635 5.587q.394-.052.836-.052h3.896c-.503-.482-1.31-.93-2.433-.93-1.09 0-1.83.467-2.3.982m7.389-.052h4.468l.036.004q.245.022.536.082a2 2 0 0 0-.221-.233c-.447-.41-1.18-.783-2.254-.783-1.078 0-1.75.273-2.18.584a2.4 2.4 0 0 0-.385.346m5.8-1.282c-.726-.651-1.812-1.148-3.235-1.148-1.347 0-2.338.347-3.06.868-.342.248-.61.525-.821.802-.736-.861-2.005-1.67-3.774-1.67-1.629 0-2.733.712-3.434 1.503V6.055h14.324zM3.703 16.27h16.594v-1.673c0-.703-.355-1.188-.888-1.545-.56-.374-1.263-.561-1.74-.613H6.724c-1.118 0-1.81.317-2.237.678-.57.482-.765 1.123-.783 1.496z"
              ></path>
            </svg>
          }
          name="Hoteles"
        /> */}
        <Item href="/activities" icon={<TentTree className="h-5 w-5" />} name="Actividades" />
      </Container>
    </div>
  );
}
