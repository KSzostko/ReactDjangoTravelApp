import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Spin } from 'antd';
import { getTravelDays, useErrorNotification, filterByDate } from 'utils';
import { chooseTravelStop } from 'redux/travelStopModal/travelStopModalSlice';
import { getTravelStops } from 'redux/travels/actions/getTravelStops/thunk';
import ScheduleItem from './ScheduleItem';

const { SubMenu } = Menu;

const StyledSpinner = styled(Spin)`
  margin-top: 64px;
`;

function TravelSchedule() {
  const { travelId } = useParams();
  const dispatch = useDispatch();
  const { isOpen: isTravelPeriodModalOpen } = useSelector(
    (state) => state.travelPeriodModal
  );
  const { data: travelData } = useSelector((state) => state.travels.current);
  const { data: stopsList, isLoading, error } = useSelector(
    (state) => state.travels.getTravelStops
  );

  useErrorNotification(error, 'Nie udało się wczytać przystanków podróży');

  useEffect(() => {
    if (!isTravelPeriodModalOpen) {
      dispatch(getTravelStops(parseInt(travelId)));
    }
  }, [dispatch, travelId, isTravelPeriodModalOpen]);

  function showDetails(e) {
    console.log(e);
    dispatch(chooseTravelStop(null));
  }

  if (isLoading) return <StyledSpinner />;
  if (travelData === null) return null;

  return (
    // TODO give option to see fullscreen calendar wit everything marked on it
    <Menu mode="inline" style={{ width: '100%' }} onClick={showDetails}>
      {/* TODO menu item click should open a modal with details about hours and road */}
      {/* there should also be an edit form for this trip stop */}
      {getTravelDays(travelData.start_date, travelData.end_date).map(
        (day, i) => (
          <SubMenu key={`day-${i + 1}`} title={`Dzień ${i + 1} - ${day}`}>
            {filterByDate(stopsList, day).map((travelStop) => (
              <Menu.Item key={travelStop.id}>
                <ScheduleItem travelStop={travelStop} />
              </Menu.Item>
            ))}
          </SubMenu>
        )
      )}
    </Menu>
  );
}

export default TravelSchedule;
