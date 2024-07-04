import axios from "axios";

const BASE_URL = "http://localhost:3003/api";

const loginHandler = (email, password) => {
    const req = axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true })
    return req.then()
}

const registerHandler = (email, password) => {
    const req = axios.post(`${BASE_URL}/register`, { email, password })
    return req.then()
}

const createPost = (content, channel, color) => {
    const req = axios.post(`${BASE_URL}/post`, { content, channel, color }, { withCredentials: true })
    return req.then()
}

const getPosts = () => {
    const req = axios.get(`${BASE_URL}/posts`, { withCredentials: true })
    return req.then()
}

const upvotePost = (identifier) => {
    const req = axios.post(`${BASE_URL}/posts/${identifier}/upvote`, {}, { withCredentials: true })
    return req.then()
}

const downvotePost = (identifier) => {
    const req = axios.post(`${BASE_URL}/posts/${identifier}/downvote`, {}, { withCredentials: true })
    return req.then()
}

const getVotes = (identifier) => {
    const req = axios.get(`${BASE_URL}/posts/${identifier}/votes`, {withCredentials: true})
    return req.then()
}


export { loginHandler, registerHandler, createPost, getPosts, upvotePost, downvotePost, getVotes }