import { deleteTravelStop } from './thunk';

export const deleteTravelStopReducer = (builder) => {
  builder.addCase(deleteTravelStop.pending, (state) => {
    state.getTravelStops.isLoading = true;
    state.getTravelStops.error = null;
  });

  builder.addCase(deleteTravelStop.fulfilled, (state, action) => {
    state.getTravelStops.isLoading = false;

    const index = state.getTravelStops.data.findIndex(
      (item) => item.id === action.payload
    );
    if (index !== -1) {
      state.getTravelStops.data = [
        ...state.getTravelStops.data.slice(0, index),
        ...state.getTravelStops.data.slice(index + 1),
      ];
    }
  });

  builder.addCase(deleteTravelStop.rejected, (state, action) => {
    state.getTravelStops.isLoading = false;
    state.getTravelStops.data = null;
    state.getTravelStops.error = action.payload;
  });
};
