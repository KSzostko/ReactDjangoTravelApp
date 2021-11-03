import mapSettings from 'setup/mapConstants';
import { AttractionAPI } from 'services';
import { decodePolyline } from 'utils';

export function adjustRouteData(routeData, isTravelRoute = false) {
  if (!isTravelRoute) return routeData;

  return routeData.map(
    ({ polyline, distance, travel_time: travelTime, transport, ...rest }) => ({
      polylineData: decodePolyline(polyline),
      summary: {
        baseDuration: travelTime,
        length: distance,
        mode: transport,
      },
      ...rest,
    })
  );
}

export function isHotel(attraction) {
  return attraction?.kinds.split(',').includes('accomodations');
}

export async function addAttraction(data) {
  let dbAttraction = await AttractionAPI.getByXid(data.xid);
  if (dbAttraction === '') {
    const { xid, name, kinds, description, point } = data;
    dbAttraction = await AttractionAPI.create({
      xid,
      name: name || 'None',
      type: kinds,
      description: description || 'no description',
      lat: point.lat,
      lng: point.lon,
    });
  }

  return dbAttraction;
}

export function chooseMarker(selected, hotel) {
  const {
    default: defaultMarker,
    selected: selectedMarker,
    hotel: hotelMarker,
  } = mapSettings.marker;

  if (selected) {
    return {
      iconUrl: selectedMarker.url,
      iconRetinaUrl: selectedMarker.retinaUrl,
    };
  }

  if (hotel) {
    return { iconUrl: hotelMarker.url, iconRetinaUrl: hotelMarker.retinaUrl };
  }

  return { iconUrl: defaultMarker.url, iconRetinaUrl: defaultMarker.retinaUrl };
}
