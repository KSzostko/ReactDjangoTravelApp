import PropTypes from 'prop-types';
import { Polyline, Tooltip } from 'react-leaflet';
import styled from 'styled-components';
import { Typography } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import { createTimeString, concatPolylines, calculateTravelData } from 'utils';

const { Text } = Typography;

const TooltipContent = styled.div`
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function RoutePolyline({ routeData, isTravelRoute }) {
  const { totalTime, totalRoute } = calculateTravelData(routeData);
  const timeString = createTimeString(totalTime);
  const routeString = (totalRoute / 1000).toFixed(2);

  return (
    <Polyline
      pathOptions={{
        color: isTravelRoute ? 'blue' : 'red',
        weight: 6,
        opacity: 0.6,
      }}
      positions={concatPolylines(routeData)}
    >
      <Tooltip sticky>
        <TooltipContent>
          {/* TODO adjust transport icon accordingly to existing types */}
          <CarOutlined style={{ marginBottom: '8px', fontSize: '16px' }} />
          <Text strong>{routeString} km</Text>
          <Text strong>{timeString}</Text>
        </TooltipContent>
      </Tooltip>
    </Polyline>
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
