"use client";

import { CircleUserRoundIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { signOut } from "@/app/services/auth.services";
import { Session } from "@/app/services/session.service";
import { cn } from "@/utils";
import { getUserRole } from "@/utils/get-user-role";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { DropdownMenuLabel } from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface Props {
  session?: Session | null;
  menu: {
    href: string;
    icon: JSX.Element;
    text: string;
  }[];
}
export function HeaderMobileButton({ menu, session }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeSheet() {
    setMenuOpen(false);
  }

  async function handleSignOut() {
    await signOut();
    location.reload();
  }

  return (
    <>
      <Button
        className="rounded-full md:hidden"
        variant="secondary"
        size="icon"
        onClick={() => setMenuOpen(true)}
      >
        <MenuIcon className="h-4 w-4" />
      </Button>
      <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
        <DrawerContent>
          {!session && (
            <DrawerHeader>
              <DrawerTitle className="mb-2 text-left">Menu</DrawerTitle>
            </DrawerHeader>
          )}
          <div className={cn("px-4", session ? "py-2" : "pb-8")}>
            {session && session.user ? (
              <DropdownMenuLabel className="my-4 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-7 w-7 rounded-full">
                    <AvatarImage src={session.user.picture} alt={session.user.full_name} />
                    <AvatarFallback className="rounded-lg">
                      {session.user.full_name.slice(0, 2).toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{session.user.full_name}</span>
                    <span className="truncate text-xs text-gray-600 dark:text-gray-200">
                      {getUserRole(session.user.role)}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            ) : (
              <Link href="/auth" onClick={closeSheet}>
                <Button className="mb-6 w-full justify-start rounded-full" variant="outline">
                  <CircleUserRoundIcon className="h-4 w-4" /> Iniciar sesión
                </Button>
              </Link>
            )}
            {menu.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeSheet}>
                <Button variant="ghost" className="w-full justify-start rounded-full">
                  {item.icon} {item.text}
                </Button>
              </Link>
            ))}

            {session && (
              <>
                <Link href="/account" onClick={closeSheet}>
                  <Button variant="ghost" className="w-full justify-start rounded-full">
                    <UserIcon className="h-4 w-4" />
                    Mi Cuenta
                  </Button>
                </Link>
                <div className="pb-4 pt-16">
                  <Button
                    className="w-full rounded-full"
                    variant="destructive"
                    onClick={handleSignOut}
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Cerrar sesión
                  </Button>
                </div>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
