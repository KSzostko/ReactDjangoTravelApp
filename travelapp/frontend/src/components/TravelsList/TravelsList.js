import styled from 'styled-components';
import { Select } from 'antd';
import SortSelect from '../SortSelect';
import TraveListItem from './TravelListItem';
import TravelsSearch from './TravelsSearch';

const { Option } = Select;

const Grid = styled.ul`
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
`;

function TravelsList() {
  const testArr = [1, 2, 3, 4];

  return (
    <div>
      <SortSelect>
        <Option value="name">Nazwa</Option>
        <Option value="start">Data rozpoczęcia</Option>
        <Option value="end">Data zakończenia</Option>
      </SortSelect>
      <TravelsSearch />
      <Grid>
        {testArr.map((item) => (
          <TraveListItem key={item} />
        ))}
      </Grid>
    </div>
  );
}

export default TravelsList;
