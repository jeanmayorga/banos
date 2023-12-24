import { Sparkles } from "lucide-react";
import { useState } from "react";

import { createContent } from "#/app/openia/services";

import { Button } from "./ui/button";

interface Props {
  prompt: string;
  onCreate: (content: string) => void;
  disabled?: boolean;
}
export function CreateContentButton({ prompt, onCreate, disabled }: Props) {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  async function onCreateFn() {
    setIsCreating(true);
    const content = await createContent(prompt);
    onCreate(content);
    setIsCreating(false);
  }

  return (
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
  );
}
