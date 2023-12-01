"use client";

import { ClipboardDocumentCheckIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

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

export function ShareButton() {
  const handleCopyClipboard = () => {
    console.log("copy clipboard");
    toast.success("Enlace copiado.");
  };

  const handleCopyWhatsapp = () => {
    console.log("copy whatsapp");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" aria-label="compartir">
          <ShareIcon className="mr-2 h-4 w-4" />
          Compartir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-start mb-4">
            <AlertDialogCancel className="h-8 w-8 p-[4px] rounded-full">
              <XMarkIcon className="w-6 h-6" />
            </AlertDialogCancel>
          </div>
          <AlertDialogTitle>Compartir este link</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div
                className="rounded-xl border px-4 py-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[.99] active:scale-[.97] transition-all cursor-pointer select-none"
                onClick={handleCopyClipboard}
              >
                <ClipboardDocumentCheckIcon className="h-8 w-8" />
                <div className="ml-4 text-base font-medium text-gray-600 dark:text-gray-400">
                  Copiar enlace
                </div>
              </div>
              <div
                className="rounded-xl border px-4 py-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[.99] active:scale-[.97] transition-all cursor-pointer select-none"
                onClick={handleCopyWhatsapp}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  className="h-8 w-8 rounded"
                >
                  <path fill="#25d366" d="M32 0v32H0V0z"></path>
                  <path
                    fill="#FFF"
                    d="m4 28 1.7-6.16a11.82 11.82 0 0 1-1.6-5.95C4.1 9.33 9.46 4 16.05 4a11.9 11.9 0 0 1 8.45 3.49A11.8 11.8 0 0 1 28 15.9a11.94 11.94 0 0 1-17.66 10.45zm6.63-3.8a9.93 9.93 0 0 0 15.35-8.3A9.9 9.9 0 0 0 16.05 6a9.92 9.92 0 0 0-9.93 9.9c0 2.22.65 3.88 1.75 5.63l-1 3.64 3.76-.98zm11.36-5.52c-.07-.13-.27-.2-.57-.35-.3-.15-1.75-.86-2.03-.96-.27-.1-.46-.15-.66.15s-.77.96-.94 1.15-.35.23-.65.08c-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.04s-.02-.46.13-.6l.44-.52c.15-.17.2-.3.3-.5.1-.2.05-.36-.02-.51-.08-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.66-.5l-.57-.01a1.09 1.09 0 0 0-.8.37c-.27.3-1.03 1.01-1.03 2.46s1.06 2.86 1.2 3.06c.16.2 2.1 3.18 5.08 4.45.7.3 1.26.5 1.69.63.7.22 1.36.19 1.87.11.57-.08 1.75-.71 2-1.4s.25-1.28.17-1.4z"
                  ></path>
                </svg>
                <div className="ml-4 text-base font-medium text-gray-600 dark:text-gray-400">
                  Whatsapp
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
