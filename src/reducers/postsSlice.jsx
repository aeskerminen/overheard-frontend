import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost } from "../services/serviceHandler";

const postsSlice = createSlice({
  name: "posts",
  initialState: null,
  reducers: {
    append: (state, action) => {
      return state.concat(action.payload);
    },
    set: (state, action) => {
      return [...action.payload];
    },
    sort: (state, action) => {
      if (state === null) return;

      const temp = [...state];
      switch (action.payload) {
        case "newest":
          temp.sort((a, b) => a.createdAt < b.createdAt);
          break;
        case "mcomments":
          temp.sort(
            (a, b) => a.forum.comments.length < b.forum.comments.length
          );
          break;
        case "mvotes":
          temp.sort((a, b) => a.votes.votes < b.votes.votes);
          break;
      }

      return [...temp];
    },
  },
});

export const { append, set, sort } = postsSlice.actions;

export const fetchPosts = (location) => async (dispatch) => {
  const posts = await (await getPosts(location)).data;

  dispatch(set(posts));
};

export const addPost = (content, channel, color, location) => {
  return async (dispatch) => {
    console.log(content, channel, color);
    const res = await createPost(content, channel, color, location);
    dispatch(append(res.data.post));
  };
};

export const sortPosts = (filter) => {
  return async (dispatch) => {
    dispatch(sort(filter));
  };
};

export default postsSlice.reducer;
