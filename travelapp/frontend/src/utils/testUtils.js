import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

export const AllProviders = ({ children }) => (
  <Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
);

AllProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
