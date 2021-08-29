import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, TimePicker, Button } from 'antd';
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
        {/* TODO check which hour can be earliest depending on the choosen day */}
        <RangePicker placeholder={['Start', 'Koniec']} />
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
