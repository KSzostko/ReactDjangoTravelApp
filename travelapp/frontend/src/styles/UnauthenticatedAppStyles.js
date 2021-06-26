import styled from 'styled-components';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export const PageLayout = styled(Layout)`
  min-height: 100vh;
  display: gird;
  grid-template-rows: 1fr auto;
`;

export const StyledContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const StyledFooter = styled(Footer)`
  text-align: center;
`;
