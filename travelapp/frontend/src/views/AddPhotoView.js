import styled from 'styled-components';
import { Typography } from 'antd';
import AuthLayout from 'components/AuthLayout';
import TravelPhotoForm from 'components/TravelPhotoForm/TravelPhotoForm';

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

function AddPhotoView() {
  return (
    <AuthLayout>
      <Wrapper>
        <Title style={titleStyles} level={1}>
          Dodaj zdjęcie z wyjazdu
        </Title>

        <TravelPhotoForm />
      </Wrapper>
    </AuthLayout>
  );
}

export default AddPhotoView;
