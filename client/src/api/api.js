import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: "http://localhost:4000"
})

export const getLoggedIn = () => api.get(`auth/loggedIn/`)
export const registerUser = (payload) => api.post(`auth/register/`, payload)
export const loginUser = (payload) => api.post(`auth/login/`, payload)
export const logoutUser = () => api.get(`auth/logout/`)

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis;