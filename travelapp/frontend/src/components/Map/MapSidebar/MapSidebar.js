import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Layout, Divider } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { setIsSequenceModalOpen } from 'redux/travels/travelsSlice';
import SiderHeader from './SiderHeader/SiderHeader';
import TravelSchedule from './TravelSchedule/TravelSchedule';
import TravelStopModal from './TravelStopModal/TravelStopModal';
import HotelMenu from './HotelMenu';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  /* without this trigger was under the sidebar and overflowed footer */
  .ant-layout-sider-trigger {
    position: absolute;
  }
`;

const Wrapper = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const zeroWidthTriggerStyles = {
  top: '16px',
  zIndex: 999,
  boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
};

function MapSidebar() {
  const dispatch = useDispatch();

  const { isSequenceModalOpen } = useSelector((state) => state.travels);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (isSequenceModalOpen && !isCollapsed && isMobile) {
      setIsCollapsed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSequenceModalOpen]);

  function handleCollapse(collapsed) {
    if (!collapsed && isMobile && isSequenceModalOpen) {
      dispatch(setIsSequenceModalOpen(false));
    }

    setIsCollapsed(collapsed);
  }

  function handleBreakpoint(collapse) {
    setIsMobile(collapse);
  }

  return (
    <>
      <StyledSider
        theme="light"
        width="300"
        breakpoint="md"
        collapsible
        collapsedWidth={isMobile ? 0 : 80}
        collapsed={isCollapsed}
        zeroWidthTriggerStyle={zeroWidthTriggerStyles}
        onCollapse={handleCollapse}
        onBreakpoint={handleBreakpoint}
      >
        <Wrapper>
          {isCollapsed && !isMobile ? (
            <CalendarOutlined />
          ) : (
            <>
              <SiderHeader title="Plan wyjazdu" />
              <Divider style={{ margin: 0 }} />
              <TravelSchedule />
              <Divider style={{ margin: 0 }} />
              <HotelMenu />
            </>
          )}
        </Wrapper>
      </StyledSider>
      <TravelStopModal />
    </>
  );
}

export default MapSidebar;
