"use client";

import { HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

import { useActivitySave } from "../hooks/useActivitySave";

interface Props {
  id: string;
}
export function SaveButton({ id }: Props) {
  const { isSaved, toggleSave } = useActivitySave(id);

  return (
    <Button
      onClick={toggleSave}
      variant="outline"
      className={cn(
        "rounded-full",
        isSaved && "bg-rose-400 text-white hover:bg-rose-500 hover:text-white",
      )}
    >
      <HeartIcon className={cn("mr-1 h-4 w-4", isSaved ? "fill-white" : "text-muted-foreground")} />
      {isSaved ? "Guardado" : "Guardar"}
    </Button>
  );
}
