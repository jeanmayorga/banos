"use server";

import { contentfulClient } from "@/api/contentful";
import { TypePlacesSkeleton } from "@/contentful";

interface GetPlacesOptions {
  query?: string;
}
export const getPlaces = async (options?: GetPlacesOptions) => {
  const queryObj = options && options.query ? { "fields.title[match]": options.query } : {};

  const entries = await contentfulClient.getEntries<TypePlacesSkeleton>({
    content_type: "places",
    ...queryObj,
  });

  return entries.items;
};

export const getPlaceBySlug = async (slug: string) => {
  // const queryObj = options.query ? { "fields.title[match]": options.query } : {};
  const entries = await contentfulClient.getEntries<TypePlacesSkeleton>({
    content_type: "places",
    "fields.slug[match]": slug,
  });

  return entries.items[0];
};
