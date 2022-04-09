import axios from "axios";

export const API_URL = process.env.REACT_APP_SERVER_URL + '/api_v1'


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        'Access-Control-Allow-Origin': process.env.REACT_APP_SERVER_URL
    }
})

$api.interceptors.request.use((config) => {
    // eslint-disable-next-line no-unused-expressions
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api