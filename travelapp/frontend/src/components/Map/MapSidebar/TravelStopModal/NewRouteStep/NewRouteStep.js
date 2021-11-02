import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { notification, Form, Select, Button } from 'antd';
import { useErrorNotification, encodePolyline } from 'utils';
import { closeModal } from 'redux/travelStopModal/travelStopModalSlice';
import { calculateNewRoute } from 'redux/travelStopModal/actions/calculateNewRoute/thunk';
import { deleteTravelStop } from 'redux/travels/actions/deleteTravelStop/thunk';
import { addTravelRoute } from 'redux/travels/actions/addTravelRoute/thunk';
import { extractWaypoint } from './helpers';

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

  const { data: travelStops, isLoading: travelStopsLoading } = useSelector(
    (state) => state.travels.getTravelStops
  );
  const { id: selectedStopId } = useSelector(
    (state) => state.travelStopModal.data
  );
  const { data: routeToStop } = useSelector(
    (state) => state.travelStopModal.getRouteToStop
  );
  const { data: routeFromStop } = useSelector(
    (state) => state.travelStopModal.getRouteFromStop
  );
  const { isLoading, error } = useSelector(
    (state) => state.travelStopModal.getNewRoute
  );

  useErrorNotification(error, 'Nie udało się obliczyć nowej trasy');

  async function addNewRoute({ transport }) {
    if (!routeToStop?.start || !routeFromStop?.destination) return;
    const { start: startId } = routeToStop;
    const { destination: destId } = routeFromStop;

    const startWaypoint = extractWaypoint(startId, travelStops);
    const destWaypoint = extractWaypoint(destId, travelStops);
    if (!startWaypoint || !destWaypoint) return;

    dispatch(
      calculateNewRoute({
        waypoints: [startWaypoint, destWaypoint],
        transport,
      })
    )
      .unwrap()
      .then(async (resp) => {
        await dispatch(deleteTravelStop(selectedStopId));
        await dispatch(
          addTravelRoute({
            start: startId,
            destination: destId,
            transport,
            distance: resp[0].summary.length,
            travel_time: resp[0].summary.baseDuration,
            polyline: encodePolyline(resp[0].polylineData),
          })
        );

        dispatch(closeModal());
      })
      .catch((err) => {
        notification.error({
          message: 'Nie udało sie obliczyć nowej trasy',
          description: err.message,
        });
      });
  }

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
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading || travelStopsLoading}
        >
          Zatwierdź
        </Button>
      </StyledItem>
    </StyledForm>
  );
}

export default NewRouteStep;
