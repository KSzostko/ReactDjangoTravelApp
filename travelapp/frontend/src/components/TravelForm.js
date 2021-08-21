import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, DatePicker, Button } from 'antd';
import { useErrorNotification } from '../utils';
import { createTravel } from '../redux/travels/actions/createTravel/thunk';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function TravelForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.travels.current);

  useErrorNotification(error, 'Nie udało sie utworzyć wyjazdu');

  function handleFinish({ schedule, ...rest }) {
    // eslint-disable-next-line camelcase
    const [start_date, end_date] = schedule.map((dateItem) =>
      dateItem.toDate().toISOString().substring(0, 10)
    );
    const travelData = {
      start_date,
      end_date,
      ...rest,
    };

    dispatch(createTravel(travelData))
      .unwrap()
      .then((result) => {
        history.push(`/travel/${result.id}/plan`);
      });
  }

  return (
    <Form
      name="travel-info"
      layout="vertical"
      size="large"
      style={{ minWidth: '350px' }}
      onFinish={handleFinish}
    >
      <Form.Item
        name="name"
        label="Nazwa"
        rules={[{ required: true, message: 'Podaj nazwę wyjazdu' }]}
      >
        <Input placeholder="Podaj nazwę" />
      </Form.Item>
      <Form.Item
        name="short_description"
        label="Krótki opis"
        rules={[{ required: true, message: 'Podaj krótki opis' }]}
      >
        <Input placeholder="Podaj opis" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Opis"
        rules={[{ required: true, message: 'Podaj pełen opis' }]}
      >
        <TextArea
          placeholder="Pełen opis"
          allowClear
          maxLength={500}
          showCount
        />
      </Form.Item>
      <Form.Item
        name="schedule"
        label="Termin"
        rules={[{ required: true, message: 'Podaj termin wyjazdu' }]}
      >
        <RangePicker placeholder={['Początek', 'Koniec']} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Wybierz
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TravelForm;
