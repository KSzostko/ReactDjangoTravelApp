import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'utils/testUtils';
import LoginForm from 'components/LoginForm';

describe('<LoginForm />', () => {
  it('renders correctly', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
  });
});
