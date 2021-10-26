import React from 'react';
import { Drawer, Button, Typography } from 'antd';
import styled from 'styled-components';
import OptmialPlanSchedule from './OptimalPlanSchedule/OptmialPlanSchedule';

const { Title } = Typography;

const StyledDrawer = styled(Drawer)`
  position: absolute;

  .ant-drawer-body {
    font-family: 'Segoe UI';
    padding: 0;
  }
`;

function OptimalSequence() {
  return (
    <>
      <Button>Pokaż</Button>
      <StyledDrawer
        title={
          <Title level={2} style={{ fontSize: '18px' }}>
            Optymalny plan podróży
          </Title>
        }
        visible
        mask={false}
        getContainer={false}
        width={300}
      >
        <OptmialPlanSchedule />
      </StyledDrawer>
    </>
  );
}

export default OptimalSequence;
