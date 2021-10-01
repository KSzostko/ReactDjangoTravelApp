import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { notification, Popconfirm, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { closeModal } from 'redux/travelStopModal/travelStopModalSlice';
import { deleteTravelStop } from 'redux/travels/actions/deleteTravelStop/thunk';
import { addTravelRoute } from 'redux/travels/actions/addTravelRoute/thunk';

const PopupContent = styled.div`
  p {
    margin: 0 8px;
  }
`;

function ModalFooter({ nextStepFn }) {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.travelStopModal.data);
  const { data: routeToStopData } = useSelector(
    (state) => state.travelStopModal.getRouteToStop
  );
  const { data: routeFromStopData } = useSelector(
    (state) => state.travelStopModal.getRouteFromStop
  );

  function handleDelete() {
    // TODO add a new route only if both data's are not null
    if (routeToStopData && routeFromStopData) {
      nextStepFn();
      // TODO add modal to choose transport between the two remaining points
      // or maybe divide current modal to steps, where the second one is optional?
      // TODO then call routing api to get necessary route data
      // TODO then it will be possible to create db object
      // dispatch(addTravelRoute({
      //   start: routeToStopData.start,
      //   destination: routeFromStopData.destination,
      // }))
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

  return (
    <Popconfirm
      placement="topRight"
      title={
        <PopupContent>
          <p>Czy na pewno chcesz usunąć ten etap podróży?</p>
          <p>Nie będziesz mógł potem cofnąć swojej dezycji.</p>
        </PopupContent>
      }
      icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
      okText="Tak"
      okButtonProps={{
        size: 'middle',
      }}
      cancelText="Nie"
      cancelButtonProps={{
        size: 'middle',
      }}
      onConfirm={handleDelete}
    >
      <Button type="primary" danger>
        Usuń
      </Button>
    </Popconfirm>
  );
}

ModalFooter.propTypes = {
  nextStepFn: PropTypes.func.isRequired,
};

export default ModalFooter;
