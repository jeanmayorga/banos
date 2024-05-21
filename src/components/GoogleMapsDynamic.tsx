"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { renderToHTML } from "next/dist/server/render";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  latitude: number;
  longitude: number;
  zoom?: number;
  markers?: {
    latitude: number;
    longitude: number;
    content?: React.ReactNode;
  }[];
  className?: string;
}

export function GoogleMapsDynamic({ latitude, longitude, zoom, markers = [], className }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView();

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
        center: { lat: latitude, lng: longitude },
        zoom,
        mapTypeControl: false,
        clickableIcons: false,
        streetViewControl: false,
        mapId: "b0ec3f57b695647c",
      };

      if (mapElement) {
        const map = new Map(mapElement, options);

        markers.forEach((marker) => {
          new AdvancedMarkerElement({
            map,
            position: { lat: marker.latitude, lng: marker.longitude },
          });
        });
      }
    }

    if (inView && !isLoaded) {
      loadMap();
      setIsLoaded(true);
    }
  }, [inView, isLoaded, latitude, longitude, zoom, markers]);

  return <div ref={ref} id="map" className={className} />;
}
