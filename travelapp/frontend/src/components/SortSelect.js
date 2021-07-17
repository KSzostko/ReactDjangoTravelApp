import PropTypes from 'prop-types';
import { Select } from 'antd';

function SortSelect({ children }) {
  function handleSort(value) {
    console.log(value);
  }

  return (
    <Select
      style={{ width: 200, marginBottom: 16 }}
      placeholder="Sortuj"
      onChange={handleSort}
    >
      {children}
    </Select>
  );
}

SortSelect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SortSelect;
