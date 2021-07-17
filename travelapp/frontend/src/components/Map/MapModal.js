import { useSelector, useDispatch } from 'react-redux';
import { Modal, Spin, Button } from 'antd';
import { clearLocationData } from '../../redux/selectedLocation/selectedLocationSlice';
import { getMobileWikiUrl } from '../../utils/getMobileWikiUrl';

function MapModal() {
  const dispatch = useDispatch();
  const { isLoading, isModalOpen, data } = useSelector(
    (state) => state.selectedLocation
  );

  function handleCloseModal() {
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

export default MapModal;
