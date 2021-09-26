import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Form, TimePicker, Button } from 'antd';
import { timeFormat } from 'setup/constans';
import { getEarlisetFreeTime, range } from 'utils';
import { chooseTime } from 'redux/travelPeriodModal/travelPeriodModalSlice';

const { RangePicker } = TimePicker;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const StyledItem = styled(Form.Item)`
  align-self: flex-end;
`;

function TimeStep({ nextStepFn }) {
  const dispatch = useDispatch();

  const { data: travelStops } = useSelector(
    (state) => state.travels.getTravelStops
  );
  const { date } = useSelector((state) => state.travelPeriodModal);
  const { data: routeData } = useSelector(
    (state) => state.travelPeriodModal.getRoute
  );

  const baseDuration = routeData?.[0]?.summary?.baseDuration || 0;
  const earliestTime = getEarlisetFreeTime(travelStops, date, baseDuration);

  function handleFinish({ timeRange }) {
    const [start, end] = timeRange.map(
      (item) => `${item.hours()}:${item.minutes()}:${item.seconds()}`
    );

    dispatch(chooseTime({ start, end }));
    nextStepFn();
  }

  return (
    <StyledForm
      name="travel-stop-time"
      layout="vertical"
      size="large"
      onFinish={handleFinish}
    >
      <Form.Item
        name="timeRange"
        rules={[{ required: true, message: 'Wybierz czas zwiedzania' }]}
      >
        <RangePicker
          placeholder={['Start', 'Koniec']}
          format={timeFormat}
          disabledHours={() => range(0, earliestTime.hours)}
          disabledMinutes={(selectedHour) => {
            if (selectedHour > earliestTime.hours) return [];

            return range(0, earliestTime.minutes);
          }}
        />
      </Form.Item>
      <StyledItem>
        <Button type="primary" htmlType="submit">
          Dalej
        </Button>
      </StyledItem>
    </StyledForm>
  );
}

TimeStep.propTypes = {
  nextStepFn: PropTypes.func.isRequired,
};

export default TimeStep;
