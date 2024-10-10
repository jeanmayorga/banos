import { createClient as createContentful } from "contentful";
import { createClient as createContentfulManagement } from "contentful-management";

const env = process.env.X_ENV || "";
const deliveryAccessToken = process.env.X_CONTENTFUL_DELIVERY_ACCESS_TOKEN || "";
const previewAccessToken = process.env.X_CONTENTFUL_PREVIEW_ACCESS_TOKEN || "";
const spaceId = process.env.X_CONTENTFUL_SPACE_ID || "";
const managementAccessToken = process.env.X_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || "";
const environmentKey = process.env.X_CONTENTFUL_ENVIRONMENT || "";

export const isProduction = env === "production";

export const contentfulClient = createContentful({
  space: spaceId,
  accessToken: isProduction ? deliveryAccessToken : previewAccessToken,
  host: isProduction ? "cdn.contentful.com" : "preview.contentful.com",
}).withoutUnresolvableLinks;

export async function contentfulManagementClient() {
  const client = createContentfulManagement({ accessToken: managementAccessToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentKey);

  return environment;
}
