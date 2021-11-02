import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { render as customRender } from 'utils/testUtils';
import {
  handlers,
  fakeTravelStops,
  fakeUserData,
  cutText,
  formatHour,
} from 'utils';
import { rootReducer } from 'redux/store';
import TravelSchedule from 'components/Map/MapSidebar/TravelSchedule/TravelSchedule';

const mockServer = setupServer(...handlers);

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

describe('<TravelSchedule />', () => {
  it('displays a loader before loading data', () => {
    customRender(<TravelSchedule />, {
      preloadedState: { user: { data: fakeUserData.user } },
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders date sub-menus correctly', async () => {
    const preloadedState = {
      travels: {
        current: { data: fakeTravelStops[0].travel },
        getTravelStops: { data: [], error: null },
      },
      user: { data: fakeUserData.user },
    };

    const store = configureStore({ reducer: rootReducer, preloadedState });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/travel/7/plan']}>
          <Route path="/travel/:travelId/plan">
            <TravelSchedule />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    );

    expect(screen.getByText('Dzień 1 - 21.08.2021')).toBeInTheDocument();
    expect(screen.getByText('Dzień 2 - 22.08.2021')).toBeInTheDocument();
    expect(screen.getByText('Dzień 3 - 23.08.2021')).toBeInTheDocument();
  });

  it('renders all stops data', async () => {
    const preloadedState = {
      travels: {
        current: { data: fakeTravelStops[0].travel },
        getTravelStops: { data: [], error: null },
      },
      user: { data: fakeUserData.user },
    };

    const store = configureStore({ reducer: rootReducer, preloadedState });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/travel/7/plan']}>
          <Route path="/travel/:travelId/plan">
            <TravelSchedule />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Dzień 1 - 21.08.2021'));
    fireEvent.click(screen.getByText('Dzień 2 - 22.08.2021'));
    fireEvent.click(screen.getByText('Dzień 3 - 23.08.2021'));

    fakeTravelStops.forEach((stop) => {
      const {
        attraction: { name },
        start_date: start,
        end_date: end,
      } = stop;

      const formattedName = cutText(name, 20);
      const formattedDateString = `${formatHour(start)} - ${formatHour(end)}`;

      expect(screen.getByText(formattedName)).toBeInTheDocument();
      expect(screen.getByText(formattedDateString)).toBeInTheDocument();
    });
  });
});
