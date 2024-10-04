import { Asset } from "contentful";

export function getImageUrl(image: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string> | undefined) {
  if (!image?.fields.file?.url) return null;
  return `https:${image?.fields.file?.url}`;
}
