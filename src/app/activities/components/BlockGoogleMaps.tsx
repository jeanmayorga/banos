"use client";

import { EntryFields } from "contentful";

interface Props {
  location?: EntryFields.Location;
}

export function BlockGoogleMaps({ location }: Props) {
  const lat = location?.lat || 0;
  const lng = location?.lon || 0;

  if (!location) return null;

  return (
    <section className="mb-8">
      <div className="mb-2 text-sm font-semibold uppercase tracking-tight text-[#007276]">
        Ubicación:
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?size=500x200&zoom=14&maptype=roadmap\&markers=size:mid%7Ccolor:red%7C${lat},${lng}&key=AIzaSyBn6Gu0M2bZgVZ-NioKAVtrrGc1yKraYk0`}
          className="w-full rounded-3xl"
        />
      </a>
    </section>
  );
}
