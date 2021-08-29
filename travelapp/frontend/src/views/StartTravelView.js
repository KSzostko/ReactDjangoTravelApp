import styled from 'styled-components';
import { Typography } from 'antd';
import AuthLayout from 'components/AuthLayout';
import TravelForm from 'components/TravelForm';

const { Title } = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const titleStyles = {
  textTransform: 'uppercase',
  letterSpacing: '2px',
  fontSize: '30px',
};

function StartTravelView() {
  return (
    <AuthLayout>
      <Wrapper>
        <Title style={titleStyles} level={1}>
          Utwórz wyjazd
        </Title>
        <TravelForm />
      </Wrapper>
    </AuthLayout>
  );
}

export default StartTravelView;
