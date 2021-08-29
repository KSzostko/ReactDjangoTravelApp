import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { notification, Input } from 'antd';
import { getSearchData } from 'redux/map/actions/getSearchData/thunk';

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
  const { isLoading, error } = useSelector((state) => state.map.getSearchData);

  async function handleSearch(value) {
    if (value !== '') {
      const resp = await dispatch(getSearchData(value)).unwrap();

      if (resp.error) {
        notification.info({
          message: 'Brak wyników wyszukiwania',
          description: error || resp.error,
        });
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
