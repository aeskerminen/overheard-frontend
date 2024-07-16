import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost } from "../services/serviceHandler";

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

export const addPost = (content, channel, color) => {
  return async (dispatch) => {
    console.log(content, channel, color);
    const res = await createPost(content, channel, color);
    dispatch(append(res.data.post));
  };
};

export default postsSlice.reducer;
