export function formatSlug(slug: string | string[] | undefined): string {
  if (!slug) {
    return "";
  }
  return [slug].flat().join("/");
}
