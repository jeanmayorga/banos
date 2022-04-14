import SlugifyLibrary from "slugify";

export function slugify(words: string) {
  return SlugifyLibrary(words, { lower: true, strict: true });
}
