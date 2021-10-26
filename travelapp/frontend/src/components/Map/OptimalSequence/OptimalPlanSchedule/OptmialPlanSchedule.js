import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import { getTravelDays, filterByDate } from 'utils';
import OptimalScheduleItem from './OptimalScheduleItem';

const { SubMenu } = Menu;

function OptmialPlanSchedule() {
  const { data: waypointsData } = useSelector(
    (state) => state.travels.getWaypointsSequence
  );

  if (!waypointsData)
    return (
      <p style={{ padding: '24px' }}>
        Musisz podać odpowiednie dane aby wyznaczyć plan.
      </p>
    );

  const { schedule } = waypointsData;
  // slice hours
  const travelDays = getTravelDays(
    schedule[0].start_date.slice(0, 10),
    schedule[schedule.length - 1].start_date.slice(0, 10)
  );

  return (
    <Menu mode="inline" style={{ width: '100%' }}>
      {travelDays.map((day, i) => (
        <SubMenu key={`day-${i + 1}`} title={`Dzień ${i + 1} - ${day}`}>
          {filterByDate(schedule, day, 'dd.MM.yyyy').map((waypoint) => (
            <Menu.Item key={waypoint.name}>
              <OptimalScheduleItem waypoint={waypoint} />
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
}

export default OptmialPlanSchedule;
