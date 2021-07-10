import { fetchLocations } from './thunk';

export const fetchLocationsReducer = (builder) => {
  builder.addCase(fetchLocations.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(fetchLocations.fulfilled, (state, action) => {
    state.isLoading = false;
    state.locations = action.payload;
  });

  builder.addCase(fetchLocations.rejected, (state, action) => {
    state.isLoading = false;
    state.locations = [];
    state.error = action.payload;
  });
};
