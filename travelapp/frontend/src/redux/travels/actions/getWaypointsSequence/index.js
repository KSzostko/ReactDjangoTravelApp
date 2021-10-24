import { getWaypointsSequence } from './thunk';

export const getWaypointsSequenceReducer = (builder) => {
  builder.addCase(getWaypointsSequence.pending, (state) => {
    state.getWaypointsSequence.isLoading = true;
    state.getWaypointsSequence.error = null;
  });

  builder.addCase(getWaypointsSequence.fulfilled, (state, action) => {
    state.getWaypointsSequence.isLoading = false;
    // starting date = state.current.data.start_date
    // TODO adjust data accoring to timeRange contraints
    state.getWaypointsSequence.data = action.payload;
  });

  builder.addCase(getWaypointsSequence.rejected, (state, action) => {
    state.getWaypointsSequence.isLoading = false;
    state.getWaypointsSequence.data = null;
    state.getWaypointsSequence.error = action.payload;
  });
};
