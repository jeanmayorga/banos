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
  keywords: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.RichText;
  images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  price?: EntryFieldTypes.Number;
  place: EntryFieldTypes.EntryLink<TypePlacesSkeleton>;
}

export type TypeActivitySkeleton = EntrySkeletonType<TypeActivityFields, "activity">;
export type TypeActivity<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeActivitySkeleton, Modifiers, Locales>;