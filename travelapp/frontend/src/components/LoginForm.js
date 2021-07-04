import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { notification, Form, Input, Button } from 'antd';
import { loginUser } from '../redux/user/actions/loginUser/thunk';

const StyledButton = styled(Button)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

function LoginForm() {
  const dispatch = useDispatch();

  function handleLogin(values) {
    dispatch(loginUser(values));

    notification.success({
      message: 'Pomyślne logowanie',
      description: 'Witamy ponownie!',
    });
  }

  return (
    <Form
      name="login-form"
      layout="vertical"
      size="large"
      style={{ minWidth: '350px' }}
      onFinish={handleLogin}
    >
      <Form.Item
        label={<span style={{ color: '#fff' }}>Login</span>}
        name="username"
        rules={[{ required: true, message: 'Podaj nazwę użytkownika' }]}
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

      <Form.Item style={{ color: '#fff' }}>
        <StyledButton type="primary" htmlType="submit" block>
          Zaloguj się
        </StyledButton>
        Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
