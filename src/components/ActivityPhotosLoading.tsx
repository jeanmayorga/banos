import { ImageIcon } from "lucide-react";

import { Button } from "./ui/button";

export function ActivityPhotosLoading() {
  return (
    <div className="w-full bg-slate-100 mb-8 py-8">
      <div className="container max-w-6xl mx-auto relative">
        <div className="lg:h-[336px] grid grid-rows-2 grid-cols-4 gap-2 rounded-xl overflow-hidden">
          <div className="row-span-2 col-span-2 bg-slate-200"></div>
          <div className="bg-slate-200"></div>
          <div className="bg-slate-200"></div>
          <div className="bg-slate-200"></div>
          <div className="bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}
