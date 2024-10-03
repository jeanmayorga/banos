import { createClient } from "contentful";

const contentful = createClient({
  space: process.env.X_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.X_CONTENTFUL_DELIVERY_ACCESS_TOKEN || "",
});

export const client = contentful.withoutUnresolvableLinks;
