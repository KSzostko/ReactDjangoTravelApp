import { getLocationsDetails } from './thunk';

export const getLocationDetailsReducer = (builder) => {
  builder.addCase(getLocationsDetails.pending, (state) => {
    state.isLoading = true;
    state.isModalOpen = true;
    state.error = null;
  });

  builder.addCase(getLocationsDetails.fulfilled, (state, action) => {
    state.isLoading = false;
    state.data = action.payload;
  });

  builder.addCase(getLocationsDetails.rejected, (state, action) => {
    state.isLoading = false;
    state.isModalOpen = false;
    state.data = null;
    state.error = action.payload;
  });
};
