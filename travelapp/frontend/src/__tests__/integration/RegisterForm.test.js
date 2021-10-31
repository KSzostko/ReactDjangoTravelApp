import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { render } from 'utils/testUtils';
import { handlers } from 'utils';
import RegisterForm from 'components/RegisterForm';

const mockServer = setupServer(...handlers);

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

describe('<RegisterForm />', () => {
  it('renders correctly', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
    expect(screen.getByLabelText('Powtórzone hasło')).toBeInTheDocument();
  });

  it('shows error messages when form is not filled', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() =>
      expect(screen.getByText('Podaj nazwę użytkownika')).toBeInTheDocument()
    );
    expect(screen.getByText('Email nie może być pusty')).toBeInTheDocument();
    expect(screen.getAllByText('Podaj poprawne hasło')).toHaveLength(2);
  });

  it("shows an error message when the 2 passwords doesn't match", async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Hasło'), {
      target: {
        value: 'password',
      },
    });
    fireEvent.change(screen.getByLabelText('Powtórzone hasło'), {
      target: {
        value: 'pass',
      },
    });

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() =>
      expect(
        screen.getByText('Podane hasła muszą być identyczne')
      ).toBeInTheDocument()
    );
    expect(screen.queryByText('Podaj poprawne hasło')).not.toBeInTheDocument();
  });

  it('shows success message after entering correct data', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Login'), {
      target: {
        value: 'testuser',
      },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: {
        value: 'test@example.com',
      },
    });
    fireEvent.change(screen.getByLabelText('Hasło'), {
      target: {
        value: 'password',
      },
    });
    fireEvent.change(screen.getByLabelText('Powtórzone hasło'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() =>
      expect(
        screen.getByText('Rejestracja przebiegła pomyślnie')
      ).toBeInTheDocument()
    );
    expect(screen.getByText('Witaj na naszej stronie!')).toBeInTheDocument();
  });
});
