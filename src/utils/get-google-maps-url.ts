export function getGoogleMapUrl(options: {
  latitude: number;
  longitude: number;
  zoom?: number;
  width?: number;
  height?: number;
  maptype?: "roadmap" | "satellite" | "terrain" | "hybrid";
  markers?: {
    color: string;
    label: String;
    latitude: number;
    longitude: number;
  }[];
}) {
  const key = "AIzaSyBn6Gu0M2bZgVZ-NioKAVtrrGc1yKraYk0";
  const center =
    options.latitude && options.longitude
      ? `${options.latitude},${options.longitude}`
      : "Banos, Tungurahua";
  const zoom = options.zoom ? String(options.zoom) : "14";
  const size = options.width && options.height ? `${options.width}x${options.height}` : "400x400";
  const maptype = options.maptype || "roadmap";

  const searchParams = new URLSearchParams({
    center,
    key,
    size,
    zoom,
    maptype,
  });

  if (options.markers && options.markers.length > 0) {
    options.markers.forEach((marker) => {
      searchParams.append(
        "markers",
        `color:${marker.color}|label:${marker.label}|${options.latitude},${options.longitude}`,
      );
    });
  }

  return `https://maps.googleapis.com/maps/api/staticmap?${searchParams}`;
}
