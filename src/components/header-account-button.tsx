"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { CircleUserRoundIcon, LogOutIcon, UserPenIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { authSignOut } from "@/app/auth/actions";
import { CurrentUser } from "@/app/dashboard/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { HeaderAccountDialog } from "./header-account-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  currentUser: CurrentUser;
}
export function HeaderAccountButton({ currentUser }: Props) {
  const { theme, setTheme } = useTheme();
  const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  useEffect(() => {
    const shouldOpen = !currentUser.firstName || !currentUser.lastName || !currentUser.businessName;
    if (shouldOpen) setOpenAccountDialog(true);
  }, [currentUser]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" variant="secondary">
            <CircleUserRoundIcon className="h-4 w-4" /> {fullName}
            <CaretSortIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
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
            <DropdownMenuItem onClick={() => setOpenAccountDialog(true)}>
              <UserPenIcon className="mr-2 h-4 w-4" />
              Actualizar cuenta
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => authSignOut()}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <HeaderAccountDialog
        currentUser={currentUser}
        open={openAccountDialog}
        setOpen={setOpenAccountDialog}
      />
    </>
  );
}
