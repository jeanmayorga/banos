"use client";

import { useEffect, useState } from "react";

export function useActivitySave(id: string) {
  const [isSaved, setIsSaved] = useState(false);

  function toggleSave() {
    const savedIds = localStorage.getItem("savedActivities") || "[]";
    const savedIdsParse = JSON.parse(savedIds) as string[];

    if (isSaved) {
      const newSavedIdsArray = savedIdsParse.filter((currentId) => currentId !== id);
      localStorage.setItem("savedActivities", JSON.stringify(newSavedIdsArray));

      setIsSaved(false);
    } else {
      savedIdsParse.push(id);
      localStorage.setItem("savedActivities", JSON.stringify(savedIdsParse));
      setIsSaved(true);
    }
  }

  useEffect(() => {
    const savedIds = localStorage.getItem("savedActivities") || "[]";
    const savedIdsParse = JSON.parse(savedIds) as string[];

    const exists = savedIdsParse.find((currentId) => currentId === id);

    if (exists) setIsSaved(true);
  }, [id]);

  return { isSaved, toggleSave };
}

export function getActivitiesIdsSaved() {
  const savedIds = localStorage.getItem("savedActivities") || "[]";
  const savedIdsParse = JSON.parse(savedIds) as string[];

  return savedIdsParse;
}
