import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Spin } from 'antd';
import { useErrorNotification } from 'utils';
import { getHotelDetails } from 'redux/travels/actions/getHotelDetails/thunk';

const { SubMenu } = Menu;

function HotelMenu() {
  const dispatch = useDispatch();

  const { data: currentTravel } = useSelector((state) => state.travels.current);
  const { data: hotel, isLoading, error } = useSelector(
    (state) => state.travels.getHotelDetails
  );

  useErrorNotification(error, 'Nie udało się dodać hotelu');

  useEffect(() => {
    if (currentTravel?.hotel && !hotel) {
      dispatch(getHotelDetails(currentTravel.hotel));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentTravel]);

  return (
    <Menu mode="inline" style={{ width: '100%' }}>
      <SubMenu key="hotel-menu" title="Hotel">
        <Menu.Item>
          {isLoading ? (
            <Spin />
          ) : (
            <span>{hotel?.name ? hotel.name : 'Brak hotelu'}</span>
          )}
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default HotelMenu;
