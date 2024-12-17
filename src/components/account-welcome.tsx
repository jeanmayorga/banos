"use client";
import { LogOutIcon, UserRoundPenIcon } from "lucide-react";

import { signOut } from "@/app/services/auth.services";
import { User } from "@/app/services/users.services";
import { getUserRole } from "@/utils/get-user-role";

import { H2 } from "./h2";
import { Paper } from "./paper";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface Props {
  user: User;
}
export function AccountWelcome({ user }: Props) {
  async function handleSignOut() {
    await signOut();
    location.replace("/");
  }

  return (
    <Paper className="mb-8 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center border-b border-dashed pb-4 md:border-0 md:pb-0">
          <Avatar className="mr-4 h-12 w-12 rounded-full">
            <AvatarImage src={user.picture} alt={user.full_name} />
            <AvatarFallback className="rounded-lg">
              {user.full_name.slice(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <H2 className="text-xl leading-none">{user.full_name}</H2>
            <p className="text-sm leading-none text-gray-500">{getUserRole(user.role)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
          <Button variant="secondary" className="w-full rounded-full md:w-auto" disabled>
            <UserRoundPenIcon />
            Actualizar perfil
          </Button>
          <Button
            variant="secondary"
            className="w-full rounded-full md:w-auto"
            onClick={handleSignOut}
          >
            <LogOutIcon />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </Paper>
  );
}
