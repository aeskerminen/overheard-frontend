import axios from "axios";

const BASE_URL = "http://localhost:3003/api";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const loginHandler = (email, password) => {
  const req = axios.post(
    `${BASE_URL}/users/login`,
    { email, password },
    { withCredentials: true }
  );
  return req.then();
};

const registerHandler = (email, password) => {
  const req = axios.post(`${BASE_URL}/users/register`, { email, password });
  return req.then();
};

const createPost = (content, channel, color, location) => {
  const req = axios.post(
    `${BASE_URL}/posts`,
    { content, channel, color, location },
    { withCredentials: true }
  );
  return req.then();
};

const getPosts = (location) => {
  const req = axios.get(`${BASE_URL}/posts?location=${location}`, { withCredentials: true });
  return req.then();
};

const upvotePost = (identifier) => {
  const req = axios.post(
    `${BASE_URL}/posts/${identifier}/upvote`,
    {},
    { withCredentials: true }
  );
  return req.then();
};

const downvotePost = (identifier) => {
  const req = axios.post(
    `${BASE_URL}/posts/${identifier}/downvote`,
    {},
    { withCredentials: true }
  );
  return req.then();
};

const unvotePost = (identifier) => {
  const req = axios.post(
    `${BASE_URL}/posts/${identifier}/unvote`,
    {},
    { withCredentials: true }
  );
  return req.then();
};

const getVotes = (identifier) => {
  const req = axios.get(`${BASE_URL}/posts/${identifier}/votes`, {
    withCredentials: true,
  });
  return req.then();
};

const addComment = (content, id) => {
  const req = axios.post(
    `${BASE_URL}/posts/${id}/comments`,
    { content },
    { withCredentials: true }
  );
  return req.then();
};

const getLocation = (lat, lon) => {
  const req = axios.post(`${BASE_URL}/location/${lat}/${lon}`);

  return req.then();
};

export {
  loginHandler,
  registerHandler,
  createPost,
  getPosts,
  upvotePost,
  downvotePost,
  unvotePost,
  getVotes,
  addComment,
  getLocation,
};
