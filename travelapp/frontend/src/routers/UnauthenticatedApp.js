import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';

function UnauthenticatedApp() {
  const shouldRedirect = localStorage.getItem('token') === null;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route path="/register" component={RegisterView} />
        {shouldRedirect && <Redirect to="/" />}
      </Switch>
    </BrowserRouter>
  );
}

export default UnauthenticatedApp;
