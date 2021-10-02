import { calculateNewRoute } from './thunk';

export const calculateNewRouteReducer = (builder) => {
  builder.addCase(calculateNewRoute.pending, (state) => {
    state.getNewRoute.isLoading = true;
    state.getNewRoute.error = null;
  });

  builder.addCase(calculateNewRoute.fulfilled, (state, action) => {
    state.getNewRoute.isLoading = false;
    state.getNewRoute.data = action.payload;
  });

  builder.addCase(calculateNewRoute.rejected, (state, action) => {
    state.getNewRoute.isLoading = false;
    state.getNewRoute.data = null;
    state.getNewRoute.error = action.payload;
  });
};
