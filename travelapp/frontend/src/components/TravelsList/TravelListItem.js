import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const { Meta } = Card;

function TraveListItem({ travel }) {
  const history = useHistory();

  const { id, name, short_description: shortDescription } = travel;

  function showDetails() {
    history.push(`/travel/${id}/plan`);
  }

  // TODO find proper images
  return (
    <li>
      <Card
        bordered
        hoverable
        onClick={showDetails}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta title={name} description={shortDescription} />
      </Card>
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
