import { MetadataRoute } from "next";

import { getActivities } from "./activities/actions";

const domain = "https://www.banos.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activitiesResponse = await getActivities({ limit: 1000 });

  const activitiesPages: MetadataRoute.Sitemap = activitiesResponse.map((activity) => ({
    url: `${domain}/activities/${activity.fields.slug}`,
    lastModified: activity.sys.updatedAt,
    changeFrequency: "daily",
    priority: 1,
  }));

  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${domain}/activities`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...activitiesPages,
  ];
}
