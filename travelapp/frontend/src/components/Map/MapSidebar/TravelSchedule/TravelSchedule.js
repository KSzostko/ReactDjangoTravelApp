import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Menu } from 'antd';
import { cutText, getTravelDays } from '../../../../utils';
import { chooseTravelStop } from '../../../../redux/travelStopModal/travelStopModalSlice';

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
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.travels.current);

  function showDetails(e) {
    console.log(e);
    dispatch(chooseTravelStop(null));
  }

  if (data === null) return null;

  return (
    // TODO: give option to see fullscreen calendar wit everything marked on it
    <Menu mode="inline" style={{ width: '100%' }} onClick={showDetails}>
      {/* TODO: replace this with ScheduleItem component  */}
      {/* menu item click should open a modal with details about hours and road */}
      {/* there shuld also be an edit form for this trip stop */}
      {getTravelDays(data.start_date, data.end_date).map((day, i) => (
        <SubMenu key={`day-${i + 1}`} title={`Dzień ${i + 1} - ${day}`}>
          <StyledMenuItem key={`day-${i + 1}-stop-1`}>
            <span>
              {cutText('Nazwa miejsca1aaaaaaaaaaaaaaaaaaaaaaaaaa', 20)}
            </span>
            <span className="hour">10:00 - 12:00</span>
          </StyledMenuItem>
        </SubMenu>
      ))}
    </Menu>
  );
}

export default TravelSchedule;
