import { Divider, Typography } from 'antd';
import AuthLayout from 'components/AuthLayout';

const { Title } = Typography;

const titleStyles = {
  textTransform: 'uppercase',
  letterSpacing: '2px',
  fontSize: '30px',
};

function PhotosView() {
  return (
    <AuthLayout>
      <Title style={titleStyles} level={1}>
        Zdjęcia z podróży
      </Title>
      <Divider />

      <p>Photos list</p>
    </AuthLayout>
  );
}

export default PhotosView;
