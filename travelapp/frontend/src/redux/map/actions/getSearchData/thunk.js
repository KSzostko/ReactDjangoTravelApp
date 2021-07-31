import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlacesAPI } from '../../../../services';

export const getSearchData = createAsyncThunk(
  'map/searchData/get',
  async (searchPhrase, thunkApi) => {
    try {
      return await PlacesAPI.findPlaceByName(searchPhrase);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
