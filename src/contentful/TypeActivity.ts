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
  isPurchaseEnabled: EntryFieldTypes.Boolean;
  adultPrice?: EntryFieldTypes.Number;
  childPrice?: EntryFieldTypes.Integer;
  openAt?: EntryFieldTypes.Symbol;
  closeAt?: EntryFieldTypes.Symbol;
  tiktokVideoId?: EntryFieldTypes.Symbol;
  images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  place: EntryFieldTypes.EntryLink<TypePlacesSkeleton>;
  location?: EntryFieldTypes.Location;
  youtubeVideo?: EntryFieldTypes.Symbol;
  visits?: EntryFieldTypes.Integer;
}

export type TypeActivitySkeleton = EntrySkeletonType<TypeActivityFields, "activity">;
export type TypeActivity<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeActivitySkeleton, Modifiers, Locales>;
