import { Metadata } from "next";

import { JumboHome } from "#/components/JumboHome";

import { getActivities } from "./activities/services";

export const metadata: Metadata = {
  title: "Banos de Agua Santa | Ecuador",
};

export default async function Page() {
  const activitiesJumbo = await getActivities({
    limit: 5,
    sortBy: "visits",
  });

  return (
    <>
      <div className="container mx-auto py-8">
        <JumboHome activities={activitiesJumbo} />
      </div>
    </>
  );
}
