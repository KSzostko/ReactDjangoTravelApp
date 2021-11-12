import { useSelector, useDispatch } from 'react-redux';
import { getHours, getMinutes } from 'date-fns';
import styled from 'styled-components';
import { Form, TimePicker, Button } from 'antd';
import moment from 'moment';
import { timeFormat } from 'setup/constans';
import { formatHour, useErrorNotification, range, setTimeForDate } from 'utils';
import { closeModal } from 'redux/travelStopModal/travelStopModalSlice';
import { updateTravelStop } from 'redux/travels/actions/updateTravelStop/thunk';
import { StyledSpinner } from 'styles/Spinner';

const { RangePicker } = TimePicker;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

function TravelTimeFrom() {
  const dispatch = useDispatch();

  const { isLoading: travelStopsLoading } = useSelector(
    (state) => state.travels.getTravelStops
  );
  const { data, earliestTime, latestTime } = useSelector(
    (state) => state.travelStopModal
  );
  const { isLoading: isRouteToStopLoading, error: toStopError } = useSelector(
    (state) => state.travelStopModal.getRouteToStop
  );
  const {
    isLoading: isRouteFromStopLoading,
    error: fromStopError,
  } = useSelector((state) => state.travelStopModal.getRouteFromStop);

  useErrorNotification(toStopError, 'Nie udało się uzyskać danych o drodze');
  useErrorNotification(fromStopError, 'Nie udało się uzyskać danych o drodze');

  async function handleSubmit({ period }) {
    const [startDate, endDate] = period.map((item) => item.toDate());
    const updatedStart = setTimeForDate(
      data.start_date,
      getHours(startDate),
      getMinutes(startDate)
    );
    const updatedEnd = setTimeForDate(
      data.end_date,
      getHours(endDate),
      getMinutes(endDate)
    );
    const updatedStop = {
      ...data,
      start_date: updatedStart,
      end_date: updatedEnd,
    };

    await dispatch(updateTravelStop(updatedStop));
    dispatch(closeModal());
  }

  if (isRouteToStopLoading || isRouteFromStopLoading) return <StyledSpinner />;

  return (
    <Form
      name="travel-stop-form"
      layout="vertical"
      size="large"
      onFinish={handleSubmit}
      initialValues={{
        period: [
          moment(formatHour(data?.start_date), timeFormat),
          moment(formatHour(data?.end_date), timeFormat),
        ],
      }}
    >
      <Form.Item
        name="period"
        label="Czas zwiedzania"
        rules={[{ required: true, message: 'Podaj czas zwiedzania' }]}
      >
        <RangePicker
          placeholder={['Start', 'Koniec']}
          format={timeFormat}
          disabledHours={() => [
            ...range(0, earliestTime.hours),
            ...range(latestTime.hours + 1, 24),
          ]}
          disabledMinutes={(selectedHour) => {
            if (
              selectedHour > earliestTime.hours &&
              selectedHour < latestTime.hours
            )
              return [];

            if (selectedHour === earliestTime.hours)
              return range(0, earliestTime.minutes);

            return range(latestTime.minutes, 60);
          }}
        />
      </Form.Item>

      <Form.Item style={{ color: '#fff' }}>
        <StyledButton
          type="primary"
          htmlType="submit"
          block
          loading={travelStopsLoading}
        >
          Zatwierdź
        </StyledButton>
      </Form.Item>
    </Form>
  );
}

export default TravelTimeFrom;
