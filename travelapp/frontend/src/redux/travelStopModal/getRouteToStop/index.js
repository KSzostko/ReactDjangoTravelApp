import { getRouteToStop } from './thunk';

export const getRouteToStopReducer = (builder) => {
  builder.addCase(getRouteToStop.pending, (state) => {
    state.getRouteToStop.isLoading = true;
    state.getRouteToStop.error = null;
  });

  builder.addCase(getRouteToStop.fulfilled, (state, action) => {
    state.getRouteToStop.isLoading = false;
    state.getRouteToStop.data = action.payload;
  });

  builder.addCase(getRouteToStop.rejected, (state, action) => {
    state.getRouteToStop.isLoading = false;
    state.getRouteToStop.data = null;
    state.getRouteToStop.error = action.payload;
  });
};
