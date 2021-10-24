import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Modal, Form, Select, Button, TimePicker } from 'antd';
import { timeFormat } from 'setup/constans';
import { useErrorNotification } from 'utils';
import { getWaypointsSequence } from 'redux/travels/actions/getWaypointsSequence/thunk';
import TextWithInfo from 'components/Map/MapSidebar/TextWithInfo';
import { prepareWaypointsData, prepareTimeRange, tooltipText } from './helpers';

const { Option } = Select;
const { RangePicker } = TimePicker;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledItem = styled(Form.Item)`
  margin-top: 16px;
  margin-right: 26px;
  align-self: flex-end;
`;

function TransportModal({ isModalOpen, setIsModalOpenFn }) {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector(
    (state) => state.travels.getWaypointsSequence
  );
  const { data: stopsList } = useSelector(
    (state) => state.travels.getTravelStops
  );

  useErrorNotification(error, 'Nie udało się wyznaczyć optymalnej trasy');

  async function handleWaypointsTranport({ transport, timeRange }) {
    const waypoints = prepareWaypointsData(stopsList);
    const adjustedTimeRange = prepareTimeRange(timeRange);

    // TODO add more fields to the form: earliset starting hour and latest hour in a trip
    // after this there needs to be some data preparation before displaying everything
    // check travel time(given from api) + stop rest time(from the db, every stop has it) and check if it's possible to fullify latest hour contraint with it
    // if constraint is not fullified - add stop to the next day starting at earliset starting hour
    await dispatch(
      getWaypointsSequence({
        waypoints,
        transport,
        timeRange: adjustedTimeRange,
      })
    );
    setIsModalOpenFn(false);
  }

  return (
    <Modal
      centered
      title={<h2>Dane trasy</h2>}
      visible={isModalOpen}
      onCancel={() => setIsModalOpenFn(false)}
      width="350px"
      bodyStyle={{ height: '350px' }}
      footer={null}
    >
      <StyledForm
        name="sequence-transport"
        layout="vertical"
        size="large"
        onFinish={handleWaypointsTranport}
      >
        <Form.Item
          name="transport"
          label="Środek transportu"
          rules={[{ required: true, message: 'Wybierz środek transportu' }]}
        >
          <Select
            style={{ width: 250 }}
            placeholder="Wybierz transport"
            allowClear
          >
            <Option value="car">Samochód</Option>
            <Option value="bicycle">Rower</Option>
            <Option value="pedestrian">Pieszo</Option>
            <Option value="scooter">Skuter</Option>
            <Option value="truck">Ciężarówka</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="timeRange"
          label={
            <TextWithInfo
              title="Zakres godzin podrózy"
              infoText={tooltipText}
            />
          }
          rules={[{ required: true, message: 'Wybierz zakres godzin' }]}
        >
          <RangePicker
            format={timeFormat}
            placeholder={['Start', 'Koniec']}
            style={{ width: 250 }}
          />
        </Form.Item>

        <StyledItem>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Wyznacz
          </Button>
        </StyledItem>
      </StyledForm>
    </Modal>
  );
}

TransportModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpenFn: PropTypes.func.isRequired,
};

export default TransportModal;
