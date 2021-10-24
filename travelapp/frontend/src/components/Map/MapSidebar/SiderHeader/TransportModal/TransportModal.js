import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Modal, Form, Select, Button } from 'antd';
import { useErrorNotification } from 'utils';
import { getWaypointsSequence } from 'redux/travels/actions/getWaypointsSequence/thunk';
import { prepareWaypointsData } from './helpers';

const { Option } = Select;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const StyledItem = styled(Form.Item)`
  margin-right: 50px;
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

  async function handleWaypointsTranport({ transport }) {
    const waypoints = prepareWaypointsData(stopsList);

    await dispatch(getWaypointsSequence({ waypoints, transport }));
    setIsModalOpenFn(false);
  }

  return (
    <Modal
      centered
      title={<h2>Dane trasy</h2>}
      visible={isModalOpen}
      onCancel={() => setIsModalOpenFn(false)}
      width="350px"
      bodyStyle={{ height: '200px' }}
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
