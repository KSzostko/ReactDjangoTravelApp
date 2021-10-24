import { createAsyncThunk } from '@reduxjs/toolkit';
import { WaypointsSequenceAPI } from 'services';

export const getWaypointsSequence = createAsyncThunk(
  'travels/getWaypointsSequence',
  async ({ waypoints, transport }, thunkApi) => {
    try {
      return await WaypointsSequenceAPI.getOptimalSequence(
        waypoints,
        transport
      );
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
