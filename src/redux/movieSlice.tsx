import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: {},
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
  },
});

export const { setMovie } = movieSlice.actions;
export default movieSlice.reducer;
