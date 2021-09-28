import { getRouteFromStop } from './thunk';

export const getRouteFromStopReducer = (builder) => {
  builder.addCase(getRouteFromStop.pending, (state) => {
    state.getRouteFromStop.isLoading = true;
    state.getRouteFromStop.error = null;
  });

  builder.addCase(getRouteFromStop.fulfilled, (state, action) => {
    state.getRouteFromStop.isLoading = false;
    state.getRouteFromStop.data = action.payload;
  });

  builder.addCase(getRouteFromStop.rejected, (state, action) => {
    state.getRouteFromStop.isLoading = false;
    state.getRouteFromStop.data = null;
    state.getRouteFromStop.error = action.payload;
  });
};
