import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { notification, Form, Input, Button } from 'antd';
import { registerUser } from 'redux/user/actions/registerUser/thunk';
import { useErrorNotification } from 'utils';

const StyledButton = styled(Button)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

function RegisterForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  useErrorNotification(error, 'Rejestracja nie powiodła się');

  async function handleRegister({ repeatPassword, ...rest }) {
    const resp = await dispatch(registerUser({ ...rest }));

    if (resp.error === undefined) {
      notification.success({
        message: 'Rejestracja przebiegła pomyślnie',
        description: 'Witaj na naszej stronie!',
      });

      history.push('/');
    }
  }

  return (
    <Form
      name="register-form"
      layout="vertical"
      size="large"
      style={{ minWidth: '350px' }}
      onFinish={handleRegister}
    >
      <Form.Item
        label={<span style={{ color: '#fff' }}>Login</span>}
        name="username"
        rules={[{ required: true, message: 'Podaj nazwę użytkownika' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: '#fff' }}>Email</span>}
        name="email"
        rules={[
          {
            required: true,
            message: 'Email nie może być pusty',
          },
          {
            type: 'email',
            message: 'Podaj poprawny adres email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: '#fff' }}>Hasło</span>}
        name="password"
        rules={[{ required: true, message: 'Podaj poprawne hasło' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: '#fff' }}>Powtórzone hasło</span>}
        name="repeatPassword"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Podaj poprawne hasło',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error('Podane hasła muszą być identyczne')
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item style={{ color: '#fff' }}>
        <StyledButton type="primary" htmlType="submit" block>
          Zarejestruj się
        </StyledButton>
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
