import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./slice/ui-slice";
import authSlice from "./slice/auth-slice";
import gallerySlice from "./slice/gallery_slice";

//Redux store
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    gallery: gallerySlice.reducer,
  },
});
export default store;
