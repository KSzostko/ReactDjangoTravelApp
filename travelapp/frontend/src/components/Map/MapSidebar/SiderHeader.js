import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Button, Popover, Tooltip } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StyledHeader = styled.header`
  width: 100%;
  margin-right: 16px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;

  h2 {
    justify-self: center;
  }
`;

const StyledButton = styled(Button)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const popoverContent = (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <StyledButton style={{ color: '#000' }} type="link">
      Pokaż na mapie
    </StyledButton>
    <StyledButton style={{ color: '#000' }} type="link">
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

function SiderHeader({ title }) {
  return (
    <StyledHeader>
      <Title level={2} style={{ fontSize: '24px' }}>
        {title}
      </Title>
      <Popover trigger="click" placement="bottom" content={popoverContent}>
        <StyledButton
          style={{ color: '#000' }}
          shape="circle"
          type="link"
          icon={<EllipsisOutlined style={{ fontSize: '20px' }} />}
        />
      </Popover>
    </StyledHeader>
  );
}

SiderHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SiderHeader;
