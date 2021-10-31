import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from 'utils/testUtils';
import App from 'App';

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
});
