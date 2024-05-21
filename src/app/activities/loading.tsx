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
        <div className="lg:flex items-center justify-between py-2 bg-slate-100 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-xl px-2 mb-8">
          <Input
            placeholder="Buscar..."
            className="rounded-xl lg:w-[300px] w-full lg:mb-0 mb-2"
            disabled
          />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <SkeletonCardList limit={12} />
        </div>
      </div>
    </>
  );
}
