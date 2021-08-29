import { Divider, Typography } from 'antd';
import AuthLayout from 'components/AuthLayout';
import TravelsList from 'components/TravelsList/TravelsList';

const { Title } = Typography;

const titleStyles = {
  textTransform: 'uppercase',
  letterSpacing: '2px',
  fontSize: '30px',
};

function TravlesView() {
  return (
    <AuthLayout>
      <Title style={titleStyles} level={1}>
        Podróże
      </Title>
      <Divider />

      <TravelsList />
    </AuthLayout>
  );
}

export default TravlesView;
