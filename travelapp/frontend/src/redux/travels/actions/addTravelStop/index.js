import { addTravelStop } from './thunk';

export const addTravelStopReducer = (builder) => {
  builder.addCase(addTravelStop.pending, (state) => {
    state.getTravelStops.isLoading = true;
    state.getTravelStops.error = null;
  });

  builder.addCase(addTravelStop.fulfilled, (state, action) => {
    state.getTravelStops.isLoading = false;
    state.getTravelStops.data.push(action.payload);
  });

  builder.addCase(addTravelStop.rejected, (state, action) => {
    state.getTravelStops.isLoading = false;
    state.getTravelStops.data = null;
    state.getTravelStops.error = action.payload;
  });
};
