import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Collapse, Button } from 'antd';
import { cutText } from 'utils';

const { Panel } = Collapse;

const StyledButton = styled(Button)`
  position: absolute;
  top: ${(props) => (props.danger ? '90px' : '55px')};
  left: 64px;
  width: 150px;
  z-index: 999;

  @media (min-width: 500px) {
    top: ${(props) => (props.danger ? '55px' : '16px')};
    left: auto;
    right: 16px;
  }
`;

const RouteCollapse = styled(Collapse)`
  position: absolute;
  top: 125px;
  left: 64px;
  width: 150px;
  z-index: 999;

  @media (min-width: 500px) {
    top: 95px;
    left: auto;
    right: 16px;
  }
`;

const StyledList = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
`;

function RouteOptions({
  handleShowRouteFn,
  handleRemoveRouteFn,
  routeWaypoints,
}) {
  const { isLoading: isRouteLoading } = useSelector(
    (state) => state.map.getRoute
  );

  return (
    <>
      <StyledButton
        type="primary"
        disabled={isRouteLoading}
        onClick={handleShowRouteFn}
      >
        {isRouteLoading ? 'Wyznaczam...' : 'Wyznacz trasę'}
      </StyledButton>
      <StyledButton
        danger
        type="primary"
        disabled={isRouteLoading}
        onClick={handleRemoveRouteFn}
      >
        Wyczyść trasę
      </StyledButton>
      <RouteCollapse accordion expandIconPosition="right">
        <Panel header="Wybrana trasa">
          <StyledList>
            {routeWaypoints.map(({ xid, name }) => (
              <li key={xid}>{cutText(name, 15)}</li>
            ))}
          </StyledList>
        </Panel>
      </RouteCollapse>
    </>
  );
}

RouteOptions.propTypes = {
  handleRemoveRouteFn: PropTypes.func.isRequired,
  handleShowRouteFn: PropTypes.func.isRequired,
  routeWaypoints: PropTypes.arrayOf(
    PropTypes.shape({
      xid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RouteOptions;
