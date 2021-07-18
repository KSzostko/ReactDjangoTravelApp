import { useState } from 'react';
import styled from 'styled-components';
import { Layout, Divider } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import SiderHeader from './SiderHeader';
import TravelSchedule from './TravelSchedule/TravelSchedule';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  /* without this trigger was under the sidebar and overflowed footer */
  .ant-layout-sider-trigger {
    position: relative;
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
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleCollapse(collapsed) {
    setIsCollapsed(collapsed);
  }

  function handleBreakpoint(broken) {
    setIsMobile(broken);
  }

  return (
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
          </>
        )}
      </Wrapper>
    </StyledSider>
  );
}

export default MapSidebar;
