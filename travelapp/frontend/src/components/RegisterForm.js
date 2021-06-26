import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

const StyledButton = styled(Button)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

function RegisterForm() {
  console.log(Form.useForm());

  function handleRegister(values) {
    console.log(values);
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
        name="repeat-password"
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
