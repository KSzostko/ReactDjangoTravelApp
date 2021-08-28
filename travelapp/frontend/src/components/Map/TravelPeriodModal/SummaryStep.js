import { useSelector, useDispatch } from 'react-redux';
import { parse } from 'date-fns';
import { pl } from 'date-fns/locale';
import styled from 'styled-components';
import { notification, Descriptions, Button } from 'antd';
import { TravelStopAPI } from '../../../services';
import { closeModal } from '../../../redux/travelPeriodModal/travelPeriodModalSlice';

const formatTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':');

  /* eslint-disable */
  return `
  ${hours < 9 ? '0' : ''}${hours}:${minutes < 9 ? '0' : ''}${minutes}:${seconds < 9 ? '0' : ''}${seconds}`;
  /* eslint-enable */
};

const parseDate = (date) =>
  parse(date, 'dd.MM.yyyy KK:mm:ss', new Date(), {
    locale: pl,
  });

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

  async function addTravelStop() {
    const startDate = parseDate(`${date} ${time.start}`);
    const endDate = parseDate(`${date} ${time.end}`);

    // TODO try to separte this logic from the component and put it in redux
    try {
      await TravelStopAPI.create({
        start_date: startDate,
        end_date: endDate,
        attraction: attractionId,
      });

      notification.success({
        message: 'Operacja przebiegła pomyślnie',
        description: 'Dodałeś nowy punkt podróży',
      });
    } catch (error) {
      notification.error({
        message: 'Wystąpił błąd',
        description: error,
      });
    } finally {
      dispatch(closeModal());
    }
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

      <StyledButton type="primary" onClick={addTravelStop}>
        Zatwierdź
      </StyledButton>
    </Wrapper>
  );
}

export default SummaryStep;
