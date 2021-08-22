import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import { closeModal } from '../../redux/travelPeriodModal/travelPeriodModalSlice';

function TravelPeriodModal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.travelPeriodModal);

  function handleCloseModal() {
    dispatch(closeModal());
  }

  const footer = [
    <Button key="close" onClick={handleCloseModal}>
      Zamknij
    </Button>,
  ];

  return (
    <Modal
      centered
      title={<h2>Dodaj do podróży</h2>}
      visible={isOpen}
      onCancel={handleCloseModal}
      footer={footer}
      width="80vw"
      bodyStyle={{ height: '75vh' }}
    />
  );
}

export default TravelPeriodModal;
