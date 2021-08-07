import { getRoute } from './thunk';

export const getRouteReducer = (builder) => {
  builder.addCase(getRoute.pending, (state) => {
    state.getRoute.isLoading = true;
    state.getRoute.error = null;
  });

  builder.addCase(getRoute.fulfilled, (state, action) => {
    state.getRoute.isLoading = false;
    state.getRoute.data = action.payload;
  });

  builder.addCase(getRoute.rejected, (state, action) => {
    state.getRoute.isLoading = false;
    state.getRoute.data = [];
    state.getRoute.error = action.payload;
  });
};
