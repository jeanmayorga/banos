"use client";

import { outline, Scanner } from "@yudiel/react-qr-scanner";
import { ScanQrCodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function HeaderTicketScanButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="rounded-full" variant="ghost" onClick={() => setOpen(true)}>
        <ScanQrCodeIcon className="h-4 w-4" /> Escanear ticket
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">Escanear ticket</DialogTitle>
          </DialogHeader>
          <Separator />
          <Scanner
            allowMultiple={false}
            components={{
              audio: true,
              tracker: outline,
            }}
            onScan={(result) => {
              const uuid = result[0].rawValue;
              router.push(`/dashboard/activities/tickets/${uuid}`);
              console.log(uuid);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
