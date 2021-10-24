import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Tooltip, Button } from 'antd';
import { useErrorNotification } from 'utils';
import { getWaypointsSequence } from 'redux/travels/actions/getWaypointsSequence/thunk';
import { prepareWaypointsData } from './helpers';

const StyledButton = styled(Button)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

function PopoverContent() {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.travels.getWaypointsSequence);
  const { data: stopsList } = useSelector(
    (state) => state.travels.getTravelStops
  );

  useErrorNotification(error, 'Nie udało się wyznaczyć optymalnej trasy');

  function handleClick() {
    const waypoints = prepareWaypointsData(stopsList);
    dispatch(getWaypointsSequence({ waypoints, transport: 'car' }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledButton style={{ color: '#000' }} type="link">
        Pokaż na mapie
      </StyledButton>
      <StyledButton style={{ color: '#000' }} type="link" onClick={handleClick}>
        Optymalizuj rozkład
      </StyledButton>
      <Tooltip
        trigger="click"
        placement="right"
        title="Kliknij w dowolny element menu aby zobaczyć jego szczegóły"
      >
        <StyledButton style={{ color: '#000' }} type="link">
          Pomoc
        </StyledButton>
      </Tooltip>
    </div>
  );
}

export default PopoverContent;
