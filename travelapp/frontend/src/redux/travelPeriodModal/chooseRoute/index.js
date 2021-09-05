import { chooseRoute } from './thunk';

export const chooseRouteReducer = (builder) => {
  builder.addCase(chooseRoute.pending, (state) => {
    state.getRoute.isLoading = true;
    state.getRoute.error = null;
  });

  builder.addCase(chooseRoute.fulfilled, (state, action) => {
    state.getRoute.isLoading = false;
    state.getRoute.data = action.payload;
  });

  builder.addCase(chooseRoute.rejected, (state, action) => {
    state.getRoute.isLoading = false;
    state.getRoute.data = null;
    state.getRoute.error = action.payload;
  });
};
