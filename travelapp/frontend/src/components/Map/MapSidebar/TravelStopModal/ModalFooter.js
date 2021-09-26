import styled from 'styled-components';
import { Popconfirm, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const PopupContent = styled.div`
  p {
    margin: 0 8px;
  }
`;

function ModalFooter() {
  function handleDelete() {
    console.log('remove travel stop');
  }

  return (
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
}

export default ModalFooter;
