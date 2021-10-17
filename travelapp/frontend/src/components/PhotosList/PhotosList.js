import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Select, Spin } from 'antd';
import { useErrorNotification } from 'utils';
import { getAllPhotos } from 'redux/travels/actions/getAllPhotos/thunk';
import SortSelect from 'components/SortSelect';
import PhotoListItem from './PhotoListItem/PhotoListItem';

const { Option } = Select;

const Wrapper = styled.div`
  position: relative;
`;

const StyledSpinner = styled(Spin)`
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translate(-50%, -50%);
`;

const Grid = styled.ul`
  padding-left: 0;
  margin-top: 24px;
  column-gap: 8px;
  column-count: 1;

  @media (min-width: 500px) {
    column-count: 2;
  }

  @media (min-width: 900px) {
    column-count: 4;
  }
`;

function PhotosList() {
  const dispatch = useDispatch();

  const { error, data: photosList, isLoading } = useSelector(
    (state) => state.travels.getAllPhotos
  );

  useErrorNotification(error, 'Nie udało się wczytać zdjęć');

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  function handleSort(sortOption) {
    dispatch(getAllPhotos(sortOption));
  }

  return (
    <Wrapper>
      <SortSelect changeCallback={handleSort}>
        <Option value="title">Tytuł</Option>
        <Option value="-date">Najnowsze</Option>
        <Option value="date">Najstarsze</Option>
      </SortSelect>

      {isLoading ? (
        <StyledSpinner />
      ) : (
        <Grid>
          {photosList.map((photo) => (
            <PhotoListItem key={photo.id} photo={photo} />
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}

export default PhotosList;
