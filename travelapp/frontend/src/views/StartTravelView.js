import PropTypes from 'prop-types';
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

function StartTravelView({ editMode }) {
  return (
    <AuthLayout>
      <Wrapper>
        <Title style={titleStyles} level={1}>
          {editMode ? 'Edytuj wyjazd' : 'Utwórz wyjazd'}
        </Title>
        <TravelForm editMode={editMode} />
      </Wrapper>
    </AuthLayout>
  );
}

StartTravelView.propTypes = {
  editMode: PropTypes.bool,
};

StartTravelView.defaultProps = {
  editMode: false,
};

export default StartTravelView;
