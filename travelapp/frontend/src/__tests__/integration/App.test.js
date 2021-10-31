import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { render } from 'utils/testUtils';
import { fakeUserData, handlers } from 'utils';
import App from 'App';

const mockServer = setupServer(...handlers);

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

describe('<App />', () => {
  it('renders login view for unlogged users', () => {
    render(<App />);

    expect(screen.getByText('Logowanie')).toBeInTheDocument();
  });

  it('renders register view after clicking register button', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Zarejestruj się'));
    expect(screen.queryByText('Logowanie')).not.toBeInTheDocument();
    expect(screen.getByText('Rejestracja')).toBeInTheDocument();
  });

  it('redirects user to the main page after entering correct login data', async () => {
    render(<App />);

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
      expect(screen.getByText(fakeUserData.user.username)).toBeInTheDocument()
    );
    expect(screen.getByText('Zaplanuj podróż')).toBeInTheDocument();
    expect(screen.getByText('Podróże')).toBeInTheDocument();
  });
});
