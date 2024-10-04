import { getAllActivities } from "../actions";

import { Card } from "./Card";

export async function BlockCardList() {
  const activities = await getAllActivities();

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {activities.map((activity, idx) => (
        <Card key={activity.fields.slug} activity={activity} idx={idx} />
      ))}
    </div>
  );
}
