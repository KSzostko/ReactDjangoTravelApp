import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { getTravelById } from '../redux/travels/actions/getTravelById/thunk';
import AuthLayout from '../components/AuthLayout';
import Map from '../components/Map/Map';

function PlanTravelView() {
  const history = useHistory();
  const { travelId } = useParams();

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.travels.current);

  useEffect(() => {
    if (data !== null) return;

    dispatch(getTravelById(travelId))
      .unwrap()
      .catch(() => {
        history.push('/travel/start');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <AuthLayout mapView>{isLoading ? <Spin /> : <Map />}</AuthLayout>;
}

export default PlanTravelView;
