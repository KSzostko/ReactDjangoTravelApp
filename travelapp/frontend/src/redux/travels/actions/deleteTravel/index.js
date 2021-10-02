import { deleteTravel } from './thunk';

export const deleteTravelReducer = (builder) => {
  builder.addCase(deleteTravel.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(deleteTravel.fulfilled, (state, action) => {
    state.isLoading = false;

    const index = state.list.findIndex((item) => item.id === action.payload);
    if (index !== -1) {
      state.list = [
        ...state.list.slice(0, index),
        ...state.list.slice(index + 1),
      ];
    }
  });

  builder.addCase(deleteTravel.rejected, (state, action) => {
    state.isLoading = false;
    state.list = null;
    state.error = action.payload;
  });
};
