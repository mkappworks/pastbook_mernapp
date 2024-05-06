import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    mainGallery: [],
    userGallery: [],
  },
  reducers: {
    //set mainGallery to the response data once the images are fetched from the db
    addMainGallery(state, action) {
      state.mainGallery = action.payload.mainGallery;
    },
    //set localGallery to the response data once image id are fetched from the db
    addUserGallery(state, action) {
      state.userGallery = action.payload.userGallery;
    },
    //reset the gallery to initialState
    removeGallery(state) {
      state.mainGallery = [];
      state.userGallery = [];
    },
  },
});

export const galleryActions = gallerySlice.actions;

export default gallerySlice;
