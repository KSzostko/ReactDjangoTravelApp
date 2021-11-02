import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Spin, Button } from 'antd';
import { HotelAPI } from 'services';
import { getMobileWikiUrl } from 'utils';
import { clearLocationData } from 'redux/selectedLocation/selectedLocationSlice';
import { openModal } from 'redux/travelPeriodModal/travelPeriodModalSlice';
import { updateTravel } from 'redux/travels/actions/updateTravel/thunk';
import { addHotel } from 'redux/travels/actions/addHotel/thunk';
import { isHotel, addAttraction } from './helpers';

function MapModal({
  addRouteWaypointFn,
  removeRouteWaypointFn,
  hasWaypointFn,
}) {
  const dispatch = useDispatch();

  const { id: userId } = useSelector((state) => state.user.data);
  const { isLoading, isModalOpen, data } = useSelector(
    (state) => state.selectedLocation
  );
  const { data: currentTravel } = useSelector((state) => state.travels.current);
  const canAddHotel = isHotel(data);

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

  async function changeTravelHotel() {
    let dbHotel = await HotelAPI.getByXid(data.xid);
    if (dbHotel === '') {
      const { xid, name, address, stars, point } = data;
      dbHotel = await dispatch(
        addHotel({
          xid,
          name: name || 'None',
          address: address
            ? Object.values(address).join(', ')
            : 'Not Specified',
          lat: point.lat,
          lng: point.lon,
          stars: stars || -1,
        })
      );
    }

    dispatch(updateTravel({ ...currentTravel, hotel: dbHotel.id }));
  }

  async function handleAddToTravel() {
    if (!canAddHotel) {
      const dbAttraction = await addAttraction(data);
      dispatch(openModal(dbAttraction));
    } else {
      changeTravelHotel();
    }

    dispatch(clearLocationData());
  }

  function isCreator() {
    return currentTravel?.creator && currentTravel.creator === userId;
  }

  const footer = [
    <Button key="close" onClick={handleCloseModal}>
      Zamknij
    </Button>,
  ];

  if (isCreator()) {
    footer.splice(
      1,
      0,
      <Button key="add" type="primary" onClick={handleAddToTravel}>
        {canAddHotel ? 'Dodaj hotel' : 'Dodaj do podróży'}
      </Button>
    );
  }

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
  const hasUrlData = !!data?.wikipedia || !!data?.url;

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
      ) : !hasUrlData ? (
        <p>Brak szczegółowych danych o tej lokalizacji</p>
      ) : (
        <iframe
          style={{ border: 'none' }}
          title={`${data?.name}${data?.xid}`}
          width="100%"
          height="100%"
          src={
            canAddHotel ? data?.url : getMobileWikiUrl(data?.wikipedia || '')
          }
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
