import { addTravelRoute } from './thunk';

export const addTravelRouteReducer = (builder) => {
  builder.addCase(addTravelRoute.pending, (state) => {
    state.getTravelRoutes.isLoading = true;
    state.getTravelRoutes.error = null;
  });

  builder.addCase(addTravelRoute.fulfilled, (state, action) => {
    state.getTravelRoutes.isLoading = false;
    state.getTravelRoutes.data.push(action.payload);
  });

  builder.addCase(addTravelRoute.rejected, (state, action) => {
    state.getTravelRoutes.isLoading = false;
    state.getTravelRoutes.data = null;
    state.getTravelRoutes.error = action.payload;
  });
};
