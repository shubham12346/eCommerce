import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../services/searchService";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
