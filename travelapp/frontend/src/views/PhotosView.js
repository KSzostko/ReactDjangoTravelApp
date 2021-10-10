import { Divider, Typography } from 'antd';
import AuthLayout from 'components/AuthLayout';
import PhotosList from 'components/PhotosList/PhotosList';

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

      <PhotosList />
    </AuthLayout>
  );
}

export default PhotosView;
