import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import trailerReducer from "./trailerSlice";

export default configureStore({
  reducer: {
    trailer: trailerReducer,
    movie: movieReducer,
  },
});
