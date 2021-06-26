import { Typography } from 'antd';
import LoginForm from '../components/LoginForm';
import {
  PageLayout,
  StyledContent,
  StyledFooter,
} from '../styles/UnauthenticatedAppStyles';

const { Title } = Typography;

const titleStyles = {
  textTransform: 'uppercase',
  letterSpacing: '5px',
  color: '#fff',
};

function LoginView() {
  return (
    <PageLayout>
      <StyledContent>
        <Title style={titleStyles} level={1}>
          Logowanie
        </Title>
        <LoginForm />
      </StyledContent>

      <StyledFooter>Jakub Szóstko &copy;2021</StyledFooter>
    </PageLayout>
  );
}

export default LoginView;
