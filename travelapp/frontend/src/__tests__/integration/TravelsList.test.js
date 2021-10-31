import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { render } from 'utils/testUtils';
import { handlers, fakeTravelsList, fakeUserData } from 'utils';
import TravelsList from 'components/TravelsList/TravelsList';

const mockServer = setupServer(...handlers);

beforeAll(() => mockServer.listen());
beforeEach(() => localStorage.removeItem('token'));
afterAll(() => mockServer.close());

describe('<TravelsList />', () => {
  it('shows a spinner before list items loads', async () => {
    render(<TravelsList />, {
      preloadedState: {
        user: {
          data: fakeUserData.user,
          isAuthenticated: true,
          token: fakeUserData.token,
        },
      },
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    fakeTravelsList.forEach(({ name, short_description: short }) => {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
      expect(screen.queryByText(short)).not.toBeInTheDocument();
    });
  });

  it('renders all list items correctly', async () => {
    render(<TravelsList />, {
      preloadedState: {
        user: {
          data: fakeUserData.user,
          isAuthenticated: true,
          token: fakeUserData.token,
        },
      },
    });

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    );

    fakeTravelsList.forEach(({ name, short_description: short }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(short)).toBeInTheDocument();
    });
  });
});
