import axios from "axios";

const BASE_URL = "http://localhost:3003/api";

const login = (email, password) => {
    const req = axios.post(`${BASE_URL}/login`, {email, password}, {withCredentials: true})
    return req.then()
}

const register = (email, password) => {
    const req = axios.post(`${BASE_URL}/register`, {email, password})
    return req.then()
}

export default {login, register}