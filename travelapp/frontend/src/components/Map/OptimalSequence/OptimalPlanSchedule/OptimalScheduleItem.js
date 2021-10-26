import React from 'react';
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

function OptimalScheduleItem({ waypoint }) {
  const { name, start_date: start, end_date: end } = waypoint;

  return (
    <StyledContent>
      <span>{cutText(name || '', 20)}</span>
      <span className="hour">
        {formatHour(start)} - {formatHour(end)}
      </span>
    </StyledContent>
  );
}

OptimalScheduleItem.propTypes = {
  waypoint: PropTypes.shape({
    name: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }).isRequired,
};

export default OptimalScheduleItem;
