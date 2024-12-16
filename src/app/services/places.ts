"use server";

import { Entry } from "contentful";

import { contentfulClient } from "@/api/contentful";
import { TypePlacesSkeleton } from "@/contentful";

export type Place = Entry<TypePlacesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

interface GetPlacesOptions {
  query?: string;
}
export const getPlaces = async (options?: GetPlacesOptions): Promise<Place[]> => {
  const queryObj = options && options.query ? { "fields.title[match]": options.query } : {};

  const entries = await contentfulClient.getEntries<TypePlacesSkeleton>({
    content_type: "places",
    ...queryObj,
  });

  return entries.items;
};

export const getPlaceBySlug = async (slug: string): Promise<Place> => {
  const entries = await contentfulClient.getEntries<TypePlacesSkeleton>({
    content_type: "places",
    "fields.slug[match]": slug,
  });

  return entries.items[0];
};
