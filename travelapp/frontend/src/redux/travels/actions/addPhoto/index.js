import { addPhoto } from './thunk';

export const addPhotoReducer = (builder) => {
  builder.addCase(addPhoto.pending, (state) => {
    state.getAllPhotos.isLoading = true;
    state.getAllPhotos.error = null;
  });

  builder.addCase(addPhoto.fulfilled, (state, action) => {
    state.getAllPhotos.isLoading = false;
    state.getAllPhotos.data.push(action.payload);
  });

  builder.addCase(addPhoto.rejected, (state, action) => {
    state.getAllPhotos.isLoading = false;
    state.getAllPhotos.data = null;
    state.getAllPhotos.error = action.payload;
  });
};
