import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  SearchCached: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addSearchItemsToList: (state, action) => {
      state.SearchCached = {
        ...state.SearchCached,
        [action.payload?.searchKeyword]: action?.payload?.res,
      };
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addSearchItemsToList, setProducts } = productSlice.actions;

export default productSlice.reducer;
