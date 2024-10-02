import { Input } from "#/components/ui/input";
import { Typography } from "#/components/ui/typography";

import { SkeletonCardList } from "./components/skeleton-cards";

export default function Page() {
  return (
    <>
      <div className="container mx-auto py-16">
        <Typography variant="h2" component="h1">
          Que hacer en Banos Ecuador
        </Typography>
        <Typography variant="muted" className="mb-8">
          En la ciudad de Banos de agua santa tienes muchas atracciones turisticas.
        </Typography>
        <div className="mb-8 items-center justify-between rounded-xl border border-slate-200 bg-slate-100 px-2 py-2 lg:flex dark:border-slate-800 dark:bg-slate-900">
          <Input
            placeholder="Buscar..."
            className="mb-2 w-full rounded-xl lg:mb-0 lg:w-[300px]"
            disabled
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <SkeletonCardList limit={12} />
        </div>
      </div>
    </>
  );
}
