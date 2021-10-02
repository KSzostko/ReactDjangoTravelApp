import { notification } from 'antd';

export function extractWaypoint(stopId, travelStops) {
  const travelStop = travelStops.find((ts) => ts.id === stopId);

  if (!travelStop) {
    notification.error({
      message: 'Wystąpił błąd',
      description: 'Nie ma takiego punktu podróży',
    });

    return null;
  }

  const { lat, lng } = travelStop.attraction;
  return {
    lat,
    lon: lng,
  };
}
