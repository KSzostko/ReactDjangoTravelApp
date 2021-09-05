import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Modal, Form, TimePicker, Button, Popconfirm } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { closeModal } from 'redux/travelStopModal/travelStopModalSlice';

const { RangePicker } = TimePicker;

const ModalTitle = styled.h2`
  font-size: 20px;
`;

const PopupContent = styled.div`
  p {
    margin: 0 8px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

function TravelStopModal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.travelStopModal);

  function handleCancel() {
    dispatch(closeModal());
  }

  function handleSubmit(values) {
    console.log(values);
    dispatch(closeModal());
  }

  function handleDelete() {
    console.log('remove travel stop');
  }

  // TODO: this should be visible only on edit mode and it should be a separate component
  const footer = (
    <Popconfirm
      placement="topRight"
      title={
        <PopupContent>
          <p>Czy na pewno chcesz usunąć ten etap podróży?</p>
          <p>Nie będziesz mógł potem cofnąć swojej dezycji.</p>
        </PopupContent>
      }
      icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
      okText="Tak"
      okButtonProps={{
        size: 'middle',
      }}
      cancelText="Nie"
      cancelButtonProps={{
        size: 'middle',
      }}
      onConfirm={handleDelete}
    >
      <Button type="primary" danger>
        Usuń
      </Button>
    </Popconfirm>
  );

  return (
    <Modal
      centered
      destroyOnClose
      title={<ModalTitle>Szczegóły punktu podróży: costam</ModalTitle>}
      visible={isOpen}
      footer={footer}
      onCancel={handleCancel}
      width="350px"
      bodyStyle={{ height: '220px' }}
    >
      <Form
        name="travel-stop-form"
        layout="vertical"
        size="large"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="period"
          label="Czas zwiedzania"
          rules={[{ required: true, message: 'Podaj czas zwiedzania' }]}
        >
          {/* TODO: add starting value for edit mode */}
          {/* TODO: check which time can be the earliset possible after previous travel stop */}
          <RangePicker placeholder={['Start', 'Koniec']} />
        </Form.Item>

        <Form.Item style={{ color: '#fff' }}>
          {/* TODO: adjust button text for create/edit */}
          <StyledButton type="primary" htmlType="submit" block>
            Dodaj/Edytuj
          </StyledButton>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TravelStopModal;
