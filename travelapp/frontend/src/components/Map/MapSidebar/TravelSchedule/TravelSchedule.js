import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Spin } from 'antd';
import { getTravelDays, useErrorNotification, filterByDate } from 'utils';
import {
  chooseTravelStop,
  setEarliestTime,
  setLatestTime,
} from 'redux/travelStopModal/travelStopModalSlice';
import { getRouteToStop } from 'redux/travelStopModal/actions/getRouteToStop/thunk';
import { getRouteFromStop } from 'redux/travelStopModal/actions/getRouteFromStop/thunk';
import { getTravelStops } from 'redux/travels/actions/getTravelStops/thunk';
import ScheduleItem from './ScheduleItem';
import { calculateTime, showErroMessage } from './helpers';

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
  const { isOpen: isTravelStopModalOpen } = useSelector(
    (state) => state.travelStopModal
  );
  const { data: travelData } = useSelector((state) => state.travels.current);
  const { data: stopsList, isLoading, error } = useSelector(
    (state) => state.travels.getTravelStops
  );

  useErrorNotification(error, 'Nie udało się wczytać przystanków podróży');

  useEffect(() => {
    if (!isTravelPeriodModalOpen && !isTravelStopModalOpen) {
      dispatch(getTravelStops(parseInt(travelId)));
    }
  }, [dispatch, travelId, isTravelPeriodModalOpen, isTravelStopModalOpen]);

  // TODO fly to the choosen stop
  async function showDetails(e) {
    const selectedStopIndex = stopsList.findIndex(
      (stop) => stop.id === parseInt(e.key)
    );
    if (selectedStopIndex === -1) {
      showErroMessage('Nie ma takiego punktu podróży');
      return;
    }

    const selectedStop = stopsList[selectedStopIndex];
    let earliestTime = { hours: 0, minutes: 0 };
    let latestTime = { hours: 23, minutes: 59 };
    dispatch(chooseTravelStop(selectedStop));

    if (selectedStopIndex > 0) {
      await dispatch(getRouteToStop(selectedStop.id))
        .unwrap()
        .then((routeData) => {
          const prevStop = stopsList[selectedStopIndex - 1];
          earliestTime = calculateTime(prevStop, routeData);
        })
        .catch((err) => {
          showErroMessage(err.message);
        });
    }

    if (selectedStopIndex < stopsList.length - 1) {
      await dispatch(getRouteFromStop(selectedStop.id))
        .unwrap()
        .then((routeData) => {
          const nextStop = stopsList[selectedStopIndex + 1];
          latestTime = calculateTime(nextStop, routeData, true);
        })
        .catch((err) => {
          showErroMessage(err.message);
        });
    }

    dispatch(setEarliestTime(earliestTime));
    dispatch(setLatestTime(latestTime));
  }

  if (isLoading) return <StyledSpinner />;
  if (travelData === null) return null;

  return (
    // TODO give option to see fullscreen calendar wit everything marked on it
    <Menu mode="inline" style={{ width: '100%' }} onClick={showDetails}>
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
