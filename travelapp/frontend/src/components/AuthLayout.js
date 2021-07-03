import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from 'antd';
import Navigation from './Navigation';

const { Content, Footer } = Layout;

const PageLayout = styled(Layout)`
  min-height: 100vh;
`;

const MainContent = styled(Content)`
  padding: 16px 50px;
  background-color: #fff;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 16px auto;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

function AuthLayout({ children }) {
  return (
    <PageLayout>
      <Navigation />

      <MainContent>
        <Wrapper>{children}</Wrapper>
      </MainContent>

      <StyledFooter>Jakub Szóstko &copy;2021</StyledFooter>
    </PageLayout>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
