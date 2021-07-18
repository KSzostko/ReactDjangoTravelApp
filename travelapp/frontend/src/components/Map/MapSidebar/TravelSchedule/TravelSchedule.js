import { Menu } from 'antd';

const { SubMenu } = Menu;

function TravelSchedule() {
  return (
    <Menu mode="inline" style={{ width: '100%' }}>
      <SubMenu key="day-1" title="Dzień 1 - data">
        {/* TODO: replace this with ScheduleItem component  */}
        {/* menu item click should open a modal with details about hours and road */}
        {/* there shuld also be an edit form for this trip stop */}
        <Menu.Item key="stop-1">Nazwa miejsca1</Menu.Item>
        <Menu.Item key="stop-2">Nazwa miejsca2</Menu.Item>
      </SubMenu>
      <SubMenu key="day-2" title="Dzień 2 - data">
        <Menu.Item key="stop-1">Nazwa miejsca1</Menu.Item>
        <Menu.Item key="stop-2">Nazwa miejsca2</Menu.Item>
        <Menu.Item key="stop-3">Nazwa miejsca3</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default TravelSchedule;
