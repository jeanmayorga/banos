export function capitalizeFirstLetter(string: string) {
  const words = string.toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}
