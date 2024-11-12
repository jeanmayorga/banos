import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

import type { TypePlacesSkeleton } from "./TypePlaces";

export interface TypeActivityFields {
  slug: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  seoKeywords: EntryFieldTypes.Symbol;
  seoDescription: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.RichText;
  images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  place: EntryFieldTypes.EntryLink<TypePlacesSkeleton>;
  location?: EntryFieldTypes.Location;
  youtubeVideo?: EntryFieldTypes.Symbol;
  adultPrice: EntryFieldTypes.Number;
  childPrice: EntryFieldTypes.Integer;
}

export type TypeActivitySkeleton = EntrySkeletonType<TypeActivityFields, "activity">;
export type TypeActivity<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeActivitySkeleton, Modifiers, Locales>;
