"use client";

import { useEffect } from "react";

export default function ScrollUp() {
  useEffect(() => {
    const scrollingElement = window.document.scrollingElement;
    if (scrollingElement) {
      scrollingElement.scrollTo({
        top: 0,
        behavior: "smooth", // Esto hace el scroll suave
      });
    }
  }, []);

  return null;
}
