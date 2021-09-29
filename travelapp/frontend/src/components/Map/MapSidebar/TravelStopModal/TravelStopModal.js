import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Modal } from 'antd';
import { closeModal } from 'redux/travelStopModal/travelStopModalSlice';
import ModalFooter from './ModalFooter';
import TravelTimeFrom from './TravelTimeForm';

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-right: 16px;
`;

function TravelStopModal() {
  const dispatch = useDispatch();

  const { isOpen, data } = useSelector((state) => state.travelStopModal);

  function handleCancel() {
    dispatch(closeModal());
  }

  return (
    <Modal
      centered
      destroyOnClose
      title={
        <ModalTitle>
          Szczegóły punktu podróży: {data?.attraction?.name || 'Brak nazwy'}
        </ModalTitle>
      }
      visible={isOpen}
      footer={<ModalFooter />}
      onCancel={handleCancel}
      width="350px"
      bodyStyle={{ height: '220px' }}
    >
      {/* TODO add Steps component */}
      <TravelTimeFrom />
    </Modal>
  );
}

export default TravelStopModal;
