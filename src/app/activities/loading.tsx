import { ActivityCardLoading } from "#/components/ActivityCardLoading";
import { Typography } from "#/components/ui/typography";

export default function Page() {
  return (
    <>
      <div className="container mx-auto py-16">
        <div className="mb-12">
          <Typography variant="h2" component="h1">
            Que hacer en Banos Ecuador
          </Typography>
          <Typography variant="muted">
            En la ciudad de Banos de agua santa tienes muchas atracciones turisticas.
          </Typography>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from(Array(10).keys()).map((item) => (
            <ActivityCardLoading key={item} />
          ))}
        </div>
      </div>
    </>
  );
}
