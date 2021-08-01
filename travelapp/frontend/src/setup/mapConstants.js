const defaultCenter = {
  lat: 49.505,
  lng: 24,
};

const mapSettings = {
  zoom: 13,
  minZoom: 4,
  maxZoom: 18,
  maxClusterRadius: 100,
  maxBoundsViscosity: 0,
  spiderifyOnMaxZoom: false,
  defaultCenter,
  marker: {
    default: {
      url: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
      retinaUrl:
        'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon-2x.png',
    },
    selected: {
      url:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      retinaUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    },
  },
};

export default mapSettings;
