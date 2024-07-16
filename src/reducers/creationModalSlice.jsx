import { createSlice } from "@reduxjs/toolkit";

const creationModalSlice = createSlice({
  name: "modal",
  initialState: { visible: false },
  reducers: {
    switchModal: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const {switchModal} = creationModalSlice.actions

export default creationModalSlice.reducer;
