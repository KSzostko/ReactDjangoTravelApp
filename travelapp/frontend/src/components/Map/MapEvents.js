import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMapEvents } from 'react-leaflet';
import { setCenter, setZoom } from '../../redux/map/mapSlice';
import { fetchLocations } from '../../redux/map/actions/fetchLocations/thunk';

function MapEvents() {
  const dispatch = useDispatch();
  const { center } = useSelector((state) => state.map);

  useEffect(() => {
    dispatch(
      fetchLocations({
        // TODO: think of using a proper radius
        radius: 400000,
        lat: center.lat,
        lng: center.lng,
      })
    );
  }, [dispatch]);

  const map = useMapEvents({
    mouseup: () => {
      const { lat, lng } = map.getCenter();
      dispatch(setCenter({ lat, lng }));
    },
    zoom: () => {
      const newZoom = map.getZoom();
      dispatch(setZoom(newZoom));
    },
  });

  return null;
}

export default MapEvents;
