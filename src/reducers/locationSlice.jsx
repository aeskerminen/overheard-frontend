import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: { location: "" },
  reducers: {
    set: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { set } = locationSlice.actions;



export default locationSlice.reducer;
