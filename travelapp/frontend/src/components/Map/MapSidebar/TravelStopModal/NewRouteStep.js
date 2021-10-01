import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Select, Button } from 'antd';
import { addTravelRoute } from 'redux/travels/actions/addTravelRoute/thunk';

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

function NewRouteStep() {
  const dispatch = useDispatch();

  function addNewRoute() {
    // TODO call routing api to get necessary route data
    // TODO then it will be possible to create db object
    // dispatch(addTravelRoute({
    //   start: routeToStopData.start,
    //   destination: routeFromStopData.destination,
    // }))
  }

  // TODO add info message about the route which will be created
  return (
    <StyledForm
      name="missing-route-form"
      layout="vertical"
      size="large"
      onFinish={addNewRoute}
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
        <Button type="primary" htmlType="submit">
          Zatwierdź
        </Button>
      </StyledItem>
    </StyledForm>
  );
}

export default NewRouteStep;
