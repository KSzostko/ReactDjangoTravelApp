import { useState } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  /* without this trigger was under the sidebar and overflowed footer */
  .ant-layout-sider-trigger {
    position: relative;
  }
`;

const zeroWidthTriggerStyles = {
  top: '16px',
  zIndex: 999,
  boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
};

function MapSidebar() {
  const [isMobile, setIsMobile] = useState();

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
      zeroWidthTriggerStyle={zeroWidthTriggerStyles}
      onBreakpoint={handleBreakpoint}
    >
      sidebar
    </StyledSider>
  );
}

export default MapSidebar;
