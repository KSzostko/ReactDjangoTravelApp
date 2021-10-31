import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import { rootReducer } from 'redux/store';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  window.history.pushState({}, 'Test page', '/');
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
