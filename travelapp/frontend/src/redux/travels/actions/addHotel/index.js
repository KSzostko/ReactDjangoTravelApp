import { addHotel } from './thunk';

export const addHotelReducer = (builder) => {
  builder.addCase(addHotel.pending, (state) => {
    state.getHotelDetails.isLoading = true;
    state.getHotelDetails.error = null;
  });

  builder.addCase(addHotel.fulfilled, (state, action) => {
    state.getHotelDetails.isLoading = false;
    state.getHotelDetails.data = action.payload;
  });

  builder.addCase(addHotel.rejected, (state, action) => {
    state.getHotelDetails.isLoading = false;
    state.getHotelDetails.data = null;
    state.getHotelDetails.error = action.payload;
  });
};
