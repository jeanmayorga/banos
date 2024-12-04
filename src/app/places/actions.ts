"use server";

import { contentfulClient } from "@/api/contentful";
import { TypePlacesSkeleton } from "@/contentful";

interface GetPlacesOptions {
  query?: string;
}

export const getPlaces = async () => {
  // const queryObj = options.query ? { "fields.title[match]": options.query } : {};

  const entries = await contentfulClient.getEntries<TypePlacesSkeleton>({
    content_type: "places",
    // ...queryObj,
  });

  return entries.items;
};
