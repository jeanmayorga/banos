import { Typography } from "#/components/ui/typography";

import { PlaceList } from "./components/place-list";
import { getPlaces } from "./services";

export default async function Page() {
  const places = await getPlaces();

  return (
    <>
      <div className="container mx-auto py-16">
        <Typography variant="h2" component="h1">
          Lugares en Banos de agua santa Ecuador
        </Typography>
        <Typography variant="muted" className="mb-8">
          En la ciudad de Banos de agua santa tienes muchos lugares turisticas.
        </Typography>

        <div>
          {places.map((place) => (
            <PlaceList key={place.id} place={place} />
          ))}
        </div>
      </div>
    </>
  );
}
