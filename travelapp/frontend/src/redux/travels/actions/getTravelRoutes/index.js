import { getTravelRoutes } from './thunk';

export const getTravelRoutesReducer = (builder) => {
  builder.addCase(getTravelRoutes.pending, (state) => {
    state.getTravelRoutes.isLoading = true;
    state.getTravelRoutes.error = null;
  });

  builder.addCase(getTravelRoutes.fulfilled, (state, action) => {
    state.getTravelRoutes.isLoading = false;
    state.getTravelRoutes.data = action.payload;
  });

  builder.addCase(getTravelRoutes.rejected, (state, action) => {
    state.getTravelRoutes.isLoading = false;
    state.getTravelRoutes.data = null;
    state.getTravelRoutes.error = action.payload;
  });
};
