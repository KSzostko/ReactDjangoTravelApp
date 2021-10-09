import { getAllPhotos } from './thunk';

export const getAllPhotosReducer = (builder) => {
  builder.addCase(getAllPhotos.pending, (state) => {
    state.getAllPhotos.isLoading = true;
    state.getAllPhotos.error = null;
  });

  builder.addCase(getAllPhotos.fulfilled, (state, action) => {
    state.getAllPhotos.isLoading = false;
    state.getAllPhotos.data = action.payload;
  });

  builder.addCase(getAllPhotos.rejected, (state, action) => {
    state.getAllPhotos.isLoading = false;
    state.getAllPhotos.data = null;
    state.getAllPhotos.error = action.payload;
  });
};
