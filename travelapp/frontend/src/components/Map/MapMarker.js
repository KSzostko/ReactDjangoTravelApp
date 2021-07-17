import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Marker, Tooltip } from 'react-leaflet';
import styled from 'styled-components';
import { notification, Divider } from 'antd';
import { getLocationsDetails } from '../../redux/selectedLocation/getLocationDetails/thunk';

const StyledTooltip = styled(Tooltip)`
  padding: 8px 16px;
  border-radius: 8px;
`;

const StyledDivider = styled(Divider)`
  margin: 0;
  padding: 0;
`;

function MapTooltip({ xid, point, name }) {
  const dispatch = useDispatch();

  return (
    <Marker
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

MapTooltip.propTypes = {
  xid: PropTypes.string.isRequired,
  point: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

export default MapTooltip;
