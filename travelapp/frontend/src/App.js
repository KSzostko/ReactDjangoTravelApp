import React from 'react';
import { useSelector } from 'react-redux';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';

function App() {
  // TODO: user should be still logged in after page refresh
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
