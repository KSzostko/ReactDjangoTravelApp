import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_API_URL } from 'setup/constans';
import { render } from 'utils/testUtils';
import { fakeUserData } from 'utils';
import LoginForm from 'components/LoginForm';

const server = setupServer(
  rest.post(`${BASE_API_URL}auth/login`, (req, res, ctx) => {
    const { username, password } = req.body;

    if (username === fakeUserData.user.username && password === 'password') {
      return res(ctx.status(200), ctx.json(fakeUserData));
    }

    return res(
      ctx.status(400),
      ctx.json({ non_field_errors: ['Incorrect Credentials'] })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('<LoginForm />', () => {
  it('renders correctly', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
  });

  it('shows error messages when form is not filled', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText('Zaloguj się'));
    await waitFor(() =>
      expect(screen.getByText('Podaj nazwę użytkownika')).toBeInTheDocument()
    );
    expect(screen.getByText('Podaj poprawne hasło')).toBeInTheDocument();
  });

  it('shows error message after entering incorrect data', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Login'), {
      target: {
        value: 'testuser',
      },
    });
    fireEvent.change(screen.getByLabelText('Hasło'), {
      target: {
        value: 'testpassword',
      },
    });

    fireEvent.click(screen.getByText('Zaloguj się'));
    await waitFor(() =>
      expect(screen.getByText('Nieudana próba logowania')).toBeInTheDocument()
    );
    expect(screen.getByText('Incorrect Credentials')).toBeInTheDocument();
  });

  it('shows success message after entering correct data', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Login'), {
      target: {
        value: 'testuser',
      },
    });
    fireEvent.change(screen.getByLabelText('Hasło'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.click(screen.getByText('Zaloguj się'));
    await waitFor(() =>
      expect(screen.getByText('Pomyślne logowanie')).toBeInTheDocument()
    );
    expect(screen.getByText('Witamy ponownie!')).toBeInTheDocument();
  });
});
