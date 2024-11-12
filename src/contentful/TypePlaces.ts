import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypePlacesFields {
  slug: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.RichText;
}

export type TypePlacesSkeleton = EntrySkeletonType<TypePlacesFields, "places">;
export type TypePlaces<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePlacesSkeleton, Modifiers, Locales>;
