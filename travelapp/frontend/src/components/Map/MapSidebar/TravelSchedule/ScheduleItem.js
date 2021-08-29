import PropTypes from 'prop-types';
import { getHours, getMinutes } from 'date-fns';
import styled from 'styled-components';
import { cutText } from 'utils';

const formatHour = (date) => {
  const parsedDate = new Date(date);
  const hours = getHours(parsedDate);
  const minutes = getMinutes(parsedDate);

  return `${hours < 9 ? '0' : ''}${hours}:${minutes < 9 ? '0' : ''}${minutes}`;
};

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;

  .hour {
    font-size: 12px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.55);
  }
`;

function ScheduleItem({ travelStop }) {
  const { name } = travelStop.attraction;

  return (
    <StyledContent>
      <span>{cutText(name || '', 20)}</span>
      <span className="hour">
        {formatHour(travelStop.start_date)} - {formatHour(travelStop.end_date)}
      </span>
    </StyledContent>
  );
}

ScheduleItem.propTypes = {
  travelStop: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    travel: PropTypes.object.isRequired,
    attraction: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ScheduleItem;
