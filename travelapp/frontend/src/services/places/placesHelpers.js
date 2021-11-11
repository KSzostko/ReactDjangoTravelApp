/* eslint-disable */
// full list of categories
// https://opentripmap.io/catalog
export const getAllCategories = () => {
  const categories = [
    'accomodations',
    'adult',
    'amusements',
    'interesting_places',
    'sport',
    'tourist_facilities',
  ];
  return categories.toString();
};

const BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

export function getFindInRadiusUrl(radius, lat, lon, categoriesList) {
  if (process.env.NODE_ENV === 'production') {
    return `/.netlify/functions/findInRadius?radius=${radius}&lat=${lat}&lon=${lon}&categoriesList=${categoriesList.toString()}`;
  }

  return `${BASE_URL}/radius?&radius=${radius}&lat=${lat}&lon=${lon}&kinds=${categoriesList.toString()}&format=json&rate=2&apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`;
}

export function getFindInBoxUrl(latRange, lonRange, categoriesList) {
  if (process.env.NODE_ENV === 'production') {
    return `/.netlify/functions/findInBox?latData=${JSON.stringify(latRange)}&lonData=${JSON.stringify(lonRange)}&categoriesList=${categoriesList.toString()}`;
  }

  return `${BASE_URL}/bbox?&lat_min=${latRange.min}&lat_max=${latRange.max}&lon_min=${lonRange.min}&lon_max=${lonRange.max}&kinds=${categoriesList.toString()}&format=json&rate=2&apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`;
}

export function getFindByNameUrl(place) {
  if (process.env.NODE_ENV === 'production') {
    return `/.netlify/functions/findPlace?place=${place}`;
  }

  return `${BASE_URL}/geoname?name=${place}&apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`;
}

export function getDetailsUrl(xid) {
  if (process.env.NODE_ENV === 'production') {
    return `/.netlify/functions/placeDetails?xid=${xid}`;
  }

  return `${BASE_URL}/xid/${xid}?apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`;
}
