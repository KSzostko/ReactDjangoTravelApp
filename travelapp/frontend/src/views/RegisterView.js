import { Typography } from 'antd';
import RegisterForm from 'components/RegisterForm';
import {
  PageLayout,
  StyledContent,
  StyledFooter,
} from 'styles/UnauthenticatedAppStyles';

const { Title } = Typography;

const titleStyles = {
  textTransform: 'uppercase',
  letterSpacing: '5px',
  color: '#fff',
};

function RegisterView() {
  return (
    <PageLayout>
      <StyledContent>
        <Title style={titleStyles} level={1}>
          Rejestracja
        </Title>
        <RegisterForm />
      </StyledContent>

      <StyledFooter>Jakub Szóstko &copy;2021</StyledFooter>
    </PageLayout>
  );
}

export default RegisterView;
