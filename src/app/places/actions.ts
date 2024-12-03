"use server";

import { contentfulClient } from "@/api/contentful";
import { TypePlacesSkeleton } from "@/contentful";

export const getPlaces = async () => {
  const entries = await contentfulClient.getEntries<TypePlacesSkeleton>({
    content_type: "places",
  });

  return entries.items;
};
