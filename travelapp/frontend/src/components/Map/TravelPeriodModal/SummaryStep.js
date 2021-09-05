import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { notification, Descriptions, Button } from 'antd';
import { parseDate } from 'utils';
import { addTravelStop } from 'redux/travels/actions/addTravelStop/thunk';
import { closeModal } from 'redux/travelPeriodModal/travelPeriodModalSlice';

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

function SummaryStep({ setCurrentStepFn }) {
  const dispatch = useDispatch();
  const { attraction, date, time } = useSelector(
    (state) => state.travelPeriodModal
  );
  const { data: currentTravel } = useSelector((state) => state.travels.current);

  async function handleAdd() {
    const startDate = parseDate(`${date} ${time.start}`, 'dd.MM.yyyy KK:mm:ss');
    const endDate = parseDate(`${date} ${time.end}`, 'dd.MM.yyyy KK:mm:ss');

    await dispatch(
      addTravelStop({
        travel: currentTravel.id,
        start_date: startDate,
        end_date: endDate,
        attraction,
      })
    )
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Operacja przebiegła pomyślnie',
          description: 'Dodałeś nowy punkt podróży',
        });
      })
      .catch(({ message }) => {
        notification.error({
          message: 'Wystąpił błąd',
          description: message,
        });
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
