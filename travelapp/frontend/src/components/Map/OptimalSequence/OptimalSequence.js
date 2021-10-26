import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Button, Typography, Tooltip } from 'antd';
import styled from 'styled-components';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setIsSequenceModalOpen } from 'redux/travels/travelsSlice';
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
  bottom: 8px;
  left: 8px;
  z-index: 1000;
  border-radius: 50%;
`;

function OptimalSequence() {
  const dispatch = useDispatch();

  const { data: waypointsData } = useSelector(
    (state) => state.travels.getWaypointsSequence
  );
  const { isSequenceModalOpen } = useSelector((state) => state.travels);

  function handleButtonClick() {
    dispatch(setIsSequenceModalOpen(!isSequenceModalOpen));
  }

  if (!waypointsData) return null;

  return (
    <>
      <Tooltip title="Pokaż optymalną trasę" placement="right">
        <StyledButton
          icon={<FontAwesomeIcon icon={faRoute} />}
          onClick={handleButtonClick}
        />
      </Tooltip>

      <StyledDrawer
        title={
          <Title level={2} style={{ fontSize: '18px' }}>
            Optymalny plan podróży
          </Title>
        }
        visible={isSequenceModalOpen}
        mask={false}
        getContainer={false}
        width={300}
        onClose={() => dispatch(setIsSequenceModalOpen(false))}
      >
        <OptimalPlanSchedule />
      </StyledDrawer>
    </>
  );
}

export default OptimalSequence;
