import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faMotorcycle,
  faTruck,
  faWalking,
  faBicycle,
} from '@fortawesome/free-solid-svg-icons';

function TransportIcon({ name }) {
  switch (name) {
    case 'bicycle':
      return (
        <FontAwesomeIcon
          style={{ fontSize: '16px', marginBottom: '8px' }}
          icon={faBicycle}
        />
      );
    case 'pedestrian':
      return (
        <FontAwesomeIcon
          style={{ fontSize: '16px', marginBottom: '8px' }}
          icon={faWalking}
        />
      );
    case 'scooter':
      return (
        <FontAwesomeIcon
          style={{ fontSize: '16px', marginBottom: '8px' }}
          icon={faMotorcycle}
        />
      );
    case 'truck':
      return (
        <FontAwesomeIcon
          style={{ fontSize: '16px', marginBottom: '8px' }}
          icon={faTruck}
        />
      );
    default:
      return (
        <FontAwesomeIcon
          style={{ fontSize: '16px', marginBottom: '8px' }}
          icon={faCar}
        />
      );
  }
}

TransportIcon.propTypes = {
  name: PropTypes.oneOf(['car', 'bicycle', 'pedestrian', 'scooter', 'truck']),
};

export default TransportIcon;
