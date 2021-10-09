import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, DatePicker, Button, Spin } from 'antd';
import { useErrorNotification } from 'utils';
import { createTravel } from 'redux/travels/actions/createTravel/thunk';
import { getTravelById } from 'redux/travels/actions/getTravelById/thunk';
import { updateTravel } from 'redux/travels/actions/updateTravel/thunk';
import { clearCurrentTravel } from 'redux/travels/travelsSlice';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function TravelForm({ editMode }) {
  const formRef = useRef(null);
  const { travelId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, isLoading, data: currentTravel } = useSelector(
    (state) => state.travels.current
  );
  const initialFormValues = {
    name: currentTravel?.name || '',
    short_description: currentTravel?.short_description || '',
    description: currentTravel?.description || '',
  };

  useErrorNotification(
    error,
    editMode
      ? 'Nie udało się zaktualizować wyjazdu'
      : 'Nie udało sie utworzyć wyjazdu'
  );

  useEffect(() => {
    if (travelId) {
      dispatch(getTravelById(travelId));
      return;
    }

    dispatch(clearCurrentTravel());
  }, [dispatch, travelId]);

  useEffect(() => {
    if (travelId) return;

    if (formRef.current) {
      formRef.current.resetFields();
    }
  }, [dispatch, travelId, currentTravel]);

  async function handleFinish({ schedule, ...rest }) {
    /* eslint-disable */
    const [start_date, end_date] = !editMode ?
      schedule.map((dateItem) =>
        dateItem.toDate().toISOString().substring(0, 10)
      ) : [currentTravel.start_date, currentTravel.end_date];
    /* eslint-enable */
    const travelData = {
      start_date,
      end_date,
      ...rest,
    };

    if (editMode) {
      await dispatch(updateTravel({ ...travelData, id: currentTravel.id }));
      history.push('/');
      return;
    }

    dispatch(createTravel(travelData))
      .unwrap()
      .then((result) => {
        history.push(`/travel/${result.id}/plan`);
      });
  }

  if (isLoading) return <Spin />;

  return (
    <Form
      ref={formRef}
      name="travel-info"
      layout="vertical"
      size="large"
      style={{ minWidth: '350px' }}
      initialValues={initialFormValues}
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
      {!editMode && (
        <Form.Item
          name="schedule"
          label="Termin"
          rules={[{ required: true, message: 'Podaj termin wyjazdu' }]}
        >
          <RangePicker
            style={{ width: 350 }}
            placeholder={['Początek', 'Koniec']}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          {editMode ? 'Edytuj' : 'Wybierz'}
        </Button>
      </Form.Item>
    </Form>
  );
}

TravelForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
};

export default TravelForm;
