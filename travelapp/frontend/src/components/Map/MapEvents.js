import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMapEvents } from 'react-leaflet';
import { setCenter, setZoom } from 'redux/map/mapSlice';
import { fetchLocations } from 'redux/map/actions/fetchLocations/thunk';

function getRanges(map) {
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

function getRangesWithCenter(center) {
  const latRange = {
    min: center.lat,
    max: center.lat + 1,
  };
  const lonRange = {
    min: center.lng,
    max: center.lng + 1,
  };

  return { latRange, lonRange };
}

function MapEvents() {
  const dispatch = useDispatch();
  const { center, zoom } = useSelector((state) => state.map);
  const { data: searchData } = useSelector((state) => state.map.getSearchData);
  const [prevBounds, setPrevBounds] = useState(null);

  useEffect(() => {
    const { latRange, lonRange } = getRangesWithCenter(center);
    dispatch(fetchLocations({ latRange, lonRange }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (searchData?.lat && searchData?.lon) {
      const { lat, lon } = searchData;
      map.flyTo({ lat, lng: lon });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  // fetching locations is better than it was,
  // althougth there is still a room for an improvement
  const map = useMapEvents({
    mouseup: () => {
      const { lat, lng } = map.getCenter();
      const { latRange, lonRange } = getRanges(map);

      if (prevBounds === null || !prevBounds.contains(center)) {
        setPrevBounds(map.getBounds());
        dispatch(fetchLocations({ latRange, lonRange }));
      }

      dispatch(setCenter({ lat, lng }));
    },
    // it was necessary to change zoom event to zoomend
    // because fly to was constantly calling it during the whole animation
    zoomend: () => {
      const newZoom = map.getZoom();
      if (newZoom >= zoom) {
        const { latRange, lonRange } = getRanges(map);
        dispatch(fetchLocations({ latRange, lonRange }));
      }

      dispatch(setZoom(newZoom));
      setPrevBounds(map.getBounds());
    },
  });

  // without this sometimes map did not render correctly
  const requestRef = useRef();

  const animate = useCallback(() => {
    map.invalidateSize();
    map.getCenter();

    requestRef.current = requestAnimationFrame(animate);
  }, [map]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default MapEvents;
