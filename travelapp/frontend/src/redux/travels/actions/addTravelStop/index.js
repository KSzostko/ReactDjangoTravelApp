import { addTravelStop } from './thunk';

export const addTravelStopReducer = (builder) => {
  builder.addCase(addTravelStop.pending, (state) => {
    state.addTravelStop.isLoading = true;
    state.addTravelStop.error = null;
  });

  builder.addCase(addTravelStop.fulfilled, (state, action) => {
    state.addTravelStop.isLoading = false;
    state.addTravelStop.data.push(action.payload);
  });

  builder.addCase(addTravelStop.rejected, (state, action) => {
    state.addTravelStop.isLoading = false;
    state.addTravelStop.data = null;
    state.addTravelStop.error = action.payload;
  });
};
