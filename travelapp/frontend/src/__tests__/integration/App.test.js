import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AllProviders } from 'utils';
import App from 'App';

describe('<App />', () => {
  it('renders login view for unlogged users', () => {
    render(<App />, { wrapper: AllProviders });

    expect(screen.getByText('Logowanie')).toBeInTheDocument();
  });

  it('renders register view after clicking register button', () => {
    render(<App />, { wrapper: AllProviders });

    fireEvent.click(screen.getByText('Zarejestruj się'));
    expect(screen.queryByText('Logowanie')).not.toBeInTheDocument();
    expect(screen.getByText('Rejestracja')).toBeInTheDocument();
  });
});
