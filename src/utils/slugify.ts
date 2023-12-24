import slugifyPackage from "slugify";

export function slugify(text?: string | undefined | null) {
  if (!text) return "";

  return slugifyPackage(text, {
    replacement: "-",
    lower: true,
    strict: true,
    trim: true,
  });
}
