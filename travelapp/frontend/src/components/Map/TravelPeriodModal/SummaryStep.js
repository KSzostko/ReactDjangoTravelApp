import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Descriptions, Button } from 'antd';
import { closeModal } from '../../../redux/travelPeriodModal/travelPeriodModalSlice';

const formatTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':');

  /* eslint-disable */
  return `
  ${hours < 9 ? '0' : ''}${hours}:${minutes < 9 ? '0' : ''}${minutes}:${seconds < 9 ? '0' : ''}${seconds}`;
  /* eslint-enable */
};

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

function SummaryStep() {
  const dispatch = useDispatch();
  const { attractionId, date, time } = useSelector(
    (state) => state.travelPeriodModal
  );

  function addTravelStop() {
    // create TravelStopAPI and dispatch action which creates a travel stop
    // add notification with the success/error info
    dispatch(closeModal());
  }

  return (
    <Wrapper>
      <StyledDescriptions layout="vertical" bordered title="Wybrany termin">
        <Descriptions.Item label="Data">{date}</Descriptions.Item>
        <Descriptions.Item label="Początek">
          {formatTime(time.start)}
        </Descriptions.Item>
        <Descriptions.Item label="Koniec">
          {formatTime(time.end)}
        </Descriptions.Item>
      </StyledDescriptions>

      <StyledButton type="primary" onClick={addTravelStop}>
        Zatwierdź
      </StyledButton>
    </Wrapper>
  );
}

export default SummaryStep;
