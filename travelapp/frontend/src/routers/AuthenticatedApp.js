import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PlanTravelView from 'views/PlanTravelView';
import StartTravelView from 'views/StartTravelView';
import TravelsView from 'views/TravelsView';

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TravelsView} />
        <Route path="/travel/start" component={StartTravelView} />
        <Route path="/travel/:travelId/edit">
          <StartTravelView editMode />
        </Route>
        <Route path="/travel/:travelId/plan" component={PlanTravelView} />
      </Switch>
    </BrowserRouter>
  );
}

export default AuthenticatedApp;
