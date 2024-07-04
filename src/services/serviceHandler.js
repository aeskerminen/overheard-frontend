import axios from "axios";

const BASE_URL = "http://localhost:3003/api";

const loginHandler = (email, password) => {
    const req = axios.post(`${BASE_URL}/login`, {email, password}, {withCredentials: true})
    return req.then()
}

const registerHandler = (email, password) => {
    const req = axios.post(`${BASE_URL}/register`, {email, password})
    return req.then()
}

const createPost = (content, channel) => {
    const req = axios.post(`${BASE_URL}/post`, {content, channel}, {withCredentials: true})
    return req.then()
}

const getPosts = () => {
    const req = axios.get(`${BASE_URL}/posts`, {withCredentials: true})
    return req.then()
}

export {loginHandler, registerHandler, createPost, getPosts}