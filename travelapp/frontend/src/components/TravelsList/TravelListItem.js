import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { notification, Card, Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { deleteTravel } from 'redux/travels/actions/deleteTravel/thunk';

const { Meta } = Card;

const defaultPhoto =
  'https://poradniksukces.com/wp/wp-content/uploads/2016/05/Travel-suitcase.jpg';

function TraveListItem({ travel }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { id: userId } = useSelector((state) => state.user.data);
  const { id, name, short_description: shortDescription, creator } = travel;

  const { data: photosList } = useSelector(
    (state) => state.travels.getAllPhotos
  );
  const travelPhoto = photosList.find(
    ({ travel: photoTravel }) => photoTravel === id
  );

  function handleDelete(e) {
    e.preventDefault();

    if (userId !== creator) {
      notification.warning({
        message: 'Ta akcja nie jest dozwolona',
        description: 'Nie jesteś autorem podróży',
      });
      return;
    }

    Modal.confirm({
      title: 'Czy na pewno chcesz usunąć tą podróż?',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      content: 'Nie będziesz mógł cofnąc tej decyzji.',
      okText: 'Tak',
      cancelText: 'Anuluj',
      onOk() {
        dispatch(deleteTravel(id));
      },
    });
  }

  function handleEdit(e) {
    e.preventDefault();

    if (userId !== creator) {
      notification.warning({
        message: 'Ta akcja nie jest dozwolona',
        description: 'Nie jesteś autorem podróży',
      });
      return;
    }

    history.push(`/travel/${id}/edit`);
  }

  return (
    <li>
      <Link to={`/travel/${id}/plan`}>
        <Card
          bordered
          hoverable
          cover={
            <img
              alt="example"
              style={{ maxHeight: '120px' }}
              src={travelPhoto?.image || defaultPhoto}
            />
          }
          actions={[
            <EditOutlined onClick={handleEdit} />,
            <DeleteOutlined onClick={handleDelete} />,
            <EllipsisOutlined />,
          ]}
        >
          <Meta title={name} description={shortDescription} />
        </Card>
      </Link>
    </li>
  );
}

TraveListItem.propTypes = {
  travel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    hotel: PropTypes.number,
    creator: PropTypes.number.isRequired,
  }).isRequired,
};

export default TraveListItem;
