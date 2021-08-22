import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Steps } from 'antd';
import { closeModal } from '../../redux/travelPeriodModal/travelPeriodModalSlice';

const { Step } = Steps;

function TravelPeriodModal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.travelPeriodModal);

  const [currentStep, setCurrentStep] = useState(0);

  function handleCloseModal() {
    dispatch(closeModal());
  }

  function nextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function prevStep() {
    setCurrentStep((prev) => prev - 1);
  }

  const footer = [
    <Button key="close" onClick={handleCloseModal}>
      Zamknij
    </Button>,
  ];

  return (
    <Modal
      centered
      title={<h2>Dodaj punkt podróży</h2>}
      visible={isOpen}
      onCancel={handleCloseModal}
      footer={footer}
      width="80vw"
      bodyStyle={{ height: '75vh' }}
    >
      <Steps current={currentStep} size="small" responsive>
        <Step key="choose-date" title="Data" />
        <Step key="choose-time" title="Godzina" />
        <Step key="summary" title="Podsumowanie" />
      </Steps>

      {currentStep === 0 && <div>Choose date form</div>}
      {currentStep === 1 && <div>Choose time form</div>}
      {currentStep === 2 && <div>Choice summary</div>}
    </Modal>
  );
}

export default TravelPeriodModal;
