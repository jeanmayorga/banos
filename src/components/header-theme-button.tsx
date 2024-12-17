"use client";
import { MoonIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";

export function HeaderThemeButton() {
  const { theme, setTheme } = useTheme();

  if (theme === "dark") {
    return (
      <Button
        className="rounded-full"
        variant="secondary"
        size="icon"
        onClick={() => setTheme("light")}
      >
        <SunMoonIcon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      className="rounded-full"
      variant="secondary"
      size="icon"
      onClick={() => setTheme("dark")}
    >
      <MoonIcon className="h-4 w-4" />
    </Button>
  );
}
