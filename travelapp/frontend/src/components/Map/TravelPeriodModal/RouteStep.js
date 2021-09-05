import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Select, Button } from 'antd';
import { filterByDate, useErrorNotification } from 'utils';
import { chooseRoute } from 'redux/travelPeriodModal/chooseRoute/thunk';

const { Option } = Select;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-top: 16px;
`;

const StyledItem = styled(Form.Item)`
  align-self: flex-end;
`;

function RouteStep({ nextStepFn }) {
  const dispatch = useDispatch();

  const { attraction, date } = useSelector((state) => state.travelPeriodModal);
  const { isLoading, error } = useSelector(
    (state) => state.travelPeriodModal.getRoute
  );
  const { data: stopsList } = useSelector(
    (state) => state.travels.getTravelStops
  );
  const choosenDayStops = filterByDate(stopsList, date).reverse();

  useErrorNotification(error, 'Nie udało się obliczyć trasy');

  function handleChooseTransport({ transport }) {
    const waypoints = [
      {
        lat: choosenDayStops[0].attraction.lat,
        lon: choosenDayStops[0].attraction.lng,
      },
      {
        lat: attraction.lat,
        lon: attraction.lng,
      },
    ];

    dispatch(chooseRoute({ waypoints, transport })).then(() => {
      nextStepFn();
    });
  }

  return (
    <>
      {choosenDayStops.length < 1 ? (
        <Wrapper>
          <p>
            Jest to pierwszy punkt podróży w wybranym przez ciebie dniu. Przy
            kolejnych wymagane będzie podanie sposobu transportu pomiędzy
            wybranymi punktami podróży. Naciśnij przycisk Dalej aby kontynuować
          </p>
          <StyledButton type="primary" onClick={nextStepFn}>
            Dalej
          </StyledButton>
        </Wrapper>
      ) : (
        <StyledForm
          name="route-transport-choice"
          layout="vertical"
          size="large"
          onFinish={handleChooseTransport}
        >
          <Form.Item
            name="transport"
            rules={[{ required: true, message: 'Wybierz środek transportu' }]}
          >
            <Select
              style={{ width: 200 }}
              placeholder="Wybierz transport"
              aria-label="środek transportu"
              allowClear
            >
              <Option value="car">Samochód</Option>
              <Option value="bicycle">Rower</Option>
              <Option value="pedestrian">Pieszo</Option>
              <Option value="scooter">Skuter</Option>
              <Option value="truck">Ciężarówka</Option>
            </Select>
          </Form.Item>

          <StyledItem>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Dalej
            </Button>
          </StyledItem>
        </StyledForm>
      )}
    </>
  );
}

RouteStep.propTypes = {
  nextStepFn: PropTypes.func.isRequired,
};

export default RouteStep;
