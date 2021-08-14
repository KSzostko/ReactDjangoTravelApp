import { useHistory } from 'react-router-dom';
import { Form, Input, DatePicker, Button } from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function TravelForm() {
  const history = useHistory();

  function handleFinish(values) {
    // TODO add form values to the store
    console.log(values);
    // TODO add hotel picker before travel stops
    // moze hotel moze byc null?
    // wtedy do menu damy go opcjonalnie i można od razu teraz dodać podróż do bazy
    history.push('/travel/plan');
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
        <Button type="primary" htmlType="submit" block>
          Wybierz
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TravelForm;
