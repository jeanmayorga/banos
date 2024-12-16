"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { EntryFields } from "contentful";
import { LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";

interface Props {
  location?: EntryFields.Location;
}

export function BlockGoogleMaps({ location }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView();

  const lat = location?.lat || 0;
  const lng = location?.lon || 0;

  useEffect(() => {
    async function loadMap() {
      const loader = new Loader({
        apiKey: "AIzaSyBn6Gu0M2bZgVZ-NioKAVtrrGc1yKraYk0",
        version: "weekly",
        id: "__googleMapsScriptId",
        libraries: ["maps", "marker"],
      });
      const google = await loader.loadPromise();
      const Map = google.maps.Map;
      const AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;
      const mapElement = document.getElementById("map");
      const options = {
        center: { lat, lng },
        zoom: 16,
        // mapTypeControl: false,
        // clickableIcons: false,
        streetViewControl: false,
        mapId: "b0ec3f57b695647c",
      };

      if (mapElement) {
        const map = new Map(mapElement, options);

        new AdvancedMarkerElement({
          map,
          position: { lat, lng },
        });
      }
    }

    if (inView && !isLoaded) {
      loadMap();
      setIsLoaded(true);
    }
  }, [inView, isLoaded, lat, lng]);

  if (!location) return null;

  return (
    <>
      <div className="mb-4 flex items-center justify-end">
        <a
          href={`https://www.google.com/maps?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="rounded-full">
            <LinkIcon />
            Abrir en Google Maps
          </Button>
        </a>
      </div>
      <div ref={ref} id="map" className="h-96 w-full rounded-xl border shadow-sm" />
    </>
  );
}
