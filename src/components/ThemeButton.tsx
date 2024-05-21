"use client";

import { MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { LaptopIcon } from "lucide-react";
import { useTheme } from "next-themes";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";

export function ThemeButton() {
  const { setTheme } = useTheme();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" aria-label="tema" className="rounded-full">
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-start mb-4">
            <AlertDialogCancel className="h-8 w-8 p-[4px] rounded-full">
              <XMarkIcon className="w-6 h-6" />
            </AlertDialogCancel>
          </div>
          <AlertDialogTitle>Tema</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mt-4 space-y-2">
              <div
                className="rounded-xl border px-4 py-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[.99] active:scale-[.97] transition-all cursor-pointer select-none"
                onClick={() => setTheme("light")}
              >
                <SunIcon className="h-8 w-8" />
                <div className="ml-4 text-base font-medium text-gray-600 dark:text-gray-400">
                  Claro
                </div>
              </div>
              <div
                className="rounded-xl border px-4 py-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[.99] active:scale-[.97] transition-all cursor-pointer select-none"
                onClick={() => setTheme("dark")}
              >
                <MoonIcon className="h-8 w-8" />
                <div className="ml-4 text-base font-medium text-gray-600 dark:text-gray-400">
                  Oscuro
                </div>
              </div>
              <div
                className="rounded-xl border px-4 py-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[.99] active:scale-[.97] transition-all cursor-pointer select-none"
                onClick={() => setTheme("system")}
              >
                <LaptopIcon className="h-8 w-8" />
                <div className="ml-4 text-base font-medium text-gray-600 dark:text-gray-400">
                  Sistema
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
