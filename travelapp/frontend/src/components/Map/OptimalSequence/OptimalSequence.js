import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Drawer, Button, Typography } from 'antd';
import styled from 'styled-components';
import OptimalPlanSchedule from './OptimalPlanSchedule/OptmialPlanSchedule';

const { Title } = Typography;

const StyledDrawer = styled(Drawer)`
  position: absolute;

  .ant-drawer-body {
    font-family: 'Segoe UI';
    padding: 0;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 16px;
  left: 50px;
  z-index: 1000000000000;
`;

function OptimalSequence() {
  const { data: waypointsData } = useSelector(
    (state) => state.travels.getWaypointsSequence
  );

  const [isOpen, setIsOpen] = useState(true);

  function handleButtonClick() {
    setIsOpen((prev) => !prev);
  }

  if (!waypointsData) return null;

  return (
    <>
      <StyledButton onClick={handleButtonClick}>Pokaż</StyledButton>
      <StyledDrawer
        title={
          <Title level={2} style={{ fontSize: '18px' }}>
            Optymalny plan podróży
          </Title>
        }
        visible={isOpen}
        mask={false}
        getContainer={false}
        width={300}
        onClose={() => setIsOpen(false)}
      >
        <OptimalPlanSchedule />
      </StyledDrawer>
    </>
  );
}

export default OptimalSequence;
