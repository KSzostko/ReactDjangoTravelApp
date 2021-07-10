import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PlanTravelView from '../views/PlanTravelView';
import TravelsView from '../views/TravelsView';

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TravelsView} />
        <Route path="/travel/plan" component={PlanTravelView} />
      </Switch>
    </BrowserRouter>
  );
}

export default AuthenticatedApp;
