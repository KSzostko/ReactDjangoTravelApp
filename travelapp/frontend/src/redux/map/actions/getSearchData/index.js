import { getSearchData } from './thunk';

export const getSearchDataReducer = (builder) => {
  builder.addCase(getSearchData.pending, (state) => {
    state.getSearchData.isLoading = true;
    state.getSearchData.error = null;
  });

  builder.addCase(getSearchData.fulfilled, (state, action) => {
    state.getSearchData.isLoading = false;
    state.getSearchData.data = action.payload;
  });

  builder.addCase(getSearchData.rejected, (state, action) => {
    state.getSearchData.isLoading = false;
    state.getSearchData.data = [];
    state.getSearchData.error = action.payload;
  });
};
