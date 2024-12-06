"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { LogOut, UserPenIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { authSignOut } from "@/app/auth/actions";
import { CurrentUser } from "@/app/dashboard/actions";
import { DrawerUpdateCurrentUser } from "@/app/dashboard/components/DrawerUpdateCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface Props {
  currentUser: CurrentUser;
}
export function NavUser({ currentUser }: Props) {
  const { isMobile } = useSidebar();
  const [openDrawerUpdateUser, setOpenDrawerUpdateUser] = useState(false);

  const fullName = `${currentUser.firstName} ${currentUser.lastName}`;

  useEffect(() => {
    const shouldOpen = !currentUser.firstName || !currentUser.lastName || !currentUser.businessName;
    if (shouldOpen) setOpenDrawerUpdateUser(true);
  }, [currentUser]);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={currentUser?.email} alt={currentUser?.email} />
                  <AvatarFallback className="rounded-lg">
                    {currentUser?.email?.slice(0, 2).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{fullName}</span>
                  <span className="truncate text-xs">{currentUser?.email}</span>
                </div>
                <CaretSortIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={currentUser?.email} alt={currentUser?.email} />
                    <AvatarFallback className="rounded-lg">
                      {currentUser?.email?.slice(0, 2).toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{fullName}</span>
                    <span className="truncate text-xs">{currentUser?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpenDrawerUpdateUser(true)}>
                  <UserPenIcon className="mr-2 h-4 w-4" />
                  Actualizar cuenta
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => authSignOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <DrawerUpdateCurrentUser
        currentUser={currentUser}
        open={openDrawerUpdateUser}
        setOpen={setOpenDrawerUpdateUser}
      />
    </>
  );
}
