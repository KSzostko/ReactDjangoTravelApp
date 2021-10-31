import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from 'utils/testUtils';
import LoginForm from 'components/LoginForm';

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
});
