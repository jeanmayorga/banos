import { createClient } from "contentful-management";

const accessToken = process.env.X_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || "";
const spaceId = process.env.X_CONTENTFUL_SPACE_ID || "";
const environmentKey = process.env.X_CONTENTFUL_ENVIRONMENT || "";

export async function contentfulManagementClient() {
  const client = createClient({ accessToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentKey);

  return environment;
}
