import { configureStore } from "@reduxjs/toolkit";

import creationModalReducer from "./reducers/creationModalSlice";

export const store = configureStore({
  reducer: {
    modal: creationModalReducer,
  },
});
