import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  BedDoubleIcon,
  BeefIcon,
  BikeIcon,
  HomeIcon,
  MapPinIcon,
  NewspaperIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

import { cn } from "#/utils";

import { Logo } from "./Logo";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}
export function Aside({ className }: Props) {
  return (
    <aside className={cn("col-span-2", className)}>
      <div className="sticky top-0 p-8">
        <div className="mb-8 flex items-center justify-between">
          <Logo className="text-rose-500" size="sm" />
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="secondary" size="icon">
              <EllipsisVerticalIcon />
            </Button>
          </div>
        </div>
        <div className="mb-8">
          <Button className="w-full rounded-full">
            <PlusIcon className="mr-2" /> Agregar restaurante
          </Button>
        </div>
        <div>
          <Link href="/" passHref>
            <Button
              className="mb-2 w-full justify-start rounded-full pl-0 text-gray-500 transition-all hover:pl-4"
              variant="ghost"
              size="lg"
            >
              <HomeIcon className="mr-2 h-6 w-6" /> Inicio
            </Button>
          </Link>
          <Link href="/places" passHref>
            <Button
              className="mb-2 w-full justify-start rounded-full pl-0 text-gray-500 transition-all hover:pl-4"
              variant="ghost"
              size="lg"
            >
              <MapPinIcon className="mr-2 h-6 w-6" /> Lugares Turísticos
            </Button>
          </Link>
          <Link href="/restaurants" passHref>
            <Button
              className="mb-2 w-full justify-start rounded-full pl-0 text-gray-500 transition-all hover:pl-4"
              variant="ghost"
              size="lg"
            >
              <BeefIcon className="mr-2 h-6 w-6" /> Restaurantes
            </Button>
          </Link>
          <Link href="/hotels" passHref>
            <Button
              className="mb-2 w-full justify-start rounded-full pl-0 text-gray-500 transition-all hover:pl-4"
              variant="ghost"
              size="lg"
            >
              <BedDoubleIcon className="mr-2 h-6 w-6" /> Hoteles
            </Button>
          </Link>
          <Link href="/activities" passHref>
            <Button
              className="mb-2 w-full justify-start rounded-full pl-0 text-gray-500 transition-all hover:pl-4"
              variant="ghost"
              size="lg"
            >
              <BikeIcon className="mr-2 h-6 w-6" /> Actividades
            </Button>
          </Link>
          <Link href="/blog" passHref>
            <Button
              className="mb-2 w-full justify-start rounded-full pl-0 text-gray-500 transition-all hover:pl-4"
              variant="ghost"
              size="lg"
            >
              <NewspaperIcon className="mr-2 h-6 w-6" /> Blog
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
