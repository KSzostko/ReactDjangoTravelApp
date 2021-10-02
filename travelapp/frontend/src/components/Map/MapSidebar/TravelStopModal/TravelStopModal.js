import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Modal, Steps } from 'antd';
import { closeModal } from 'redux/travelStopModal/travelStopModalSlice';
import ModalFooter from './ModalFooter';
import TravelTimeFrom from './TravelTimeForm';
import NewRouteStepTitle from './NewRouteStepTitle';
import NewRouteStep from './NewRouteStep';

const { Step } = Steps;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-right: 16px;
`;

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function TravelStopModal() {
  const dispatch = useDispatch();

  const { isOpen, data } = useSelector((state) => state.travelStopModal);

  const [currentStep, setCurrentStep] = useState(0);

  function handleCancel() {
    setCurrentStep(0);
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
      footer={
        <ModalFooter
          currentStep={currentStep}
          setCurrentStepFn={setCurrentStep}
        />
      }
      onCancel={handleCancel}
      width="350px"
      bodyStyle={{ height: '300px', position: 'relative' }}
    >
      <Steps current={currentStep} size="small" responsive direction="vertical">
        <Step key="handle-stop" title="Edycja przystanku" />
        <Step key="add-new-route" title={<NewRouteStepTitle />} />
      </Steps>

      <Wrapper>
        {currentStep === 0 && <TravelTimeFrom />}
        {currentStep === 1 && <NewRouteStep />}
      </Wrapper>
    </Modal>
  );
}

export default TravelStopModal;
