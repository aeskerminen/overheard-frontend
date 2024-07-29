import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, getLocation } from "../services/serviceHandler";

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
    sort: (state, action) => {
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
  if (location === undefined) {
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        getLocation(loc.coords.latitude, loc.coords.longitude)
          .then((res) => {
            console.log(res);
            getPosts(res.data.name).then((posts) => {
              dispatch(set(posts.data));
            });
          })
          .catch((err) => {
            console.log("Error fetching location from server: ", err);
          });
      },
      () => {
        console.log("Geolocation is not supported by this browser.");
      },
      { enableHighAccuracy: true }
    );
  } else {
    const posts = await (await getPosts(location)).data;

    dispatch(set(posts));
  }
};

export const addPost = (content, channel, color) => {
  return async (dispatch) => {
    console.log(content, channel, color);
    const res = await createPost(content, channel, color);
    dispatch(append(res.data.post));
  };
};

export const sortPosts = (filter) => {
  return async (dispatch) => {
    dispatch(sort(filter));
  };
};

export default postsSlice.reducer;
