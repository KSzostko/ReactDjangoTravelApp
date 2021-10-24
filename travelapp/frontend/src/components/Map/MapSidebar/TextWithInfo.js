import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const tooltipText = `
Usunięcie wybranego punktu podróży spowoduje konieczność wyznaczenia
nowej trasy podróży, pomiędzy miejscami między którymi znajdował się
właśnie usuwany punkt.
`;

const StyledInfoIcon = styled(InfoCircleOutlined)`
  margin-left: 4px;
  cursor: pointer;
  color: #b2b1b9;
`;

function TextWithInfo({ title, infoText }) {
  return (
    <span>
      {title}
      <Tooltip title={infoText}>
        <StyledInfoIcon />
      </Tooltip>
    </span>
  );
}

TextWithInfo.propTypes = {
  title: PropTypes.string.isRequired,
  infoText: PropTypes.string,
};

TextWithInfo.defaultProps = {
  infoText: tooltipText,
};

export default TextWithInfo;
