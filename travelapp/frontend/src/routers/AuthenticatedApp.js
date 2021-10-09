import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddPhotoView from 'views/AddPhotoView';
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
        <Route path="/photos/add" component={AddPhotoView} />
      </Switch>
    </BrowserRouter>
  );
}

export default AuthenticatedApp;
