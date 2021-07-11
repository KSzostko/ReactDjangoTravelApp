import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { notification, Input } from 'antd';
import { PlacesAPI } from '../../services';
import { setSearchData } from '../../redux/map/mapSlice';

const { Search } = Input;

const MapSearch = styled(Search)`
  position: absolute;
  top: 16px;
  left: 64px;
  width: 250px;
  z-index: 999;
`;

function SearchPlace() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.map);

  async function handleSearch(value) {
    if (value !== '') {
      const resp = await PlacesAPI.findPlaceByName(value);

      if (resp.error) {
        notification.info({
          message: 'Brak wyników wyszukiwania',
          description: 'Podaj poprawną nazwę',
        });
      } else {
        dispatch(
          setSearchData({
            phrase: value,
            lat: resp.lat,
            lon: resp.lon,
          })
        );
      }
    }
  }

  return (
    <MapSearch
      loading={isLoading}
      enterButton
      allowClear
      placeholder="Nazwa regionu"
      onSearch={handleSearch}
    />
  );
}

export default SearchPlace;
