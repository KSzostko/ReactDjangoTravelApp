import styled from 'styled-components';
import TraveListItem from './TravelListItem';

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
      <Grid>
        {testArr.map((item) => (
          <TraveListItem key={item} />
        ))}
      </Grid>
    </div>
  );
}

export default TravelsList;
