import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';

const Overlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .preview {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }

  .photo-info {
    position: absolute;
    bottom: 8px;
    left: 8px;
    display: flex;
    flex-direction: column;
    font-size: 10px;
  }

  .travel-info {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 10px;
  }
`;

function PhotoOverlay({ photo }) {
  return (
    <Overlay>
      <div className="photo-info">
        <span>{photo.title}</span>
        <span>{photo.date}</span>
      </div>
      <p className="travel-info">
        <UserOutlined /> {photo.taken_by_username}
      </p>
      <p className="preview">
        <EyeOutlined /> Powiększ
      </p>
    </Overlay>
  );
}

PhotoOverlay.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    travel: PropTypes.number.isRequired,
    taken_by: PropTypes.number.isRequired,
    taken_by_username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default PhotoOverlay;
