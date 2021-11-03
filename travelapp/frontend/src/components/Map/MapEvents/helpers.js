export function getRanges(map) {
  const { lat: neLat, lng: neLng } = map.getBounds().getNorthEast();
  const { lat: swLat, lng: swLng } = map.getBounds().getSouthWest();

  const latRange = {
    min: Math.min(neLat, swLat),
    max: Math.max(neLat, swLat),
  };
  const lonRange = {
    min: Math.min(neLng, swLng),
    max: Math.max(neLng, swLng),
  };

  return { latRange, lonRange };
}
