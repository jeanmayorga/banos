import { Suspense } from "react";

import { Container } from "@/components/container";
import { Search } from "@/components/search";
import { Typography } from "@/components/ui/typography";

import { getPlaces } from "./actions";

export default async function Page() {
  const places = await getPlaces();

  return (
    <>
      <Container className="mt-24">
        <Typography variant="h1" component="h1" className="mb-2">
          Lugares
        </Typography>

        <Typography variant="muted" component="p" className="mb-4">
          Un lugar donde encuentras varias actividades
        </Typography>

        <div className="mb-4 rounded-3xl bg-white p-4 shadow-sm">
          <Suspense>
            <Search />
          </Suspense>
        </div>

        <div>
          {places.map((place) => (
            <div key={place.sys.id}>{place.fields.title}</div>
          ))}
        </div>
      </Container>
    </>
  );
}
