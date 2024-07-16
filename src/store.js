import { configureStore } from "@reduxjs/toolkit";

import creationModalReducer from "./reducers/creationModalSlice";
import postsReducer from "./reducers/postsSlice";

export const store = configureStore({
  reducer: {
    modal: creationModalReducer,
    posts: postsReducer,
  },
});
