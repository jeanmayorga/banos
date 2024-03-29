"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Typography } from "./ui/typography";

interface Props {
  content: string;
}
export function ActivityContent({ content }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const paragraphs = content.split("\n\n");
  const hasMoreThan1Paragraph = paragraphs.length > 1;

  return (
    <>
      <Typography variant="p" className="text-justify">
        {paragraphs[0]}
      </Typography>
      {isOpen && (
        <Typography variant="p" className="text-justify">
          {paragraphs[1]}
        </Typography>
      )}

      {hasMoreThan1Paragraph && (
        <Button variant="link" className="px-0" onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {isOpen ? "Leer menos" : "Leer más"}
        </Button>
      )}
    </>
  );
}
