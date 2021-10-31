import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { render } from 'utils/testUtils';
import { handlers } from 'utils';
import LoginForm from 'components/LoginForm';

const mockServer = setupServer(...handlers);

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

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
