"use client";
import { PencilIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { createImage } from "#/app/openia/services";

import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

interface Props {
  prompt: string;
  onCreate: (content: string) => void;
  disabled?: boolean;
}
export function CreateImageButton({ prompt, onCreate, disabled }: Props) {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [finalPrompt, setFinalPrompt] = useState("");

  useEffect(() => {
    setFinalPrompt(prompt);
  }, [prompt]);

  async function onCreateFn() {
    setIsCreating(true);
    const content = await createImage(prompt);
    onCreate(content);
    setIsCreating(false);
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prompt</DialogTitle>
          </DialogHeader>
          <Textarea
            value={finalPrompt}
            rows={15}
            onChange={(e) => setFinalPrompt(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => {
                setDialogOpen(false);
                onCreateFn();
              }}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ContextMenu>
        <ContextMenuTrigger>
          <Button
            size="sm"
            onClick={onCreateFn}
            type="button"
            variant="outline"
            isLoading={isCreating}
            disabled={isCreating || disabled}
          >
            <Sparkles className="w-4 h-4 mr-1" /> Usar IA
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setDialogOpen(true)}>
            <PencilIcon className="w-4 h-4 mr-1" /> Editar Prompt
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
