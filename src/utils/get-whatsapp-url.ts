export function getWhatsappUrl(options: { text?: string; url?: string; phone?: string }) {
  let text = options.text || "";

  if (options.url) {
    text = text + `${encodeURI(options.url)}`;
  }

  return `https://wa.me/${options.phone || ""}?text=${text}`;
}
