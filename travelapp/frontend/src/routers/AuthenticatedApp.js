import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PhotosView from 'views/PhotosView';
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
        <Route exact path="/photos" component={PhotosView} />
        <Route path="/photos/add" component={AddPhotoView} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default AuthenticatedApp;
