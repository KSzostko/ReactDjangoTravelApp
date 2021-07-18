import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  /* without this trigger was under the sidebar and overflowed footer */
  .ant-layout-sider-trigger {
    position: relative;
  }
`;

// TODO: adjust sider for mobile screens
function MapSidebar() {
  return (
    <StyledSider theme="light" collapsible width="300">
      sidebar
    </StyledSider>
  );
}

export default MapSidebar;
