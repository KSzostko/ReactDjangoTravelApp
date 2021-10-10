import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'antd';
import PhotoOverlay from './PhotoOverlay';

const Photo = styled.li`
  list-style: none;
  display: inline-block;
  margin: 0 0 4px;
  width: 100%;
`;

function PhotoListItem({ photo }) {
  return (
    <Photo>
      <Image
        src={photo.image}
        alt={photo.title}
        preview={{
          mask: <PhotoOverlay photo={photo} />,
        }}
      />
    </Photo>
  );
}

PhotoListItem.propTypes = {
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

export default PhotoListItem;
