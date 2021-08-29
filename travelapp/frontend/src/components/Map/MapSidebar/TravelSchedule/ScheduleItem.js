import PropTypes from 'prop-types';
import { Menu } from 'antd';
import styled from 'styled-components';
import { cutText } from 'utils';

const StyledMenuItem = styled(Menu.Item)`
  .ant-menu-title-content {
    display: flex;
    justify-content: space-between;

    .hour {
      font-size: 12px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.55);
    }
  }
`;

function ScheduleItem({ travelStop }) {
  // TODO: adjust travelStop data correctly
  // TODO: retrieve attraction data by attraction foreign key
  return (
    <StyledMenuItem key={travelStop.id}>
      <span>{cutText('Nazwa miejsca1aaaaaaaaaaaaaaaaaaaaaaaaaa', 20)}</span>
      <span className="hour">10:00 - 12:00</span>
    </StyledMenuItem>
  );
}

ScheduleItem.propTypes = {
  travelStop: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    travel: PropTypes.number.isRequired,
    attraction: PropTypes.number.isRequired,
  }).isRequired,
};

export default ScheduleItem;
