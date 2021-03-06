import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Modal, Button, Steps } from 'antd';
import { closeModal } from 'redux/travelPeriodModal/travelPeriodModalSlice';
import DateStep from './DateStep';
import RouteStep from './RouteStep';
import TimeStep from './TimeStep';
import SummaryStep from './SummaryStep/SummaryStep';

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
    setCurrentStep(0);
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
      Anuluj
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
        <Step key="route-details" title="Trasa" />
        <Step key="choose-time" title="Godzina" />
        <Step key="summary" title="Podsumowanie" />
      </Steps>

      <Wrapper>
        {currentStep === 0 && <DateStep nextStepFn={nextStep} />}
        {currentStep === 1 && <RouteStep nextStepFn={nextStep} />}
        {currentStep === 2 && <TimeStep nextStepFn={nextStep} />}
        {currentStep === 3 && <SummaryStep setCurrentStepFn={setCurrentStep} />}
      </Wrapper>
    </Modal>
  );
}

export default TravelPeriodModal;
