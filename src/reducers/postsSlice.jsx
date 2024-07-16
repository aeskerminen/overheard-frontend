import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../services/serviceHandler";

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    append: (state, action) => {
      return state.concat(action.payload);
    },
    set: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { append, set } = postsSlice.actions;

export const fetchPosts = () => async (dispatch) => {
  const posts = await (await getPosts()).data;

  dispatch(set(posts));
};

export default postsSlice.reducer;
