import { createAsyncThunk } from '@reduxjs/toolkit';
import { WaypointsSequenceAPI } from 'services';

export const getWaypointsSequence = createAsyncThunk(
  'travels/getWaypointsSequence',
  async ({ waypoints, transport, timeRange }, thunkApi) => {
    try {
      const resp = await WaypointsSequenceAPI.getOptimalSequence(
        waypoints,
        transport
      );

      return { ...resp, timeRange };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
