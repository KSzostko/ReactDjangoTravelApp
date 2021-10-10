import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  notification,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Upload,
  Spin,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useErrorNotification } from 'utils';
import { getTravels } from 'redux/travels/actions/getTravels/thunk';
import { addPhoto } from 'redux/travels/actions/addPhoto/thunk';

const { Option } = Select;

function TravelPhotoForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoading, list: travelsList } = useSelector(
    (state) => state.travels
  );
  const { isLoading: photosPending, error: photosError } = useSelector(
    (state) => state.travels.getAllPhotos
  );

  useErrorNotification(photosError, 'Nie udało się dodać zdjęcia');

  useEffect(() => {
    if (travelsList.length === 0) {
      dispatch(getTravels());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function uploadFile({ onSuccess }) {
    setTimeout(() => {
      onSuccess('Plik został pomyślnie załadowany');
    }, 0);
  }

  function handleFinish({ date, image, ...rest }) {
    const adjustedImage = image.file.originFileObj;
    const dateString = date.toDate().toISOString().substring(0, 10);
    dispatch(
      addPhoto({
        ...rest,
        date: dateString,
        image: adjustedImage,
      })
    ).then(() => {
      history.push('/');
      notification.success({
        message: 'Operacja przebiegła pomyślnie',
        description: 'Udało się dodać zdjęcie z podróży',
      });
    });
  }

  if (isLoading) return <Spin />;

  return (
    <Form
      name="addTravelPhoto"
      layout="vertical"
      size="large"
      style={{ minWidth: '350px' }}
      onFinish={handleFinish}
    >
      <Form.Item
        name="title"
        label="Tytuł"
        rules={[{ required: true, message: 'Podaj tytuł zdjęcia' }]}
      >
        <Input placeholder="Podaj tytuł" />
      </Form.Item>
      <Form.Item
        name="travel"
        label="Podróż"
        rules={[{ required: true, message: 'Podaj podróż' }]}
      >
        <Select style={{ width: 350 }} placeholder="Wybierz podróż" allowClear>
          {travelsList.map((travel) => (
            <Option key={travel.id} value={travel.id}>
              {travel.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="date"
        label="Data"
        rules={[{ required: true, message: 'Podaj datę zdjęcia' }]}
      >
        <DatePicker style={{ width: 350 }} placeholder="Podaj datę" />
      </Form.Item>
      <Form.Item
        name="image"
        label="Zdjęcie"
        valuePropName="file"
        extra="Maksymalna wielkość pliku to 10MB"
        rules={[{ required: true, message: 'Dodaj zdjęcie' }]}
      >
        {/* TODO validate file upload */}
        <Upload name="imagePhoto" maxCount={1} customRequest={uploadFile}>
          <Button style={{ width: 350 }} icon={<UploadOutlined />}>
            Kliknij by dodać plik
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={photosPending}>
          Dodaj
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TravelPhotoForm;
