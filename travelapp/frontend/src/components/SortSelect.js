import PropTypes from 'prop-types';
import { Select } from 'antd';

function SortSelect({ children, changeCallback }) {
  return (
    <Select
      style={{ width: 200, marginBottom: 16 }}
      placeholder="Sortuj"
      allowClear
      onChange={changeCallback}
    >
      {children}
    </Select>
  );
}

SortSelect.propTypes = {
  children: PropTypes.node.isRequired,
  changeCallback: PropTypes.func.isRequired,
};

export default SortSelect;
