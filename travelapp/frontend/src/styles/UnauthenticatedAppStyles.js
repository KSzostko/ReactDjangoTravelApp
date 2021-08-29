import styled from 'styled-components';
import { Layout } from 'antd';
import bgImg from 'assets/travel-bg.jpg';

const { Content, Footer } = Layout;

export const PageLayout = styled(Layout)`
  min-height: 100vh;
  display: gird;
  grid-template-rows: 1fr auto;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${bgImg});
  background-size: cover;
`;

export const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledFooter = styled(Footer)`
  text-align: center;
  background: transparent;
  color: #fff;
`;
