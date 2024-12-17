"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon, LogOutIcon, MoonIcon, SunMoonIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { signOut } from "@/app/services/auth.services";
import { Session } from "@/app/services/session.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserRole } from "@/utils/get-user-role";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  session: Session;
}
export function HeaderAccountButton({ session }: Props) {
  const user = session.user;

  async function handleSignOut() {
    await signOut();
    location.reload();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden md:flex">
          <Button className="rounded-full px-1" variant="secondary">
            <Avatar className="h-7 w-7 rounded-full">
              <AvatarImage src={user.picture} alt={user.full_name} />
              <AvatarFallback className="rounded-lg">
                {user.full_name.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ChevronDownIcon className="mr-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-56 rounded-xl" align="end" sideOffset={4}>
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-7 w-7 rounded-full">
                <AvatarImage src={user.picture} alt={user.full_name} />
                <AvatarFallback className="rounded-lg">
                  {user.full_name.slice(0, 2).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.full_name}</span>
                <span className="truncate text-xs text-gray-600 dark:text-gray-200">
                  {getUserRole(user.role)}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/account">
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              Mi cuenta
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleSignOut}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
