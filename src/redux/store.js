import { configureStore } from "@reduxjs/toolkit";
import trailerReducer from "./trailerSlice";

export default configureStore({
  reducer: {
    trailer: trailerReducer,
  },
});
