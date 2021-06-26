import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

function UnauthenticatedApp() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route path="/register" component={RegisterView} />
      </Switch>
    </BrowserRouter>
  );
}

export default UnauthenticatedApp;
