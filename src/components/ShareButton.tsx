"use client";

import { ShareIcon } from "lucide-react";

import { Button } from "./ui/button";

export function ShareButton() {
  async function onShare() {
    const url = window.location.href;

    await navigator.share({ url });
  }

  return (
    <Button className="rounded-full" variant="outline" onClick={onShare}>
      <ShareIcon className="mr-1 h-6 w-4 text-muted-foreground" />
      Compartir
    </Button>
  );
}
