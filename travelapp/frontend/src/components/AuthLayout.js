import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Layout } from 'antd';
import Navigation from './Navigation';

const { Content, Footer } = Layout;

const PageLayout = styled(Layout)`
  min-height: 100vh;
`;

const MainContent = styled(Content)`
  padding: ${(props) => (props.$mapView ? '0' : '16px 50px')};
  background-color: #fff;
  position: relative;
`;

const Wrapper = styled.div`
  max-width: ${(props) => (props.$mapView ? 'none' : '1200px')};
  margin: ${(props) => (props.$mapView ? '0' : '16px auto')};
  ${(props) =>
    props.$mapView &&
    css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `}
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

function AuthLayout({ children, mapView = false }) {
  return (
    <PageLayout>
      <Navigation />

      <MainContent $mapView={mapView}>
        <Wrapper $mapView={mapView}>{children}</Wrapper>
      </MainContent>

      <StyledFooter>Jakub Szóstko &copy;2021</StyledFooter>
    </PageLayout>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  mapView: PropTypes.bool.isRequired,
};

export default AuthLayout;
