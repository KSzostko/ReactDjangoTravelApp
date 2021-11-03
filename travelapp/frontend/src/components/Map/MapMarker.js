import L from 'leaflet';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Marker, Tooltip } from 'react-leaflet';
import styled from 'styled-components';
import { notification, Divider } from 'antd';
import { getLocationsDetails } from 'redux/selectedLocation/getLocationDetails/thunk';
import { chooseMarker } from './helpers';

const StyledTooltip = styled(Tooltip)`
  padding: 8px 16px;
  border-radius: 8px;
`;

const StyledDivider = styled(Divider)`
  margin: 0;
  padding: 0;
`;

function MapMarker({ xid, point, name, selected, isHotel }) {
  const dispatch = useDispatch();

  const { iconUrl, iconRetinaUrl } = chooseMarker(selected, isHotel);
  const markerIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  return (
    <Marker
      icon={markerIcon}
      position={point}
      eventHandlers={{
        click: async () => {
          const resp = await dispatch(getLocationsDetails(xid));

          if (resp.error) {
            notification.error({
              message: 'Wystąpił błąd',
              description: resp.payload,
            });
          }
        },
      }}
    >
      <StyledTooltip>
        <p style={{ marginBottom: '8px', marginTop: '8px' }}>
          {name === '' ? 'Brak nazwy' : name}
        </p>
        <StyledDivider />
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>
          Kliknij, aby zobaczyć więcej
        </p>
      </StyledTooltip>
    </Marker>
  );
}

MapMarker.propTypes = {
  xid: PropTypes.string.isRequired,
  point: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  isHotel: PropTypes.bool.isRequired,
};

export default MapMarker;
