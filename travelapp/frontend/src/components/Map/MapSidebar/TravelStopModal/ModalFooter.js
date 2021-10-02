import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { notification, Button } from 'antd';
import { closeModal } from 'redux/travelStopModal/travelStopModalSlice';
import { deleteTravelStop } from 'redux/travels/actions/deleteTravelStop/thunk';

function ModalFooter({ currentStep, setCurrentStepFn }) {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.travelStopModal.data);
  const { data: routeToStopData } = useSelector(
    (state) => state.travelStopModal.getRouteToStop
  );
  const { data: routeFromStopData } = useSelector(
    (state) => state.travelStopModal.getRouteFromStop
  );

  function handleBack() {
    setCurrentStepFn((prev) => prev - 1);
  }

  function handleDelete() {
    if (routeToStopData && routeFromStopData) {
      setCurrentStepFn((prev) => prev + 1);
      return;
    }

    // routes with this stop are deleted as well because db model has cascading delete
    dispatch(deleteTravelStop(id))
      .then(() => {
        dispatch(closeModal());
        notification.success({
          message: 'Operacja przebiegła pomyślnie',
          description: 'Punkt podróży został usunięty',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Wystąpił błąd',
          description: err.message,
        });
      });
  }

  if (currentStep === 1) return <Button onClick={handleBack}>Wróc</Button>;

  return (
    <Button type="primary" danger onClick={handleDelete}>
      Usuń
    </Button>
  );
}

ModalFooter.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStepFn: PropTypes.func.isRequired,
};

export default ModalFooter;
