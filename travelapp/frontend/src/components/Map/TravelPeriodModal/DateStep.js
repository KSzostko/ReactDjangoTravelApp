import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Select, Button } from 'antd';
import { chooseDate } from 'redux/travelPeriodModal/travelPeriodModalSlice';
import { getTravelDays } from 'utils';

const { Option } = Select;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const StyledItem = styled(Form.Item)`
  align-self: flex-end;
`;

function DateStep({ nextStepFn }) {
  const dispatch = useDispatch();
  const { start_date: startDate, end_date: endDate } = useSelector(
    (state) => state.travels.current.data
  );
  const travelDays = getTravelDays(startDate, endDate);

  function handleFinish({ date }) {
    dispatch(chooseDate(date));
    nextStepFn();
  }

  return (
    <StyledForm
      name="travel-stop-date"
      layout="vertical"
      size="large"
      onFinish={handleFinish}
    >
      <Form.Item
        name="date"
        rules={[{ required: true, message: 'Wybierz dzień' }]}
      >
        <Select
          style={{ width: 200 }}
          placeholder="Wybierz dzień"
          aria-label="dzień"
          allowClear
        >
          {travelDays.map((day, i) => (
            <Option key={i} value={day}>
              {day}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <StyledItem>
        <Button type="primary" htmlType="submit">
          Dalej
        </Button>
      </StyledItem>
    </StyledForm>
  );
}

DateStep.propTypes = {
  nextStepFn: PropTypes.func.isRequired,
};

export default DateStep;
