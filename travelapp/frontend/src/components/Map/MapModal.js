import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Spin, Button } from 'antd';
import { clearLocationData } from '../../redux/selectedLocation/selectedLocationSlice';
import { getMobileWikiUrl } from '../../utils';

function MapModal({
  addRouteWaypointFn,
  removeRouteWaypointFn,
  hasWaypointFn,
}) {
  const dispatch = useDispatch();
  const { isLoading, isModalOpen, data } = useSelector(
    (state) => state.selectedLocation
  );

  function handleCloseModal() {
    dispatch(clearLocationData());
  }

  function handleAddWaypointClick() {
    if (data?.point) {
      addRouteWaypointFn({
        ...data.point,
        name: data.name === '' ? 'Brak nazwy' : data.name,
        xid: data.xid,
      });
    }
    dispatch(clearLocationData());
  }

  function handleRemoveWaypointClick() {
    if (data?.point) {
      removeRouteWaypointFn(data.point);
    }
    dispatch(clearLocationData());
  }

  const footer = [
    <Button key="close" onClick={handleCloseModal}>
      Zamknij
    </Button>,
    <Button key="add" type="primary">
      Dodaj do podróży
    </Button>,
  ];
  if (!hasWaypointFn(data?.point)) {
    footer.splice(
      1,
      0,
      <Button key="route" type="primary" onClick={handleAddWaypointClick}>
        Dodaj do trasy
      </Button>
    );
  } else {
    footer.splice(
      1,
      0,
      <Button
        key="remove"
        danger
        type="primary"
        onClick={handleRemoveWaypointClick}
      >
        Usuń z trasy
      </Button>
    );
  }

  const modalTitle =
    data?.name === undefined || data?.name === '' ? 'Brak nazwy' : data?.name;
  const hasWikiData = data?.wikipedia !== undefined && data?.wikipedia !== '';

  return (
    <Modal
      centered
      title={<h2>{modalTitle}</h2>}
      visible={isModalOpen}
      onCancel={handleCloseModal}
      footer={footer}
      width="80vw"
      bodyStyle={{ height: '75vh' }}
    >
      {isLoading ? (
        <Spin />
      ) : !hasWikiData ? (
        <p>Brak szczegółowych danych o tej lokalizacji</p>
      ) : (
        <iframe
          style={{ border: 'none' }}
          title={`${data?.name}${data?.xid}`}
          width="100%"
          height="100%"
          src={getMobileWikiUrl(data?.wikipedia || '')}
        />
      )}
    </Modal>
  );
}

MapModal.propTypes = {
  addRouteWaypointFn: PropTypes.func.isRequired,
  removeRouteWaypointFn: PropTypes.func.isRequired,
  hasWaypointFn: PropTypes.func.isRequired,
};

export default MapModal;
