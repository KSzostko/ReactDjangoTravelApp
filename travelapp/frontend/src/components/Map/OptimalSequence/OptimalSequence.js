import React from 'react';
import { Drawer, Button } from 'antd';
import OptmialPlanSchedule from './OptmialPlanSchedule';

function OptimalSequence() {
  return (
    <>
      <Button>Pokaż</Button>
      <Drawer
        title="Optymalny plan podróży"
        visible
        mask={false}
        getContainer={false}
        style={{ position: 'absolute' }}
        width={300}
      >
        <OptmialPlanSchedule />
      </Drawer>
    </>
  );
}

export default OptimalSequence;
