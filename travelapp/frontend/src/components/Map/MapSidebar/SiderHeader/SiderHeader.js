import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Button, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import PopoverContent from './PopoverContent';
import TransportModal from './TransportModal/TransportModal';

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

function SiderHeader({ title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StyledHeader>
        <Title level={2} style={{ fontSize: '24px' }}>
          {title}
        </Title>
        <Popover
          trigger="click"
          placement="bottom"
          content={<PopoverContent setIsModalOpenFn={setIsModalOpen} />}
        >
          <StyledButton
            style={{ color: '#000' }}
            shape="circle"
            type="link"
            icon={<EllipsisOutlined style={{ fontSize: '20px' }} />}
          />
        </Popover>
      </StyledHeader>

      <TransportModal
        isModalOpen={isModalOpen}
        setIsModalOpenFn={setIsModalOpen}
      />
    </>
  );
}

SiderHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SiderHeader;
