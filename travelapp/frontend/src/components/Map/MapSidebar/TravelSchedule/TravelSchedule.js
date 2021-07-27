import styled from 'styled-components';
import { Menu } from 'antd';
import { cutText } from '../../../../utils/cutText';

const { SubMenu } = Menu;

const StyledMenuItem = styled(Menu.Item)`
  .ant-menu-title-content {
    display: flex;
    justify-content: space-between;

    .hour {
      font-size: 12px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.55);
    }
  }
`;

function TravelSchedule() {
  return (
    <Menu mode="inline" style={{ width: '100%' }}>
      <SubMenu key="day-1" title="Dzień 1 - data">
        {/* TODO: replace this with ScheduleItem component  */}
        {/* menu item click should open a modal with details about hours and road */}
        {/* there shuld also be an edit form for this trip stop */}
        <StyledMenuItem key="stop-1">
          <span>{cutText('Nazwa miejsca1aaaaaaaaaaaaaaaaaaaaaaaaaa', 20)}</span>
          <span className="hour">10:00 - 12:00</span>
        </StyledMenuItem>
        <StyledMenuItem key="stop-2">
          <span>Nazwa miejsca2</span>
          <span className="hour">10:00 - 12:00</span>
        </StyledMenuItem>
      </SubMenu>
      <SubMenu key="day-2" title="Dzień 2 - data">
        <StyledMenuItem key="stop-1">
          <span>Nazwa miejsca1</span>
          <span className="hour">10:00 - 12:00</span>
        </StyledMenuItem>
        <StyledMenuItem key="stop-2">
          <span>Nazwa miejsca2</span>
          <span className="hour">10:00 - 12:00</span>
        </StyledMenuItem>
        <StyledMenuItem key="stop-3">
          <span>Nazwa miejsca3</span>
          <span className="hour">10:00 - 12:00</span>
        </StyledMenuItem>
      </SubMenu>
    </Menu>
  );
}

export default TravelSchedule;
