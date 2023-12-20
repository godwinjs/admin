import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: {},
  gallery: [],
  // variantThumbnail: {},
  // featuredImage: {}
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    // setVariantThumbnail: () => {
    //   state.variantThumbnail = action.payload
    // },
    // setVariantFeaturedImage: () => {
    //   state.variantFeaturedImage = action.payload
    // }
  },
});

export const { setPhoto, setGallery } = uploadSlice.actions;
export default uploadSlice.reducer;
