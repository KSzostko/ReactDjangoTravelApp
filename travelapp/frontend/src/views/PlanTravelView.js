import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTravelById } from 'redux/travels/actions/getTravelById/thunk';
import { clearCurrentTravel } from 'redux/travels/travelsSlice';
import AuthLayout from 'components/AuthLayout';
import Map from 'components/Map/Map';
import { StyledSpinner } from 'styles/Spinner';

function PlanTravelView() {
  const history = useHistory();
  const { travelId } = useParams();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.travels.current);

  useEffect(() => {
    dispatch(getTravelById(travelId))
      .unwrap()
      .catch(() => {
        history.push('/travel/start');
      });

    return () => {
      dispatch(clearCurrentTravel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <AuthLayout mapView>{isLoading ? <StyledSpinner /> : <Map />}</AuthLayout>
  );
}

export default PlanTravelView;
