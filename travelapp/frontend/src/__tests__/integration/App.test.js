import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { store } from 'redux/store';
import App from 'App';

describe('<App />', () => {
  it('renders login view for unlogged users', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Logowanie')).toBeInTheDocument();
  });

  it('renders register view after clicking register button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText('Zarejestruj się'));
    expect(screen.queryByText('Logowanie')).not.toBeInTheDocument();
    expect(screen.getByText('Rejestracja')).toBeInTheDocument();
  });
});
