import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Modal, Button, Steps } from 'antd';
import { closeModal } from '../../../redux/travelPeriodModal/travelPeriodModalSlice';
import DateStep from './DateStep';
import TimeStep from './TimeStep';

const { Step } = Steps;

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
    <Button key="back" onClick={prevStep} disabled={currentStep === 0}>
      Wróć
    </Button>,
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
    >
      <Steps current={currentStep} size="small" responsive>
        <Step key="choose-date" title="Data" />
        <Step key="choose-time" title="Godzina" />
        <Step key="summary" title="Podsumowanie" />
      </Steps>

      <Wrapper>
        {currentStep === 0 && <DateStep nextStepFn={nextStep} />}
        {currentStep === 1 && <TimeStep nextStepFn={nextStep} />}
        {currentStep === 2 && <div>Choice summary</div>}
      </Wrapper>
    </Modal>
  );
}

export default TravelPeriodModal;
