import React from 'react';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';

function App() {
  // TODO: add user login system
  const isLogged = false;

  return isLogged ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
