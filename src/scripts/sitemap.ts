import fs from "fs/promises";

import { getActivities } from "#/app/activities/services";

function generateSiteMap(urls: string[]) {
  return urls
    .map(
      (url) => `
    <url>
      <loc>${url}</loc>
    </url>`,
    )
    .join("");
}

async function main() {
  const activities = await getActivities();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!--We manually set the two URLs we know already-->
    <url>
      <loc>https://banos.app</loc>
    </url>
    <url>
      <loc>https://banos.app/activities</loc>
    </url>
    ${generateSiteMap(activities.map((activity) => `https://banos.app/activity/${activity.slug}`))}
  </urlset>
  `;

  await fs.writeFile("./public/sitemap.xml", xml);
}

main();
