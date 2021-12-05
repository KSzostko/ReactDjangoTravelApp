import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip, Button } from 'antd';

const StyledButton = styled(Button)`
  color: #000;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #000;
  }

  &:disabled {
    color: #d6dbde;
  }
`;

function PopoverContent({ setIsModalOpenFn }) {
  const { data: travelsList, isLoading } = useSelector(
    (state) => state.travels.getTravelStops
  );

  function handleClick() {
    setIsModalOpenFn(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Tooltip
        placement="right"
        title="Optymalizacja trasy jest dostępna po dodaniu minimum 2 przystanków do podróży"
      >
        <StyledButton
          type="link"
          onClick={handleClick}
          disabled={isLoading || travelsList?.length < 2}
        >
          Optymalizuj rozkład
        </StyledButton>
      </Tooltip>

      <Tooltip
        trigger="click"
        placement="right"
        title="Kliknij w dowolny element menu aby przejść do niego na mapie (jeśli jesteś twórcą podróży to otworzy się także formularz edycji)"
      >
        <StyledButton type="link">Pomoc</StyledButton>
      </Tooltip>
    </div>
  );
}

PopoverContent.propTypes = {
  setIsModalOpenFn: PropTypes.func.isRequired,
};

export default PopoverContent;
