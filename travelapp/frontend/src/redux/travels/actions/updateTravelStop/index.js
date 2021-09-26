import { updateTravelStop } from './thunk';

export const updateTravelStopReducer = (builder) => {
  builder.addCase(updateTravelStop.pending, (state) => {
    state.getTravelStops.isLoading = true;
    state.getTravelStops.error = null;
  });

  builder.addCase(updateTravelStop.fulfilled, (state, action) => {
    state.getTravelStops.isLoading = false;

    const index = state.getTravelStops.data.findIndex(
      (stop) => stop.id === action.payload.id
    );
    if (index !== -1) {
      state.getTravelStops.data[index] = action.payload;
    }
  });

  builder.addCase(updateTravelStop.rejected, (state, action) => {
    state.getTravelStops.isLoading = false;
    state.getTravelStops.data = null;
    state.getTravelStops.error = action.payload;
  });
};
