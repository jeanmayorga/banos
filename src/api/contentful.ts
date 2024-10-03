import { createClient as createContentful } from "contentful";
import { createClient as createContentfulManagement } from "contentful-management";

const deliveryAccessToken = process.env.X_CONTENTFUL_DELIVERY_ACCESS_TOKEN || "";
const spaceId = process.env.X_CONTENTFUL_SPACE_ID || "";
const accessToken = process.env.X_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || "";
const environmentKey = process.env.X_CONTENTFUL_ENVIRONMENT || "";

export const contentfulClient = createContentful({
  space: spaceId,
  accessToken: deliveryAccessToken,
}).withoutUnresolvableLinks;

export async function contentfulManagementClient() {
  const client = createContentfulManagement({ accessToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentKey);

  return environment;
}
