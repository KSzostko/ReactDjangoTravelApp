import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip, Button } from 'antd';

const StyledButton = styled(Button)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

function PopoverContent({ setIsModalOpenFn }) {
  function handleClick() {
    setIsModalOpenFn(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledButton style={{ color: '#000' }} type="link" onClick={handleClick}>
        Optymalizuj rozkład
      </StyledButton>
      <Tooltip
        trigger="click"
        placement="right"
        title="Kliknij w dowolny element menu aby zobaczyć jego szczegóły"
      >
        <StyledButton style={{ color: '#000' }} type="link">
          Pomoc
        </StyledButton>
      </Tooltip>
    </div>
  );
}

PopoverContent.propTypes = {
  setIsModalOpenFn: PropTypes.func.isRequired,
};

export default PopoverContent;
