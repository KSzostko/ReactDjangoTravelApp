import PropTypes from 'prop-types';
import { Polyline, Tooltip } from 'react-leaflet';
import styled from 'styled-components';
import { Typography } from 'antd';
import { createTimeString } from 'utils';
import TransportIcon from './TransportIcon';

const { Text } = Typography;

const TooltipContent = styled.div`
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function RoutePolyline({ routeData, isTravelRoute }) {
  // TODO show route data
  return (
    <>
      {routeData.map((route, i) => (
        <Polyline
          key={i}
          pathOptions={{
            color: isTravelRoute ? 'blue' : 'red',
            weight: 6,
            opacity: 0.6,
          }}
          positions={route.polylineData.polyline}
        >
          <Tooltip sticky>
            <TooltipContent>
              <TransportIcon name={route.summary.mode} />
              <Text strong>{(route.summary.length / 1000).toFixed(2)} km</Text>
              <Text strong>{createTimeString(route.summary.baseDuration)}</Text>
            </TooltipContent>
          </Tooltip>
        </Polyline>
      ))}
    </>
  );
}

RoutePolyline.propTypes = {
  isTravelRoute: PropTypes.bool,
  routeData: PropTypes.arrayOf(
    PropTypes.shape({
      polylineData: PropTypes.shape({
        polyline: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
          .isRequired,
      }),
      summary: PropTypes.shape({
        baseDuration: PropTypes.number.isRequired,
        duration: PropTypes.number,
        length: PropTypes.number.isRequired,
        mode: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
};

RoutePolyline.defaultProps = {
  isTravelRoute: false,
};

export default RoutePolyline;
