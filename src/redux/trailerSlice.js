import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trailerUrl: "",
};

export const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  reducers: {
    setTrailerUrl: (state, action) => {
      state.trailerUrl = action.payload;
    },
  },
});

export const { setTrailerUrl } = trailerSlice.actions;
export default trailerSlice.reducer;
