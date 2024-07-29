import { configureStore } from "@reduxjs/toolkit";

import creationModalReducer from "./reducers/creationModalSlice";
import postsReducer from "./reducers/postsSlice";
import locationReducer from "./reducers/locationSlice";

export const store = configureStore({
  reducer: {
    modal: creationModalReducer,
    posts: postsReducer,
    location: locationReducer,
  },
});

