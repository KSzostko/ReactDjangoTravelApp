import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Descriptions, Button } from 'antd';
import { parseDate, encodePolyline, filterByDate } from 'utils';
import { addTravelStop } from 'redux/travels/actions/addTravelStop/thunk';
import { addTravelRoute } from 'redux/travels/actions/addTravelRoute/thunk';
import { closeModal } from 'redux/travelPeriodModal/travelPeriodModalSlice';
import { formatTime, displayError, displaySuccess } from './helpers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDescriptions = styled(Descriptions)`
  margin-top: 32px;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-top: 16px;
`;

function SummaryStep({ setCurrentStepFn }) {
  const dispatch = useDispatch();
  const { attraction, date, time } = useSelector(
    (state) => state.travelPeriodModal
  );
  const { data: routeData } = useSelector(
    (state) => state.travelPeriodModal.getRoute
  );
  const { data: currentTravel } = useSelector((state) => state.travels.current);
  const { data: stopsList } = useSelector(
    (state) => state.travels.getTravelStops
  );
  const [startStop] = filterByDate(stopsList, date).reverse();

  async function handleAdd() {
    const startDate = parseDate(`${date} ${time.start}`, 'dd.MM.yyyy HH:mm');
    const endDate = parseDate(`${date} ${time.end}`, 'dd.MM.yyyy HH:mm');

    await dispatch(
      addTravelStop({
        travel: currentTravel.id,
        start_date: startDate,
        end_date: endDate,
        attraction,
      })
    )
      .unwrap()
      .then((result) => {
        if (routeData === null) {
          displaySuccess('Dodałeś nowy punkt podróży');
          return;
        }

        const { length, baseDuration, mode } = routeData[0].summary;
        dispatch(
          addTravelRoute({
            start: startStop.id,
            destination: result.id,
            transport: mode,
            distance: length,
            travel_time: baseDuration,
            polyline: encodePolyline(routeData[0].polylineData),
          })
        )
          .unwrap()
          .then(() => {
            displaySuccess('Dodałeś nowy punkt podróży wraz z trasą');
          })
          .catch(({ message }) => {
            displayError(message);
          });
      })
      .catch(({ message }) => {
        displayError(message);
      });

    setCurrentStepFn(0);
    dispatch(closeModal());
  }

  return (
    <Wrapper>
      <StyledDescriptions layout="vertical" bordered title="Wybrany termin">
        <Descriptions.Item label="Data">{date}</Descriptions.Item>
        <Descriptions.Item label="Początek">
          {time?.start ? formatTime(time.start) : 'Brak'}
        </Descriptions.Item>
        <Descriptions.Item label="Koniec">
          {time?.end ? formatTime(time.end) : 'Brak'}
        </Descriptions.Item>
      </StyledDescriptions>

      <StyledButton type="primary" onClick={handleAdd}>
        Zatwierdź
      </StyledButton>
    </Wrapper>
  );
}

SummaryStep.propTypes = {
  setCurrentStepFn: PropTypes.func.isRequired,
};

export default SummaryStep;
