import { getHotelDetails } from './thunk';

export const getHotelDetailsReducer = (builder) => {
  builder.addCase(getHotelDetails.pending, (state) => {
    state.getHotelDetails.isLoading = true;
    state.getHotelDetails.error = null;
  });

  builder.addCase(getHotelDetails.fulfilled, (state, action) => {
    state.getHotelDetails.isLoading = false;
    state.getHotelDetails.data = action.payload;
  });

  builder.addCase(getHotelDetails.rejected, (state, action) => {
    state.getHotelDetails.isLoading = false;
    state.getHotelDetails.data = null;
    state.getHotelDetails.error = action.payload;
  });
};
