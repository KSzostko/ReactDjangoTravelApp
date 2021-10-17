import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Select, Spin } from 'antd';
import { useErrorNotification } from 'utils';
import { getTravels } from 'redux/travels/actions/getTravels/thunk';
import SortSelect from '../SortSelect';
import TraveListItem from './TravelListItem';
import TravelsSearch from './TravelsSearch';

const { Option } = Select;

const Wrapper = styled.div`
  position: relative;
`;

const StyledSpinner = styled(Spin)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Grid = styled.ul`
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
`;

function TravelsList() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, list: travelsList, error } = useSelector(
    (state) => state.travels
  );

  useErrorNotification(error, 'Nie udało się pobrać listy podróży');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getTravels());
    }
  }, [dispatch, isAuthenticated]);

  function handleSort(sortOption) {
    dispatch(getTravels(sortOption));
  }

  return (
    <Wrapper>
      <SortSelect changeCallback={handleSort}>
        <Option value="name">Nazwa</Option>
        <Option value="-start_date">Najnowsze</Option>
        <Option value="start_date">Najstarsze</Option>
      </SortSelect>
      <TravelsSearch />

      {isLoading ? (
        <StyledSpinner />
      ) : (
        <Grid>
          {travelsList.map((travel) => (
            <TraveListItem key={travel.id} travel={travel} />
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}

export default TravelsList;
