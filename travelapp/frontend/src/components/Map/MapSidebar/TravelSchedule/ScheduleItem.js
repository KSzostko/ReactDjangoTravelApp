import PropTypes from 'prop-types';
import styled from 'styled-components';
import { cutText, formatHour } from 'utils';

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

  if (name === undefined) return null;

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
    travel: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
      .isRequired,
    attraction: PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      PropTypes.number,
    ]).isRequired,
  }).isRequired,
};

export default ScheduleItem;
