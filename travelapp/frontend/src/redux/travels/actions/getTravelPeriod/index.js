import { getTravelPeriod } from './thunk';

export const getTravelPeriodReducer = (builder) => {
  builder.addCase(getTravelPeriod.pending, (state) => {
    state.getTravelPeriod.isLoading = true;
    state.getTravelPeriod.error = null;
  });

  builder.addCase(getTravelPeriod.fulfilled, (state, action) => {
    state.getTravelPeriod.isLoading = false;
    state.getTravelPeriod.data = action.payload;
  });

  builder.addCase(getTravelPeriod.rejected, (state, action) => {
    state.getTravelPeriod.isLoading = false;
    state.getTravelPeriod.data = null;
    state.getTravelPeriod.error = action.payload;
  });
};
